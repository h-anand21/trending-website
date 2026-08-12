import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicPlayer from './components/MusicPlayer';
import SaluteModal from './components/SaluteModal';
import { DESH_BHAKTI_SONGS } from './data/songs';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(DESH_BHAKTI_SONGS[0]);
  const [isSaluteOpen, setIsSaluteOpen] = useState(false);

  // Global AudioContext unlocker on first user gesture
  useEffect(() => {
    const unlockAudio = () => {
      soundFx.init();
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Global Keyboard 'S' for Salute
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        triggerSalute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSalute = () => {
    setIsSaluteOpen(true);
  };

  return (
    <div className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black text-white selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* 1. Top Bar (5:41 pm | ● 1.4B+ online | Spotify ↗ | YT Music ↗) */}
      <Navbar
        onTriggerSalute={triggerSalute}
      />

      {/* 2. Full-Screen Cinematic Video Background & Center Devanagari Title */}
      <main className="w-full h-full">
        <Hero
          currentTime={currentTime}
          isPlaying={isPlaying}
        />
      </main>

      {/* 3. Saloon.wtf Floating Glass Capsule Music Player at Bottom Viewport */}
      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />

      {/* 4. National Salute Celebration Modal (Triggered by 'S' or button) */}
      <SaluteModal
        isOpen={isSaluteOpen}
        onClose={() => setIsSaluteOpen(false)}
      />
    </div>
  );
}
