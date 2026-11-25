import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC_CONFIG } from '../config/surpriseConfig';

// Gentle romantic chord progression (Fmaj7 -> Dm9 -> Bbmaj7 -> C6) in Hz
const AMBIENT_PROGRESSION = [
  [349.23, 440.0, 523.25, 659.25], // Fmaj7
  [293.66, 349.23, 440.0, 659.25], // Dm9
  [233.08, 349.23, 440.0, 587.33], // Bbmaj7
  [261.63, 392.0, 440.0, 659.25], // C6
];

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const usingCustomTrackRef = useRef(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Probe whether a custom MP3 exists in public/music/
  useEffect(() => {
    let cancelled = false;
    const probeCustomAudio = async () => {
      try {
        const res = await fetch(MUSIC_CONFIG.customTrackUrl, { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        if (!cancelled && res.ok && contentType.startsWith('audio/')) {
          const audio = new Audio(MUSIC_CONFIG.customTrackUrl);
          audio.loop = true;
          audio.volume = MUSIC_CONFIG.volume;
          audio.preload = 'auto';
          audioRef.current = audio;
          usingCustomTrackRef.current = true;
        }
      } catch {
        // Silently fall back to built-in ambient Web Audio melody
      }
    };
    probeCustomAudio();

    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playSoftNote = useCallback((freq, delaySec, durationSec) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || ctx.state !== 'running') return;

    const now = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const harmonic = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.06, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.14, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec);

    osc.connect(noteGain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    noteGain.connect(master);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + durationSec + 0.05);
    harmonic.stop(now + durationSec + 0.05);
  }, []);

  const scheduleAmbientBar = useCallback(() => {
    const chord = AMBIENT_PROGRESSION[stepRef.current % AMBIENT_PROGRESSION.length];
    stepRef.current += 1;

    // Gentle arpeggiated music-box / felt-piano pattern
    playSoftNote(chord[0] * 0.5, 0.0, 3.6);
    playSoftNote(chord[1], 0.45, 2.8);
    playSoftNote(chord[2], 0.95, 2.6);
    playSoftNote(chord[3], 1.5, 2.8);
    playSoftNote(chord[2], 2.25, 2.1);
  }, [playSoftNote]);

  const startSynth = useCallback(async () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const master = masterGainRef.current;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.001), ctx.currentTime);
    master.gain.linearRampToValueAtTime(MUSIC_CONFIG.volume * 0.55, ctx.currentTime + 0.8);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    scheduleAmbientBar();
    timerRef.current = setInterval(scheduleAmbientBar, 3200);
  }, [scheduleAmbientBar]);

  const stopSynth = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    }
  }, []);

  const start = useCallback(async () => {
    setHasInteracted(true);
    if (isPlayingRef.current) return;

    if (usingCustomTrackRef.current && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      } catch {
        // Fallback to Web Audio if custom audio fails
      }
    }

    try {
      await startSynth();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [startSynth]);

  const pause = useCallback(() => {
    if (usingCustomTrackRef.current && audioRef.current) {
      audioRef.current.pause();
    } else {
      stopSynth();
    }
    setIsPlaying(false);
  }, [stopSynth]);

  const toggle = useCallback(async () => {
    if (isPlayingRef.current) {
      pause();
    } else {
      await start();
    }
  }, [pause, start]);

  return {
    isPlaying,
    hasInteracted,
    start,
    pause,
    toggle,
  };
}

