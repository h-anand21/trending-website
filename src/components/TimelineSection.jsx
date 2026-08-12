import React from 'react';
import { TIMELINE_DATA } from '../data/timeline';
import { Flag, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative z-20 w-full py-20 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-3">
          <span>●</span> HISTORIC JOURNEY
        </div>
        
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
          The Journey of Freedom
        </h2>

        <p className="text-sm sm:text-base text-white/70 font-light">
          From the midnight bells of 1947 to a billion beating hearts in 2026.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative">
        {/* Center Glowing Line */}
        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-white to-emerald-500 opacity-30 shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>

        <div className="space-y-10 sm:space-y-12">
          {TIMELINE_DATA.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={item.year}
                onClick={() => soundFx.playClick()}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } group cursor-pointer`}
              >
                {/* Node Center Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0d1118] border-2 border-white/30 group-hover:border-orange-400 flex items-center justify-center z-10 transition-all group-hover:scale-125 shadow-lg">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accent }}></span>
                </div>

                {/* Content Card */}
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-12' : 'sm:pr-12'}`}>
                  <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm sm:text-base font-bold tracking-wider" style={{ color: item.accent }}>
                        {item.year}
                      </span>
                      <span className="font-handwriting text-base text-amber-300">
                        {item.hindi}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
