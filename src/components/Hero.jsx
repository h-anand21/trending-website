import React, { useRef, useEffect } from 'react';
import { Sparkles, Flag, Heart, ArrowDown, Radio } from 'lucide-react';
import QuoteRotator from './QuoteRotator';
import { HandwrittenPostcard, CentralMemoryCard } from './MemoryPostcard';
import { soundFx } from '../utils/soundEffects';

export default function Hero({ onTriggerSalute, currentTime = 0, isPlaying = false }) {
  const videoRef = useRef(null);

  // Exact Mathematical Synchronization Rule:
  // videoTime = musicCurrentTime % 10
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoDuration = 10;
    const targetVideoTime = currentTime % videoDuration;

    // Synchronize video timeline strictly with music timeline
    if (Math.abs(video.currentTime - targetVideoTime) > 0.4) {
      video.currentTime = targetVideoTime;
    }

    if (isPlaying) {
      if (video.paused) {
        video.play().catch(() => {});
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [currentTime, isPlaying]);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 sm:pt-28 pb-32 sm:pb-36 px-4 sm:px-6 overflow-hidden">
      
      {/* 1. Cinematic Background Video Layer (HTML5 Video, Always Muted, Master-synced to Song Timeline) */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-black overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/video.mp4"
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
        />
        {/* Subtle Dark Cinematic Overlay + Warm Golden Morning Color Grade */}
        <div className="cinematic-overlay"></div>
        <div className="cinematic-warm-grade"></div>
      </div>

      {/* Floating Handwritten Nostalgic Postcards on Left & Right with Gentle Breeze Physics */}
      <div className="hidden lg:block">
        <HandwrittenPostcard
          text="School assembly yaad hai?"
          subtext="7:30 AM • White Uniforms"
          animationClass="animate-float-1"
          positionClass="top-[18%] left-[4%]"
        />
        <HandwrittenPostcard
          text="Subah ki parade aur drum roll..."
          subtext="Marching 1-2-1"
          animationClass="animate-float-2"
          positionClass="top-[30%] right-[4%]"
        />
        <HandwrittenPostcard
          text="Haath mein chhota sa Tiranga..."
          subtext="₹2 Joy • Infinite Pride"
          animationClass="animate-float-3"
          positionClass="bottom-[22%] left-[4%]"
        />
        <HandwrittenPostcard
          text="Ladoo lene ki lambi line!"
          subtext="The Sweet Taste of Freedom"
          animationClass="animate-float-4"
          positionClass="bottom-[24%] right-[4%]"
        />
      </div>

      {/* 2. Top Status Badge */}
      <div className="z-10 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-[11px] sm:text-xs font-mono tracking-widest text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
          <span className="text-orange-300 font-semibold">● LIVE MEMORY</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">15 AUG 1947 — 2026</span>
        </div>
      </div>

      {/* 3. Main Visual & Cinematic Typography (Saloon.wtf Inspired) */}
      <div className="z-10 text-center max-w-4xl mx-auto my-auto flex flex-col items-center">
        
        {/* Grand Tricolor Date Header */}
        <div className="relative inline-block mb-1">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)] select-none">
            15 AUGUST
          </h1>
          {/* Subtle tricolor line under title */}
          <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-500 rounded-full mt-1 opacity-90 shadow-[0_0_15px_rgba(255,153,51,0.5)]"></div>
        </div>

        {/* Subtitle */}
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-100 to-emerald-300 drop-shadow-md mt-2 mb-4 select-none">
          INDEPENDENCE DAY
        </h2>

        {/* Emotional Sub-headline */}
        <p className="font-serif-luxury italic text-base sm:text-xl md:text-2xl text-white/90 max-w-xl mx-auto drop-shadow-lg leading-relaxed mb-6 font-normal">
          "Some memories never fade. They live forever in the colours of our flag."
        </p>

        {/* Rotating Nostalgic Quotes */}
        <div className="w-full my-2">
          <QuoteRotator />
        </div>

        {/* Central Frosted Glass Memory Card */}
        <div className="mt-6 w-full">
          <CentralMemoryCard />
        </div>
      </div>

      {/* 4. Bottom Status UI & Keyboard 'S' to Salute Hint */}
      <div className="z-10 flex flex-col items-center gap-3 pt-6">
        
        {/* Keyboard Salute Pill CTA */}
        <button
          onClick={() => { soundFx.playClick(); onTriggerSalute(); }}
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card hover:border-orange-400/50 transition-all hover:scale-105 shadow-xl cursor-pointer"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 text-xs font-mono font-bold text-white group-hover:bg-orange-500 transition-colors">
            S
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90">
            Press <strong className="text-orange-300">S</strong> to Salute
          </span>
          <span className="text-sm">🇮🇳</span>
        </button>

        {/* Scroll Indicator */}
        <a 
          href="#memories" 
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-white/50 hover:text-white transition-colors uppercase pt-2"
        >
          <span>Scroll to Explore Memories</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
