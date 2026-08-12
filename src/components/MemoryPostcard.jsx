import React from 'react';
import { Sparkles, Flag, Heart } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export function HandwrittenPostcard({ text, subtext, animationClass = '', positionClass = '' }) {
  return (
    <div 
      className={`absolute z-20 pointer-events-auto select-none transition-transform hover:scale-110 duration-300 ${positionClass} ${animationClass}`}
      onMouseEnter={() => soundFx.playClick()}
    >
      <div className="relative bg-[#181512]/90 backdrop-blur-xl border border-amber-200/25 px-4 py-3 rounded-lg shadow-[0_12px_35px_rgba(0,0,0,0.65)] text-amber-100 max-w-[230px] group cursor-pointer hover:border-amber-400/50 transition-colors">
        {/* Washi Tape Header */}
        <div className="washi-tape"></div>
        
        <p className="font-handwriting text-xl sm:text-2xl text-amber-200 group-hover:text-amber-100 leading-snug tracking-wide pt-1">
          "{text}"
        </p>
        {subtext && (
          <p className="text-[10px] uppercase font-sans tracking-widest text-amber-400/80 mt-1 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

export function CentralMemoryCard() {
  return (
    <div className="relative max-w-lg mx-auto w-full px-4">
      <div 
        className="glass-card p-6 sm:p-7 rounded-2xl relative overflow-hidden group border border-white/15 hover:border-orange-400/50 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.7)] cursor-default"
        onMouseEnter={() => soundFx.playClick()}
      >
        
        {/* Top Postcard Stamp & Date */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
              MEMOIR • 15 AUGUST
            </span>
          </div>
          <div className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-400/30 text-[10px] font-serif-luxury uppercase tracking-wider text-amber-300">
            INDIA 1947–2026
          </div>
        </div>

        {/* Heading */}
        <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-orange-300 transition-colors">
          <span>A Morning We'll Never Forget</span>
        </h3>

        {/* Body */}
        <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed mb-4">
          White canvas shoes cleaned with chalk. The rhythm of morning drums. Five hundred voices singing in unison under the open sky, watching the Tri-colour unfurl as flower petals rain down.
        </p>

        {/* Footer Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <span className="font-handwriting text-lg text-orange-300">
            "Woh bachpan ke 15 August..."
          </span>
          <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase font-semibold">
            UNITY • FREEDOM • PRIDE
          </span>
        </div>
      </div>
    </div>
  );
}
