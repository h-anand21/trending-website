import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  ListMusic, Shuffle, Repeat, ExternalLink, Sparkles 
} from 'lucide-react';
import { PATRIOTIC_PLAYLIST } from '../data/playlist';
import { soundFx } from '../utils/soundEffects';
import PlaylistDrawer from './PlaylistDrawer';

export default function MusicPlayer({ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.durationSec || 300);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef(null);
  const timeUpdateInterval = useRef(null);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    // Check if YT is loaded on window
    const initYT = () => {
      if (window.YT && window.YT.Player) {
        if (!playerRef.current) {
          playerRef.current = new window.YT.Player('yt-audio-player', {
            height: '1',
            width: '1',
            videoId: currentTrack.youtubeId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              fs: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              origin: window.location.origin
            },
            events: {
              onReady: (event) => {
                setPlayerReady(true);
                event.target.setVolume(volume);
              },
              onStateChange: (event) => {
                // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  handleNextTrack();
                }
              }
            }
          });
        }
      } else {
        // Load YouTube IFrame API script if not loaded
        if (!document.getElementById('yt-script')) {
          const tag = document.createElement('script');
          tag.id = 'yt-script';
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        window.onYouTubeIframeAPIReady = () => {
          initYT();
        };
      }
    };

    initYT();

    return () => {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    };
  }, []);

  // Update track when currentTrack changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById && playerReady) {
      if (isPlaying) {
        playerRef.current.loadVideoById(currentTrack.youtubeId);
      } else {
        playerRef.current.cueVideoById(currentTrack.youtubeId);
      }
    }
    setCurrentTime(0);
    setDuration(currentTrack.durationSec);
  }, [currentTrack, playerReady]);

  // Track progress timer
  useEffect(() => {
    if (isPlaying) {
      timeUpdateInterval.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const cur = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (cur !== undefined && !isNaN(cur)) setCurrentTime(cur);
            if (dur && !isNaN(dur) && dur > 0) setDuration(dur);
          } catch (e) {
            // Fallback simulated progress
            setCurrentTime((prev) => (prev + 1) % duration);
          }
        } else {
          setCurrentTime((prev) => (prev + 1) % duration);
        }
      }, 1000);
    } else {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    }
    return () => {
      if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    };
  }, [isPlaying, duration]);

  // Play / Pause handler
  const handleTogglePlay = () => {
    soundFx.playClick();
    if (!isPlaying) {
      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }
      setIsPlaying(true);
    } else {
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
      setIsPlaying(false);
    }
  };

  // Next Track
  const handleNextTrack = () => {
    soundFx.playClick();
    const currentIndex = PATRIOTIC_PLAYLIST.findIndex(t => t.id === currentTrack.id);
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * PATRIOTIC_PLAYLIST.length);
    } else {
      nextIndex = (currentIndex + 1) % PATRIOTIC_PLAYLIST.length;
    }
    setCurrentTrack(PATRIOTIC_PLAYLIST[nextIndex]);
    setIsPlaying(true);
  };

  // Previous Track
  const handlePrevTrack = () => {
    soundFx.playClick();
    const currentIndex = PATRIOTIC_PLAYLIST.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + PATRIOTIC_PLAYLIST.length) % PATRIOTIC_PLAYLIST.length;
    setCurrentTrack(PATRIOTIC_PLAYLIST[prevIndex]);
    setIsPlaying(true);
  };

  // Seek bar handler
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekPercentage = Math.max(0, Math.min(1, clickX / width));
    const seekTime = seekPercentage * duration;
    setCurrentTime(seekTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seekTime, true);
    }
  };

  // Volume toggle
  const handleToggleMute = () => {
    soundFx.playClick();
    if (isMuted) {
      setIsMuted(false);
      if (playerRef.current && playerRef.current.unMute) playerRef.current.unMute();
      if (playerRef.current && playerRef.current.setVolume) playerRef.current.setVolume(volume);
    } else {
      setIsMuted(true);
      if (playerRef.current && playerRef.current.mute) playerRef.current.mute();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden YouTube Iframe Player container */}
      <div className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-1 w-1 opacity-0 overflow-hidden">
        <div id="yt-audio-player"></div>
      </div>

      {/* Saloon.wtf inspired Floating Bottom Glass Capsule Player */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-xl pointer-events-auto">
        <div className="group relative flex items-center gap-3 sm:gap-4 rounded-full p-2.5 sm:p-3 pr-4 sm:pr-5 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:border-white/30 hover:bg-white/[0.12]">
          
          {/* Rotating Vinyl Disc with Center Spindle (Exact Saloon.wtf design) */}
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
            <div 
              className="h-full w-full overflow-hidden rounded-full shadow-lg ring-1 ring-white/20 cursor-pointer"
              style={{
                animation: 'spin-slow 8s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
              onClick={() => setIsDrawerOpen(true)}
              title="Click to view playlist"
            >
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className="h-full w-full object-cover"
              />
            </div>
            {/* Center Spindle Hole */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 ring-2 ring-white/50 shadow-inner"></div>
          </div>

          {/* Song Info & Seekable Progress Bar */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm sm:text-[15px] font-semibold text-white drop-shadow-sm">
                {currentTrack.title}
              </p>
              {isPlaying && (
                <span className="hidden sm:inline-flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-orange-400 eq-bar-1"></span>
                  <span className="w-0.5 bg-white eq-bar-2"></span>
                  <span className="w-0.5 bg-emerald-400 eq-bar-3"></span>
                </span>
              )}
            </div>
            
            <p className="truncate text-xs sm:text-[13px] text-white/70">
              {currentTrack.artist}
            </p>

            {/* Seek Bar */}
            <div className="mt-1.5 sm:mt-2">
              <div 
                className="group/bar relative h-2.5 w-full cursor-pointer flex items-center" 
                onClick={handleSeek}
                role="slider"
                aria-label="Seek track position"
              >
                {/* Background Track */}
                <div className="absolute inset-x-0 h-1 rounded-full bg-white/20 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-white to-emerald-400 transition-all duration-100" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                {/* Thumb Handle */}
                <div 
                  className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover/bar:opacity-100 ring-2 ring-orange-400/50"
                  style={{ left: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Time Indicators & Badge */}
              <div className="flex items-center justify-between mt-0.5 text-[10px] sm:text-[11px] tabular-nums text-white/60">
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                <span className="hidden sm:inline text-orange-300/80 font-mono tracking-wider">
                  {currentTrack.tag}
                </span>
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
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Solid White Circular Play/Pause Button */}
            <button 
              type="button" 
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Pause music" : "Play patriotic music"} 
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button 
              type="button" 
              onClick={handleNextTrack}
              aria-label="Next track" 
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Playlist Drawer Button */}
            <button 
              type="button" 
              onClick={() => { soundFx.playClick(); setIsDrawerOpen(true); }}
              aria-label="Open playlist drawer" 
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
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
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onSelectTrack={(track) => {
          setCurrentTrack(track);
          setIsPlaying(true);
        }}
      />
    </>
  );
}
