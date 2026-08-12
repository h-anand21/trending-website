import React, { useState, useEffect } from 'react';
import { NOSTALGIC_QUOTES } from '../data/quotes';

export default function QuoteRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = NOSTALGIC_QUOTES[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-2">
      {/* Quote Display Area */}
      <div className="min-h-[70px] sm:min-h-[60px] flex flex-col items-center justify-center transition-all duration-500">
        <p 
          key={current.id}
          className="text-base sm:text-lg md:text-xl font-serif-luxury italic text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed animate-in fade-in zoom-in-95 duration-500"
        >
          "{current.quote}"
        </p>
        <span className="mt-1.5 text-xs sm:text-sm font-medium text-orange-300/80 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          {current.subtext}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-3">
        {NOSTALGIC_QUOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 bg-gradient-to-r from-orange-400 to-emerald-400 shadow-[0_0_8px_rgba(255,153,51,0.6)]'
                : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
