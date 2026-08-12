import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';

export default function SaluteModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // 1. Play synthesized Bugle Salute Fanfare
      soundFx.playSaluteChime();

      // 2. Multi-stage Tricolor Fireworks & Flower Petal Explosion
      const count = 220;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#FF9933', '#FFFFFF', '#138808', '#FFB300', '#10B981']
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 30, startVelocity: 60 });
      fire(0.2, { spread: 65 });
      fire(0.35, { spread: 110, decay: 0.91, scalar: 0.85 });
      fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.25 });
      fire(0.1, { spread: 130, startVelocity: 50 });

      // Side cannons
      setTimeout(() => {
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.75 },
          colors: ['#FF9933', '#FFFFFF', '#138808', '#FFB066']
        });
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.75 },
          colors: ['#FF9933', '#FFFFFF', '#138808', '#34D399']
        });
      }, 250);

      // Auto dismiss after 4s
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300 cursor-pointer select-none"
      onClick={onClose}
    >
      <div className="relative max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl text-center border border-orange-500/40 shadow-[0_0_80px_rgba(255,153,51,0.35)] flex flex-col items-center">
        
        {/* Glowing Tricolor Ring with Ashoka Chakra Motif */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Animated Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 via-white to-emerald-500 opacity-75 blur-md animate-pulse"></div>
          
          <div className="relative w-20 h-20 rounded-full bg-[#0d1117] border-2 border-white/40 flex items-center justify-center shadow-inner">
            {/* Ashoka Chakra 24-spoke SVG */}
            <svg className="w-12 h-12 text-[#000080] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="45" strokeWidth="4" stroke="#000080" />
              <circle cx="50" cy="50" r="8" fill="#000080" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)}
                  strokeWidth="2"
                  stroke="#000080"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Grand Title */}
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-orange-400 font-bold mb-1">
          NATIONAL SALUTE • 15 AUGUST
        </span>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-emerald-400 drop-shadow-md mb-2">
          JAI HIND
        </h2>

        <p className="font-serif-luxury italic text-lg sm:text-xl text-amber-200/90 mb-4">
          "Vande Mataram"
        </p>

        <p className="text-sm text-white/80 leading-relaxed max-w-xs font-light">
          Saluting the courage of our freedom fighters, our armed forces, and the eternal spirit of India.
        </p>

        {/* Bottom indicator */}
        <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-white/50 font-mono">
          <span>🇮🇳 1947 — FOREVER</span>
          <span>CLICK ANYWHERE TO DISMISS</span>
        </div>
      </div>
    </div>
  );
}
