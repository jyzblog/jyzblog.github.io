/**
 * Lazy-loaded Kokoro TTS singleton for browser use.
 * Loads the prebundled browser build from jsDelivr at runtime so Next.js
 * never has to compile onnxruntime / WASM native bindings.
 */

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const DEFAULT_VOICE = 'af_heart';

let ttsPromise = null;
let activeDevice = null;

async function detectWebGPU() {
  try {
    if (typeof navigator === 'undefined' || !navigator.gpu) return false;
    const adapter = await navigator.gpu.requestAdapter();
    return Boolean(adapter);
  } catch {
    return false;
  }
}

async function importKokoro() {
  // String literal + webpackIgnore keeps this out of the webpack graph.
  // Pin the CDN version when upgrading Kokoro.
  const mod = await import(
    /* webpackIgnore: true */
    'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js'
  );
  return mod;
}

/**
 * @param {(progress: { status: string, progress?: number, file?: string }) => void} [onProgress]
 */
export async function loadKokoro(onProgress) {
  if (ttsPromise) return ttsPromise;

  ttsPromise = (async () => {
    const { KokoroTTS } = await importKokoro();
    const useWebGPU = await detectWebGPU();
    activeDevice = useWebGPU ? 'webgpu' : 'wasm';

    const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: useWebGPU ? 'fp32' : 'q8',
      device: activeDevice,
      progress_callback: (info) => {
        if (!onProgress) return;
        const progress =
          typeof info?.progress === 'number'
            ? info.progress
            : info?.total
              ? (info.loaded / info.total) * 100
              : undefined;
        onProgress({
          status: info?.status || 'loading',
          progress,
          file: info?.file,
        });
      },
    });

    return tts;
  })().catch((err) => {
    ttsPromise = null;
    throw err;
  });

  return ttsPromise;
}

export function getKokoroDevice() {
  return activeDevice;
}

/**
 * Stream TTS for the given text.
 * @param {string} text
 * @param {{
 *   voice?: string,
 *   signal?: AbortSignal,
 *   onChunk?: (chunk: { text: string, audio: Float32Array, samplingRate: number, index: number }) => void,
 *   onProgress?: (info: { index: number }) => void,
 * }} [options]
 */
export async function streamSpeech(text, options = {}) {
  const { voice = DEFAULT_VOICE, signal, onChunk, onProgress } = options;
  const tts = await loadKokoro();

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  let index = 0;
  for await (const { text: chunkText, audio } of tts.stream(text, { voice })) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    const samples =
      audio.audio instanceof Float32Array
        ? audio.audio
        : new Float32Array(audio.audio);

    onChunk?.({
      text: chunkText,
      audio: samples,
      samplingRate: audio.sampling_rate,
      index,
    });
    onProgress?.({ index });
    index += 1;

    // Yield to the event loop so UI stays responsive between sentences
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return { chunks: index, device: activeDevice };
}

/** Encode Float32 PCM (-1..1) as a WAV ArrayBuffer */
export function encodeWav(samples, sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  return buffer;
}

export function concatFloat32(chunks) {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const out = new Float32Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}
