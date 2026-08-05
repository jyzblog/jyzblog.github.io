/**
 * Client for the Kokoro TTS web worker.
 * Splits text into short segments, generates ahead of the playhead in a
 * background worker, and streams PCM chunks back for immediate playback.
 */

const DEFAULT_VOICE = 'af_heart';
/** Keep roughly this many seconds buffered ahead of the playhead. */
const LOOKAHEAD_SECONDS = 12;
/** Soft cap so very long sentences still finish reasonably fast. */
const MAX_SEGMENT_CHARS = 220;

let worker = null;
let workerReady = null;
let activeDevice = null;
let requestId = 0;

function getWorker() {
  if (typeof window === 'undefined') {
    throw new Error('TTS worker is browser-only');
  }
  if (worker) return worker;

  worker = new Worker('/workers/kokoro-tts.js', { type: 'module' });
  return worker;
}

function waitForWorkerEvent(predicate, signal) {
  const w = getWorker();
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    };

    const onMessage = (event) => {
      const msg = event.data;
      if (!msg) return;
      if (msg.type === 'error' && !msg.id) {
        cleanup();
        reject(new Error(msg.message || 'Worker error'));
        return;
      }
      if (predicate(msg)) {
        cleanup();
        resolve(msg);
      }
    };

    const onError = (err) => {
      cleanup();
      reject(err?.message ? new Error(err.message) : new Error('Worker failed'));
    };

    const cleanup = () => {
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
      signal?.removeEventListener('abort', onAbort);
    };

    w.addEventListener('message', onMessage);
    w.addEventListener('error', onError);
    if (signal) {
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener('abort', onAbort);
    }
  });
}

/**
 * Split speakable text into short segments for faster time-to-first-audio
 * and smoother background generation.
 */
export function splitSpeechSegments(text) {
  const normalized = (text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const rough =
    normalized.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [normalized];

  const segments = [];
  for (const part of rough) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.length <= MAX_SEGMENT_CHARS) {
      segments.push(trimmed);
      continue;
    }

    let remaining = trimmed;
    while (remaining.length > MAX_SEGMENT_CHARS) {
      const window = remaining.slice(0, MAX_SEGMENT_CHARS);
      let cut = Math.max(
        window.lastIndexOf('; '),
        window.lastIndexOf(', '),
        window.lastIndexOf(' — '),
        window.lastIndexOf(' - '),
        window.lastIndexOf(': '),
      );
      if (cut < MAX_SEGMENT_CHARS * 0.4) {
        cut = window.lastIndexOf(' ');
      }
      if (cut < 1) cut = MAX_SEGMENT_CHARS;
      segments.push(remaining.slice(0, cut).trim());
      remaining = remaining.slice(cut).trim();
    }
    if (remaining) segments.push(remaining);
  }

  return segments.filter(Boolean);
}

/**
 * @param {(progress: { status: string, progress?: number, file?: string }) => void} [onProgress]
 * @param {AbortSignal} [signal]
 */
export async function loadKokoro(onProgress, signal) {
  const w = getWorker();

  if (!workerReady) {
    workerReady = (async () => {
      const progressHandler = (event) => {
        const msg = event.data;
        if (!msg) return;
        if (msg.type === 'progress' || msg.type === 'status') {
          onProgress?.({
            status: msg.status,
            progress: msg.progress,
            file: msg.file,
          });
        }
        if (msg.type === 'ready') {
          activeDevice = msg.device;
        }
      };
      w.addEventListener('message', progressHandler);

      try {
        w.postMessage({ type: 'init' });
        const ready = await waitForWorkerEvent(
          (msg) => msg.type === 'ready' || (msg.type === 'error' && !msg.id),
          signal,
        );
        if (ready.type === 'error') {
          throw new Error(ready.message || 'Failed to load voice model');
        }
        activeDevice = ready.device;
        return true;
      } finally {
        w.removeEventListener('message', progressHandler);
      }
    })().catch((err) => {
      workerReady = null;
      throw err;
    });
  } else if (onProgress) {
    onProgress({ status: 'done' });
  }

  await workerReady;
  return true;
}

export function getKokoroDevice() {
  return activeDevice;
}

function generateOneSegment(text, voice, signal) {
  const w = getWorker();
  const id = `req-${(requestId += 1)}`;

  return new Promise((resolve, reject) => {
    let settled = false;

    const resolveOnce = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const rejectOnce = (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    };

    const onAbort = () => {
      w.postMessage({ type: 'cancel' });
      cleanup();
      rejectOnce(new DOMException('Aborted', 'AbortError'));
    };

    const onMessage = (event) => {
      const msg = event.data;
      if (!msg || msg.id !== id) return;

      if (msg.type === 'chunk') {
        const samples = new Float32Array(msg.samples, 0, msg.length);
        resolveOnce({
          audio: samples,
          samplingRate: msg.samplingRate,
        });
      } else if (msg.type === 'done') {
        cleanup();
        if (msg.cancelled) {
          rejectOnce(new DOMException('Aborted', 'AbortError'));
        } else if (!settled) {
          rejectOnce(new Error('No audio returned'));
        }
      } else if (msg.type === 'error') {
        cleanup();
        rejectOnce(new Error(msg.message || 'TTS generation failed'));
      }
    };

    const onError = () => {
      cleanup();
      rejectOnce(new Error('Worker failed'));
    };

    const cleanup = () => {
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
      signal?.removeEventListener('abort', onAbort);
    };

    w.addEventListener('message', onMessage);
    w.addEventListener('error', onError);
    if (signal) {
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener('abort', onAbort);
    }

    w.postMessage({ type: 'generate', id, text, voice });
  });
}

/**
 * Stream TTS via the background worker.
 * Generates short segments and only stays ~LOOKAHEAD_SECONDS ahead.
 *
 * @param {string} text
 * @param {{
 *   voice?: string,
 *   signal?: AbortSignal,
 *   onChunk?: (chunk: { text: string, audio: Float32Array, samplingRate: number, index: number }) => void,
 *   getBufferedAheadSeconds?: () => number,
 * }} [options]
 */
export async function streamSpeech(text, options = {}) {
  const {
    voice = DEFAULT_VOICE,
    signal,
    onChunk,
    getBufferedAheadSeconds,
  } = options;

  await loadKokoro(undefined, signal);

  const segments = splitSpeechSegments(text);
  if (segments.length === 0) return { chunks: 0, device: activeDevice };

  let index = 0;
  for (const segment of segments) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    while (
      typeof getBufferedAheadSeconds === 'function' &&
      getBufferedAheadSeconds() > LOOKAHEAD_SECONDS
    ) {
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }
      await new Promise((r) => setTimeout(r, 250));
    }

    const { audio, samplingRate } = await generateOneSegment(
      segment,
      voice,
      signal,
    );

    onChunk?.({
      text: segment,
      audio,
      samplingRate,
      index,
    });
    index += 1;
  }

  return { chunks: index, device: activeDevice };
}

export function terminateKokoroWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
    workerReady = null;
    activeDevice = null;
  }
}
