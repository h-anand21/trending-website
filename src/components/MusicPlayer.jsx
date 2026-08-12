import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic } from 'lucide-react';
import { DESH_BHAKTI_SONGS } from '../data/songs';
import { soundFx } from '../utils/soundEffects';
import PlaylistDrawer from './PlaylistDrawer';

export default function MusicPlayer({ 
  isPlaying, 
  setIsPlaying, 
  currentTime = 0, 
  setCurrentTime,
  currentTrack, 
  setCurrentTrack 
}) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [duration, setDuration] = useState(378);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const audioRef = useRef(null);

  const song = DESH_BHAKTI_SONGS[trackIndex] || DESH_BHAKTI_SONGS[0];

  // Initialize and load real studio audio file
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioSrc);
    }

    const audio = audioRef.current;
    audio.src = song.audioSrc;
    audio.preload = 'auto';
    audio.volume = isMuted ? 0 : volume / 100;
    audio.muted = isMuted;

    // Apply custom startTime if defined (e.g. 2:18 / 138s for Ae Mere Watan Ke Logon)
    const initialSeekTime = song.startTime || 0;
    audio.currentTime = initialSeekTime;
    setCurrentTime(initialSeekTime);

    const handleTimeUpdate = () => {
      if (audio.currentTime !== undefined && !isNaN(audio.currentTime)) {
        setCurrentTime(Math.floor(audio.currentTime));
      }
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(Math.floor(audio.duration));
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(Math.floor(audio.duration));
      }
      if (song.startTime && song.startTime > 0) {
        audio.currentTime = song.startTime;
        setCurrentTime(song.startTime);
      }
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(e => console.warn("Audio play prevented:", e));
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [trackIndex]);

  // Handle Play/Pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.muted = isMuted;
      audio.volume = isMuted ? 0 : volume / 100;
      audio.play().catch(e => console.warn("Audio play error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Volume & Mute sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Play / Pause toggle
  const handleTogglePlay = () => {
    soundFx.playClick();
    if (!isPlaying) {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = volume / 100;
        audioRef.current.play().catch(e => console.warn("Audio error:", e));
      }
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  // Next Track
  const handleNextTrack = () => {
    soundFx.playClick();
    const nextIdx = (trackIndex + 1) % DESH_BHAKTI_SONGS.length;
    setTrackIndex(nextIdx);
    setCurrentTrack(DESH_BHAKTI_SONGS[nextIdx]);
    const startT = DESH_BHAKTI_SONGS[nextIdx].startTime || 0;
    setCurrentTime(startT);
    setIsPlaying(true);
  };

  // Previous Track
  const handlePrevTrack = () => {
    soundFx.playClick();
    const prevIdx = (trackIndex - 1 + DESH_BHAKTI_SONGS.length) % DESH_BHAKTI_SONGS.length;
    setTrackIndex(prevIdx);
    setCurrentTrack(DESH_BHAKTI_SONGS[prevIdx]);
    const startT = DESH_BHAKTI_SONGS[prevIdx].startTime || 0;
    setCurrentTime(startT);
    setIsPlaying(true);
  };

  // Select track from drawer
  const handleSelectTrack = (selectedSong) => {
    const idx = DESH_BHAKTI_SONGS.findIndex(s => s.id === selectedSong.id);
    if (idx !== -1) {
      setTrackIndex(idx);
      setCurrentTrack(DESH_BHAKTI_SONGS[idx]);
      const startT = DESH_BHAKTI_SONGS[idx].startTime || 0;
      setCurrentTime(startT);
      setIsPlaying(true);
    }
  };

  // Seek bar
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekPercentage = Math.max(0, Math.min(1, clickX / width));
    const seekTime = Math.floor(seekPercentage * duration);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (seconds) => {
    if (!isFinite(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Saloon.wtf Exact Floating Glass Capsule Player at Bottom Viewport */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-xl pointer-events-auto select-none">
        <div className={`relative flex items-center gap-3 sm:gap-4 rounded-full p-2.5 sm:p-3 pr-4 sm:pr-5 bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_12px_50px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:bg-black/50 hover:border-white/30 ${
          isPlaying ? 'shadow-[0_12px_50px_rgba(255,153,51,0.2)] border-white/30' : ''
        }`}>
          
          {/* Rotating Vinyl Record Cover */}
          <div className="relative h-13 w-13 sm:h-14 sm:w-14 shrink-0">
            <div 
              className="h-full w-full overflow-hidden rounded-full shadow-lg ring-1 ring-white/25 cursor-pointer"
              style={{
                animation: 'spin-slow 8s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
              onClick={() => setIsDrawerOpen(true)}
              title="Click to view all songs"
            >
              <img 
                src={song.cover || '/indian-flag.svg'} 
                alt={song.title} 
                className="h-full w-full object-cover"
              />
            </div>
            {/* Center Spindle Hole */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1.5 ring-white/60 shadow-inner"></div>
          </div>

          {/* Song Info & Seekable Progress Bar */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs sm:text-sm font-semibold text-white drop-shadow-sm">
              {song.title}
            </p>
            
            <p className="truncate text-[11px] sm:text-xs text-white/70">
              {song.artist}
            </p>

            {/* Seek Bar */}
            <div className="mt-1 sm:mt-1.5">
              <div 
                className="group/bar relative h-2 w-full cursor-pointer flex items-center" 
                onClick={handleSeek}
                role="slider"
                aria-label="Seek track position"
              >
                {/* Background Track */}
                <div className="absolute inset-x-0 h-1 rounded-full bg-white/20 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-white/90 transition-all duration-100" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                {/* Handle */}
                <div 
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover/bar:opacity-100"
                  style={{ left: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Time Indicators */}
              <div className="flex items-center justify-between text-[10px] tabular-nums text-white/60 mt-0.5">
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Controls Cluster */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Prev Track */}
            <button 
              type="button" 
              onClick={handlePrevTrack}
              aria-label="Previous track" 
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Solid White Circular Play/Pause Button */}
            <button 
              type="button" 
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Pause music" : "Play patriotic music"} 
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button 
              type="button" 
              onClick={handleNextTrack}
              aria-label="Next track" 
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Playlist Drawer Button */}
            <button 
              type="button" 
              onClick={() => { soundFx.playClick(); setIsDrawerOpen(true); }}
              aria-label="Open playlist drawer" 
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer ml-0.5"
              title="View Desh Bhakti Playlist"
            >
              <ListMusic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Playlist Drawer */}
      <PlaylistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTrack={song}
        isPlaying={isPlaying}
        onSelectTrack={handleSelectTrack}
      />
    </>
  );
}
