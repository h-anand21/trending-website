import React from 'react';
import { Flag, Heart, Radio, Sparkles, Volume2 } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memories';
import { soundFx } from '../utils/soundEffects';

export default function MemoriesSection() {
  const getIcon = (name) => {
    switch (name) {
      case 'Flag': return <Flag className="w-5 h-5 text-orange-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="memories" className="relative z-20 w-full py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-mono tracking-widest uppercase mb-3">
          <span>●</span> NOSTALGIC ARCHIVE
        </div>
        
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Memories That Stay
        </h2>

        <p className="font-handwriting text-2xl sm:text-3xl text-amber-200/90 mb-3">
          "Woh 15 August ki subah, safed vardi aur chhota sa Tiranga..."
        </p>

        <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
          Some mornings never fade with time. Relive the heartfelt emotions and golden childhood memories of Indian Independence Day.
        </p>
      </div>

      {/* 4 Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {MEMORIES_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => soundFx.playClick()}
            className="group glass-card glass-card-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/15 cursor-pointer"
          >
            {/* Ambient Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.tagColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

            {/* Top Bar inside Card */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-handwriting text-base text-amber-300">
                    {item.hindi}
                  </span>
                </div>
              </div>

              {/* Time Tag */}
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
                {item.time}
              </span>
            </div>

            {/* Quote */}
            <p className="relative z-10 font-serif-luxury italic text-base text-white/90 mb-3 leading-relaxed">
              "{item.quote}"
            </p>

            {/* Detailed Description */}
            <p className="relative z-10 text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-4">
              {item.details}
            </p>

            {/* Card Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase tracking-widest text-orange-400 font-semibold">
                {item.badge}
              </span>
              <span className="text-white/40 text-[11px] group-hover:text-white/80 transition-colors">
                Relive Memory →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
