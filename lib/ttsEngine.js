/**
 * Browser TTS client powered by Phonon 31M (WebGPU with WASM SIMD CPU fallback).
 * Splits text into short segments, stays ahead of the playhead without runaway
 * buffering, and streams 24 kHz PCM chunks as soon as each frame is decoded.
 */

const PHONON_MODULE_URL = '/phonon/phonon.js';
const SAMPLE_RATE = 24000;
/** Keep roughly this many seconds buffered ahead of the playhead. */
const LOOKAHEAD_SECONDS = 12;
/** Soft cap so segments stay short for lookahead backpressure and clean prosody. */
const MAX_SEGMENT_CHARS = 220;

let ttsInstance = null;
let loadPromise = null;
let activeDevice = null;
const progressListeners = new Set();

function makeAbortError() {
  return new DOMException('Aborted', 'AbortError');
}

function raceAbort(promise, signal) {
  if (!signal) return promise;
  if (signal.aborted) return Promise.reject(makeAbortError());
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(makeAbortError());
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      (err) => {
        signal.removeEventListener('abort', onAbort);
        reject(err);
      },
    );
  });
}

/**
 * Split speakable text into short segments for lookahead pacing and crisp
 * sentence boundaries.
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

async function importPhonon() {
  if (typeof window === 'undefined') {
    throw new Error('TTS engine is browser-only');
  }
  const url = new URL(PHONON_MODULE_URL, window.location.origin).href;
  return import(/* webpackIgnore: true */ url);
}

/**
 * @param {(progress: { status: string, progress?: number }) => void} [onProgress]
 * @param {AbortSignal} [signal]
 */
export async function loadTts(onProgress, signal) {
  if (signal?.aborted) throw makeAbortError();

  if (ttsInstance) {
    onProgress?.({ status: 'done' });
    return ttsInstance;
  }

  if (onProgress) progressListeners.add(onProgress);

  try {
    if (!loadPromise) {
      loadPromise = (async () => {
        for (const fn of progressListeners) fn({ status: 'loading' });

        const { Phonon } = await importPhonon();
        const instance = await Phonon.load({
          progress: (percent) => {
            for (const fn of progressListeners) {
              fn({ status: 'progress', progress: percent });
            }
          },
        });

        ttsInstance = instance;
        activeDevice = instance.backend?.name || 'cpu';

        instance.lost.then(() => {
          if (ttsInstance === instance) {
            ttsInstance = null;
            loadPromise = null;
            activeDevice = null;
          }
        });

        for (const fn of progressListeners) fn({ status: 'done' });
        return instance;
      })().catch((err) => {
        loadPromise = null;
        throw err;
      });
    } else {
      onProgress?.({ status: 'loading' });
    }

    return await raceAbort(loadPromise, signal);
  } finally {
    if (onProgress) progressListeners.delete(onProgress);
  }
}

export function getTtsDevice() {
  return activeDevice;
}

/**
 * Stream TTS via Phonon.
 * Streams PCM frames as soon as they are decoded and pauses between segments
 * whenever enough audio is already buffered ahead of the playhead.
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
  const { voice, signal, onChunk, getBufferedAheadSeconds } = options;

  const tts = await loadTts(undefined, signal);
  const segments = splitSpeechSegments(text);
  if (segments.length === 0) return { chunks: 0, device: activeDevice };

  let index = 0;
  for (const segment of segments) {
    if (signal?.aborted) throw makeAbortError();

    while (
      typeof getBufferedAheadSeconds === 'function' &&
      getBufferedAheadSeconds() > LOOKAHEAD_SECONDS
    ) {
      if (signal?.aborted) throw makeAbortError();
      await raceAbort(new Promise((r) => setTimeout(r, 250)), signal);
    }

    const segmentIndex = index;
    await tts.speak(segment, {
      ...(voice ? { voice } : {}),
      seed: segmentIndex + 1,
      signal,
      onAudio: (samples) => {
        if (signal?.aborted) return;
        onChunk?.({
          text: segment,
          audio: samples,
          samplingRate: SAMPLE_RATE,
          index: segmentIndex,
        });
      },
    });

    index += 1;
  }

  return { chunks: index, device: activeDevice };
}

export async function disposeTts() {
  const instance = ttsInstance;
  ttsInstance = null;
  loadPromise = null;
  activeDevice = null;
  if (instance) {
    await instance.close().catch(() => {});
  }
}
