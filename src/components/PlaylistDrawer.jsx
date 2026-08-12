import React from 'react';
import { X, Play, Pause, Music, Sparkles, ExternalLink } from 'lucide-react';
import { PATRIOTIC_PLAYLIST, PLAYLIST_URL } from '../data/playlist';
import { soundFx } from '../utils/soundEffects';

export default function PlaylistDrawer({ isOpen, onClose, currentTrack, isPlaying, onSelectTrack }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0e1219]/95 border border-white/15 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-white">Desh Bhakti Playlist</h3>
              <p className="text-xs text-white/60">6 Legendary Patriotic Anthems</p>
            </div>
          </div>
          
          <button 
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track List */}
        <div className="overflow-y-auto py-3 space-y-2 flex-1 pr-1 custom-scrollbar">
          {PATRIOTIC_PLAYLIST.map((track, idx) => {
            const isSelected = currentTrack.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectTrack(track);
                }}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-r from-orange-500/20 via-white/10 to-emerald-500/10 border border-orange-400/40 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Track Index or Equalizer */}
                  <div className="w-6 text-center text-xs font-mono text-white/50">
                    {isSelected && isPlaying ? (
                      <div className="flex items-end justify-center gap-0.5 h-4">
                        <span className="w-0.5 bg-orange-400 eq-bar-1"></span>
                        <span className="w-0.5 bg-white eq-bar-2"></span>
                        <span className="w-0.5 bg-emerald-400 eq-bar-3"></span>
                      </div>
                    ) : (
                      <span>0{idx + 1}</span>
                    )}
                  </div>

                  {/* Artwork Thumbnail */}
                  <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Title & Artist */}
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? 'text-orange-300' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Duration & Status */}
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-[11px] font-mono text-white/50 hidden sm:inline">
                    {track.duration}
                  </span>
                  <div className={`p-2 rounded-full ${isSelected ? 'bg-orange-500 text-black' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'} transition-colors`}>
                    {isSelected && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Link to YouTube Playlist */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Powered by YouTube Engine
          </span>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition"
          >
            <span>Open on YT Music</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
