import React, { useRef, useEffect } from 'react';

export default function Hero({ currentTime = 0, isPlaying = false }) {
  const videoRef = useRef(null);

  // Guarantee continuous looping autoplay & 100% permanent mute
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;

    const playVideo = () => {
      if (video) {
        video.muted = true;
        video.volume = 0;
        video.play().catch(() => {});
      }
    };

    playVideo();

    window.addEventListener('click', playVideo, { once: true });
    window.addEventListener('touchstart', playVideo, { once: true });
    window.addEventListener('pointerdown', playVideo, { once: true });

    return () => {
      window.removeEventListener('click', playVideo);
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('pointerdown', playVideo);
    };
  }, []);

  // Sync video timeline with music timeline when playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const videoDuration = 10;
      const targetVideoTime = currentTime % videoDuration;

      // Keep in lockstep sync with song
      if (Math.abs(video.currentTime - targetVideoTime) > 0.6) {
        video.currentTime = targetVideoTime;
      }

      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }, [currentTime, isPlaying]);

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden select-none">
      
      {/* 100% Pure Raw Video Layer (NO filter, NO overlays, NO white/dark shades, purely raw video) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          onVolumeChange={(e) => { e.target.muted = true; e.target.volume = 0; }}
          className="w-full h-full object-cover"
        />
      </div>

    </section>
  );
}
