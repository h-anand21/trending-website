import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MemoriesSection from './components/MemoriesSection';
import TimelineSection from './components/TimelineSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import SaluteModal from './components/SaluteModal';
import ParticleLayer from './components/ParticleLayer';
import { PATRIOTIC_PLAYLIST } from './data/playlist';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(PATRIOTIC_PLAYLIST[0]);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isSaluteOpen, setIsSaluteOpen] = useState(false);
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState(false);

  // Global Keyboard 'S' for Salute
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If user is typing in an input, don't hijack
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

  const toggleVideoMute = () => {
    soundFx.playClick();
    setIsVideoMuted(prev => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#08090C] text-white selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* 1. Ambient Floating Canvas Particles (Petals & Tricolor Embers) */}
      <ParticleLayer isPlaying={isPlaying} />

      {/* 2. Top Floating Glass Navbar */}
      <Navbar
        isVideoMuted={isVideoMuted}
        onToggleVideoMute={toggleVideoMute}
        onTriggerSalute={triggerSalute}
        onOpenPlaylist={() => setIsPlaylistDrawerOpen(true)}
      />

      {/* 3. Full-Screen Cinematic Hero Experience with Video Background */}
      <main>
        <Hero
          isVideoMuted={isVideoMuted}
          onTriggerSalute={triggerSalute}
        />

        {/* 4. "Memories That Stay" Interactive Cards Section */}
        <MemoriesSection />

        {/* 5. Historic India Journey Timeline */}
        <TimelineSection />
      </main>

      {/* 6. Nostalgic Footer with Tribute & Anthem */}
      <Footer
        onTriggerSalute={triggerSalute}
        onOpenPlaylist={() => setIsPlaylistDrawerOpen(true)}
      />

      {/* 7. Saloon.wtf-Style Floating Bottom Glass Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />

      {/* 8. National Salute Celebration Modal (Triggered by 'S' or click) */}
      <SaluteModal
        isOpen={isSaluteOpen}
        onClose={() => setIsSaluteOpen(false)}
      />
    </div>
  );
}
