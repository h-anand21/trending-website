import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Flag, ExternalLink, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ onTriggerSalute, onOpenPlaylist }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Floating Glass Capsule Bar */}
      <div className={`w-full px-4 sm:px-8 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' : 'bg-transparent'
      }`}>
        
        {/* Left Side: Brand Logo & Live Time */}
        <div className="flex items-center gap-3">
          <a 
            href="#hero" 
            className="group flex items-center gap-2.5 text-white font-bold tracking-wider text-sm sm:text-base drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            onClick={() => soundFx.playClick()}
          >
            <span className="text-xl sm:text-2xl transform group-hover:scale-110 transition-transform">🇮🇳</span>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.2em] font-extrabold text-sm sm:text-base bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
                JAI HIND
              </span>
              <span className="text-[10px] text-white/60 tracking-widest uppercase font-medium hidden sm:inline">
                15 AUG 1947 • INDIA
              </span>
            </div>
          </a>

          {/* Time Badge */}
          <div className="hidden lg:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] tabular-nums text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            <span>{currentTime} IST</span>
          </div>
        </div>

        {/* Center Live Indicator Pill (Inspired by saloon.wtf) */}
        <div className="hidden md:inline-flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-xl border border-white/15 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
          </span>
          <span className="font-semibold text-white">1.4B+</span>
          <span className="text-white/60">Hearts Celebrating</span>
        </div>

        {/* Center Links (on scroll) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-white/80">
          <a href="#hero" className="hover:text-orange-400 transition-colors">Home</a>
          <a href="#memories" className="hover:text-orange-400 transition-colors">Memories</a>
          <a href="#timeline" className="hover:text-orange-400 transition-colors">Timeline</a>
          <button 
            onClick={() => { soundFx.playClick(); onOpenPlaylist(); }}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Songs</span>
          </button>
        </nav>

        {/* Right Side: Action Pills (Salute, Spotify/YT, Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Press S to Salute Pill */}
          <button
            onClick={() => onTriggerSalute()}
            className="group/salute relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500/20 via-white/10 to-emerald-500/20 hover:from-orange-500/30 hover:to-emerald-500/30 backdrop-blur-xl border border-orange-500/30 hover:border-orange-400/60 shadow-[0_0_15px_rgba(255,153,51,0.25)] transition-all transform active:scale-95 cursor-pointer"
            title="Press 'S' key anywhere to Salute"
          >
            <span className="text-sm sm:text-base animate-bounce">🫡</span>
            <span className="font-display tracking-wider">Salute</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/20 text-[10px] font-mono uppercase tracking-wider text-orange-200">
              S
            </span>
          </button>

          {/* Spotify & YT Music Links */}
          <a
            href="https://open.spotify.com/search/patriotic%20hindi%20songs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 transition-all hover:opacity-90 active:scale-95"
            aria-label="Open Spotify"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="hidden md:inline">Spotify</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 md:hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-black/90 backdrop-blur-2xl border-b border-white/15 px-6 py-5 flex flex-col gap-4 text-base font-medium animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
          <a 
            href="#hero" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-white hover:text-orange-400 py-1"
          >
            <span>🇮🇳</span> Home
          </a>
          <a 
            href="#memories" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-white hover:text-orange-400 py-1"
          >
            <Sparkles className="w-4 h-4 text-orange-400" /> Memories That Stay
          </a>
          <a 
            href="#timeline" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-white hover:text-orange-400 py-1"
          >
            <Flag className="w-4 h-4 text-emerald-400" /> Historic India Timeline
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenPlaylist(); }}
            className="flex items-center gap-3 text-white hover:text-orange-400 py-1 text-left"
          >
            <Music className="w-4 h-4 text-blue-400" /> Desh Bhakti Playlist
          </button>
        </div>
      )}
    </header>
  );
}
