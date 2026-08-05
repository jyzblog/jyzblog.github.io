/**
 * Dedicated worker for Kokoro TTS inference.
 * Keeps the main thread free for UI + audio scheduling.
 *
 * Served from /workers/kokoro-tts.js (public/).
 */

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const KOKORO_CDN =
  'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js';

let tts = null;
let device = null;
let cancelled = false;
let busy = false;

async function detectWebGPU() {
  try {
    if (!navigator.gpu) return false;
    const adapter = await navigator.gpu.requestAdapter();
    return Boolean(adapter);
  } catch {
    return false;
  }
}

async function ensureModel() {
  if (tts) return tts;

  self.postMessage({ type: 'status', status: 'loading' });

  const { KokoroTTS } = await import(/* webpackIgnore: true */ KOKORO_CDN);
  const useWebGPU = await detectWebGPU();
  device = useWebGPU ? 'webgpu' : 'wasm';

  tts = await KokoroTTS.from_pretrained(MODEL_ID, {
    dtype: useWebGPU ? 'fp32' : 'q8',
    device,
    progress_callback: (info) => {
      const progress =
        typeof info?.progress === 'number'
          ? info.progress
          : info?.total
            ? (info.loaded / info.total) * 100
            : undefined;
      self.postMessage({
        type: 'progress',
        status: info?.status || 'progress',
        progress,
        file: info?.file,
      });
    },
  });

  self.postMessage({ type: 'ready', device });
  return tts;
}

self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'cancel') {
    cancelled = true;
    return;
  }

  if (msg.type === 'init') {
    try {
      cancelled = false;
      await ensureModel();
    } catch (err) {
      self.postMessage({
        type: 'error',
        message: err?.message || 'Failed to load voice model',
      });
    }
    return;
  }

  if (msg.type === 'generate') {
    if (busy) {
      self.postMessage({
        type: 'error',
        id: msg.id,
        message: 'Worker is busy',
      });
      return;
    }

    busy = true;
    cancelled = false;
    const { id, text, voice = 'af_heart' } = msg;

    try {
      const model = await ensureModel();
      if (cancelled) {
        self.postMessage({ type: 'done', id, cancelled: true });
        return;
      }

      // One sentence/segment at a time — caller feeds the queue.
      const audio = await model.generate(text, { voice });
      if (cancelled) {
        self.postMessage({ type: 'done', id, cancelled: true });
        return;
      }

      const samples =
        audio.audio instanceof Float32Array
          ? audio.audio
          : new Float32Array(audio.audio);
      const copy = samples.slice();
      self.postMessage(
        {
          type: 'chunk',
          id,
          samplingRate: audio.sampling_rate,
          samples: copy.buffer,
          length: copy.length,
        },
        [copy.buffer],
      );
      self.postMessage({ type: 'done', id, cancelled: false });
    } catch (err) {
      if (!cancelled) {
        self.postMessage({
          type: 'error',
          id,
          message: err?.message || 'TTS generation failed',
        });
      } else {
        self.postMessage({ type: 'done', id, cancelled: true });
      }
    } finally {
      busy = false;
    }
  }
};
