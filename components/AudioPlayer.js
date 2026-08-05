import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles/content.module.css';

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Streaming Web Audio player that accepts PCM chunks as they are generated.
 */
function usePcmPlayer() {
  const ctxRef = useRef(null);
  const chunksRef = useRef([]); // { samples: Float32Array, sampleRate: number }
  const sampleRateRef = useRef(24000);
  const totalSamplesRef = useRef(0);
  const playheadSampleRef = useRef(0);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef([]);
  const playingRef = useRef(false);
  const rateRef = useRef(1);
  const rafRef = useRef(null);
  const startCtxTimeRef = useRef(0);
  const startPlayheadRef = useRef(0);
  const listenersRef = useRef(new Set());

  const notify = useCallback(() => {
    listenersRef.current.forEach((fn) => fn());
  }, []);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new Ctx({ sampleRate: sampleRateRef.current });
    }
    return ctxRef.current;
  }, []);

  const stopSources = useCallback(() => {
    sourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch {
        /* already stopped */
      }
      try {
        src.disconnect();
      } catch {
        /* noop */
      }
    });
    sourcesRef.current = [];
  }, []);

  const getBufferedDuration = useCallback(() => {
    return totalSamplesRef.current / sampleRateRef.current;
  }, []);

  const getCurrentTime = useCallback(() => {
    if (!playingRef.current || !ctxRef.current) {
      return playheadSampleRef.current / sampleRateRef.current;
    }
    const elapsed =
      (ctxRef.current.currentTime - startCtxTimeRef.current) * rateRef.current;
    const t = startPlayheadRef.current + elapsed;
    const max = getBufferedDuration();
    return Math.min(Math.max(0, t), max);
  }, [getBufferedDuration]);

  const scheduleFrom = useCallback(
    (fromSample) => {
      const ctx = ensureCtx();
      stopSources();

      let sampleOffset = 0;
      let startAt = ctx.currentTime + 0.05;
      nextStartTimeRef.current = startAt;

      for (const chunk of chunksRef.current) {
        const chunkEnd = sampleOffset + chunk.samples.length;
        if (chunkEnd <= fromSample) {
          sampleOffset = chunkEnd;
          continue;
        }

        let localStart = 0;
        if (fromSample > sampleOffset) {
          localStart = fromSample - sampleOffset;
        }

        const slice = chunk.samples.subarray(localStart);
        if (slice.length === 0) {
          sampleOffset = chunkEnd;
          continue;
        }

        const buffer = ctx.createBuffer(1, slice.length, chunk.sampleRate);
        buffer.copyToChannel(new Float32Array(slice), 0);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = rateRef.current;
        source.connect(ctx.destination);
        source.start(startAt);
        sourcesRef.current.push(source);

        const duration = slice.length / chunk.sampleRate / rateRef.current;
        startAt += duration;
        nextStartTimeRef.current = startAt;
        sampleOffset = chunkEnd;
      }

      startCtxTimeRef.current = ctx.currentTime;
      startPlayheadRef.current = fromSample / sampleRateRef.current;
      playheadSampleRef.current = fromSample;
    },
    [ensureCtx, stopSources],
  );

  const tick = useCallback(() => {
    if (!playingRef.current) return;
    const current = getCurrentTime();
    playheadSampleRef.current = Math.floor(current * sampleRateRef.current);
    notify();
    rafRef.current = requestAnimationFrame(tick);
  }, [getCurrentTime, notify]);

  const play = useCallback(async () => {
    const ctx = ensureCtx();
    if (ctx.state === 'suspended') await ctx.resume();
    playingRef.current = true;
    scheduleFrom(playheadSampleRef.current);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    notify();
  }, [ensureCtx, notify, scheduleFrom, tick]);

  const pause = useCallback(() => {
    const current = getCurrentTime();
    playheadSampleRef.current = Math.floor(current * sampleRateRef.current);
    playingRef.current = false;
    stopSources();
    cancelAnimationFrame(rafRef.current);
    notify();
  }, [getCurrentTime, notify, stopSources]);

  const seek = useCallback(
    (timeSeconds) => {
      const max = getBufferedDuration();
      const clamped = Math.min(Math.max(0, timeSeconds), max);
      playheadSampleRef.current = Math.floor(clamped * sampleRateRef.current);
      if (playingRef.current) {
        scheduleFrom(playheadSampleRef.current);
      }
      notify();
    },
    [getBufferedDuration, notify, scheduleFrom],
  );

  const setRate = useCallback(
    (rate) => {
      rateRef.current = rate;
      if (playingRef.current) {
        const current = getCurrentTime();
        playheadSampleRef.current = Math.floor(current * sampleRateRef.current);
        scheduleFrom(playheadSampleRef.current);
      }
      notify();
    },
    [getCurrentTime, notify, scheduleFrom],
  );

  const append = useCallback(
    (samples, sampleRate) => {
      sampleRateRef.current = sampleRate;
      chunksRef.current.push({ samples, sampleRate });
      totalSamplesRef.current += samples.length;

      if (playingRef.current && sourcesRef.current.length === 0) {
        scheduleFrom(playheadSampleRef.current);
      } else if (playingRef.current) {
        const ctx = ensureCtx();
        const buffer = ctx.createBuffer(1, samples.length, sampleRate);
        buffer.copyToChannel(new Float32Array(samples), 0);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = rateRef.current;
        source.connect(ctx.destination);

        const now = ctx.currentTime;
        const startAt = Math.max(nextStartTimeRef.current, now + 0.02);
        source.start(startAt);
        sourcesRef.current.push(source);
        nextStartTimeRef.current =
          startAt + samples.length / sampleRate / rateRef.current;
      }

      notify();
    },
    [ensureCtx, notify, scheduleFrom],
  );

  const reset = useCallback(() => {
    playingRef.current = false;
    stopSources();
    cancelAnimationFrame(rafRef.current);
    chunksRef.current = [];
    totalSamplesRef.current = 0;
    playheadSampleRef.current = 0;
    nextStartTimeRef.current = 0;
    notify();
  }, [notify, stopSources]);

  const subscribe = useCallback((fn) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      stopSources();
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, [stopSources]);

  return {
    append,
    play,
    pause,
    seek,
    setRate,
    reset,
    subscribe,
    getCurrentTime,
    getBufferedDuration,
    isPlaying: () => playingRef.current,
    getRate: () => rateRef.current,
  };
}

export default function AudioPlayer({ content, slug }) {
  const player = usePcmPlayer();
  const [status, setStatus] = useState('idle');
  const [statusDetail, setStatusDetail] = useState('');
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRateState] = useState(1);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const generatingRef = useRef(false);

  useEffect(() => {
    return player.subscribe(() => {
      setPlaying(player.isPlaying());
      setCurrentTime(player.getCurrentTime());
      setDuration(player.getBufferedDuration());
      setRateState(player.getRate());
    });
  }, [player]);

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    generatingRef.current = false;
    player.reset();
    setStatus('idle');
    setStatusDetail('');
    setError(null);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [slug, content]); // eslint-disable-line react-hooks/exhaustive-deps

  const startGeneration = useCallback(async () => {
    if (generatingRef.current || !content?.trim()) return;

    generatingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;

    player.reset();
    setError(null);
    setStatus('loading');
    setStatusDetail('Loading voice model…');

    try {
      const [
        { markdownToSpeech },
        { loadKokoro, streamSpeech, getKokoroDevice },
      ] = await Promise.all([
        import('../lib/markdownToSpeech'),
        import('../lib/kokoroEngine'),
      ]);

      const text = markdownToSpeech(content);
      if (!text.trim()) {
        throw new Error('Nothing to read in this post.');
      }

      await loadKokoro((info) => {
        if (info.status === 'progress' && typeof info.progress === 'number') {
          setStatusDetail(`Downloading voice… ${Math.round(info.progress)}%`);
        } else if (info.status === 'done' || info.status === 'loading') {
          setStatusDetail('Preparing voice…');
        }
      }, controller.signal);

      if (controller.signal.aborted) return;

      const device = getKokoroDevice();
      setStatus('generating');
      setStatusDetail(
        device === 'webgpu'
          ? 'Starting playback (GPU)…'
          : 'Starting playback (CPU)…',
      );

      let chunkCount = 0;
      let startedPlayback = false;

      await streamSpeech(text, {
        signal: controller.signal,
        getBufferedAheadSeconds: () => {
          const buffered = player.getBufferedDuration();
          const current = player.getCurrentTime();
          return Math.max(0, buffered - current);
        },
        onChunk: ({ audio, samplingRate }) => {
          player.append(audio, samplingRate);
          chunkCount += 1;

          if (!startedPlayback) {
            startedPlayback = true;
            player.play();
          }

          setStatusDetail(
            `Playing — buffering ahead (${chunkCount} segments)`,
          );
        },
      });

      if (controller.signal.aborted) return;

      setStatus('ready');
      setStatusDetail('Ready');
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.error('TTS error:', err);
      setError(err?.message || 'Failed to generate audio');
      setStatus('error');
      setStatusDetail('');
      player.pause();
    } finally {
      generatingRef.current = false;
    }
  }, [player, content]);

  const handlePlayPause = async () => {
    if (status === 'idle' || status === 'error') {
      await startGeneration();
      return;
    }

    if (playing) {
      player.pause();
    } else {
      await player.play();
    }
  };

  const handleSeek = (e) => {
    player.seek(Number(e.target.value));
  };

  const handleSpeed = () => {
    const idx = SPEEDS.indexOf(rate);
    player.setRate(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const handleStop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    generatingRef.current = false;
    player.reset();
    setStatus('idle');
    setStatusDetail('');
    setError(null);
  };

  if (!content?.trim()) return null;

  const label =
    status === 'idle'
      ? 'Listen'
      : playing
        ? 'Pause'
        : 'Play';

  return (
    <div className={styles.audioPlayer} aria-label="Listen to this article">
      <div className={styles.audioControls}>
        <button
          type="button"
          className={styles.audioPlayBtn}
          onClick={handlePlayPause}
          disabled={status === 'loading'}
          aria-label={label}
        >
          {status === 'idle' || status === 'error'
            ? 'Listen'
            : playing
              ? 'Pause'
              : 'Play'}
        </button>

        <div className={styles.audioProgressWrap}>
          <input
            type="range"
            className={styles.audioSeek}
            min={0}
            max={Math.max(duration, 0.01)}
            step={0.1}
            value={Math.min(currentTime, duration)}
            onChange={handleSeek}
            disabled={duration <= 0}
            aria-label="Seek"
          />
          <div className={styles.audioTime}>
            <span>{formatTime(currentTime)}</span>
            <span>
              {status === 'generating' || status === 'loading' ? '…' : ''}
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={styles.audioSpeedBtn}
          onClick={handleSpeed}
          disabled={status === 'idle' || status === 'loading'}
          aria-label="Playback speed"
          title="Playback speed"
        >
          {rate}x
        </button>

        {status !== 'idle' && (
          <button
            type="button"
            className={styles.audioStopBtn}
            onClick={handleStop}
            aria-label="Stop"
            title="Stop and reset"
          >
            Stop
          </button>
        )}
      </div>

      {(statusDetail || error) && (
        <p className={styles.audioStatus} role="status">
          {error || statusDetail}
        </p>
      )}
    </div>
  );
}
