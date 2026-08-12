import React from 'react';
import { Flag, Heart, Sparkles, Music } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Footer({ onTriggerSalute, onOpenPlaylist }) {
  return (
    <footer className="relative z-20 w-full pt-16 pb-36 sm:pb-40 px-6 border-t border-white/10 bg-gradient-to-b from-transparent to-black/90">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* National Anthem Stanza */}
        <div className="max-w-2xl mx-auto mb-10 p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
          <span className="text-3xl mb-3 block">🇮🇳</span>
          <p className="font-serif-luxury italic text-base sm:text-lg text-amber-200/90 leading-relaxed mb-3">
            "जन-गण-मन अधिनायक जय हे, भारत भाग्य विधाता।<br/>
            पंजाब-सिन्ध-गुजरात-मराठा, द्राविड़-उत्कल-बङ्ग..."
          </p>
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
            National Anthem of India • Rabindranath Tagore
          </span>
        </div>

        {/* Brand & Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => onTriggerSalute()}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-2"
          >
            <span>🫡</span>
            <span>Trigger National Salute</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); onOpenPlaylist(); }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-2"
          >
            <Music className="w-3.5 h-3.5 text-orange-400" />
            <span>Open Desh Bhakti Playlist</span>
          </button>
        </div>

        {/* Tribute Quote */}
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mb-6 leading-relaxed font-light">
          Dedicated to every teacher who pinned our first paper flag, every soldier standing guard at the frontier, and the eternal spirit of freedom that unites us all.
        </p>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-3">
          <div className="flex items-center gap-1.5">
            <span>🇮🇳</span>
            <span className="text-white/70 font-bold">15 AUGUST 1947 — 2026</span>
          </div>
          <div>
            <span>VANDE MATARAM • JAI HIND</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
