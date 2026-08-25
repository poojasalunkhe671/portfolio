import { useCallback, useRef } from 'react';

export const useTypingSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem('typingSound') !== '1') return;
    
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      audioCtxRef.current = new AudioContext();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Create a mechanical keyboard click-like sound
    osc.type = 'square';
    osc.frequency.setValueAtTime(100 + Math.random() * 50, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  }, []);

  return playSound;
};
