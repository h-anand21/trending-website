import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ onTriggerSalute }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTimeStr(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-5 flex items-center justify-between pointer-events-none select-none">
      
      {/* Left: Clock Time */}
      <div className="pointer-events-auto flex items-center">
        <span className="text-white/90 font-medium text-xs sm:text-base tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {timeStr}
        </span>
      </div>

      {/* Center: Mathematically Centered "15 August Independence Day" Badge */}
      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white shadow-[0_4px_25px_rgba(0,0,0,0.55)] transition-transform hover:scale-105">
        <img src="/indian-flag.svg" alt="India Flag" className="w-4 h-2.5 sm:w-5 sm:h-3.5 rounded-xs sm:rounded-sm object-cover shadow-sm shrink-0" />
        <span className="font-display font-bold sm:font-extrabold tracking-wider sm:tracking-widest text-white drop-shadow-sm text-[11px] sm:text-sm uppercase whitespace-nowrap">
          <span className="inline sm:hidden">15 Aug Independence</span>
          <span className="hidden sm:inline">15 August Independence Day</span>
        </span>
      </div>

      {/* Right: Action Buttons (Salute, Spotify ↗, YT Music ↗) */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={() => { soundFx.playClick(); onTriggerSalute(); }}
          className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 text-[11px] sm:text-[13px] font-medium text-white transition-all active:scale-95 shadow-md cursor-pointer"
          title="Press 'S' to Salute"
        >
          <span>🫡</span>
          <span className="hidden sm:inline">Salute</span>
        </button>

        <a
          href="https://open.spotify.com/playlist/37i9dQZF1DX1qWs358249L"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick()}
          className="hidden md:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-[13px] font-medium text-white/90 hover:text-white transition-all shadow-md"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Spotify</span>
          <span className="text-[10px] text-white/50">↗</span>
        </a>

        <a
          href="https://music.youtube.com/playlist?list=PLtp23GqaHmiAJgvaHYI3UULaqgcVOKwNd"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-[13px] font-medium text-white/90 hover:text-white transition-all shadow-md"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.977 0-7.2-3.223-7.2-7.2s3.223-7.2 7.2-7.2 7.2 3.223 7.2 7.2-3.223 7.2-7.2 7.2zm0-11.4c-2.316 0-4.2 1.884-4.2 4.2s1.884 4.2 4.2 4.2 4.2-1.884 4.2-4.2-1.884-4.2-4.2-4.2zm-1.2 5.85V10.35L14.1 12l-3.3 1.65z"/>
          </svg>
          <span className="hidden sm:inline">YT Music</span>
          <span className="text-[10px] text-white/50">↗</span>
        </a>
      </div>
    </header>
  );
}
