/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArtworkImage } from './ArtworkImage';
import { Play, Pause, Volume2, VolumeX, X, Disc3, ExternalLink } from 'lucide-react';

interface PersistentAudioPlayerProps {
  trackTitle: string | null;
  artistName: string | null;
  releaseTitle?: string | null;
  coverImageUrl?: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const PersistentAudioPlayer: React.FC<PersistentAudioPlayerProps> = ({
  trackTitle,
  artistName,
  releaseTitle,
  coverImageUrl,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [progress, setProgress] = useState(15);
  const [isMuted, setIsMuted] = useState(false);

  // Simulated progress timer while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!trackTitle) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-[1000px] mx-auto z-40 animate-in slide-in-from-bottom-4 duration-200">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-800 flex items-center justify-between gap-4">
        {/* Track Info & Vinyl Art Thumbnail */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 relative overflow-hidden shadow-xs">
            {coverImageUrl ? (
              <ArtworkImage
                src={coverImageUrl}
                alt={trackTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <Disc3
                className={`w-6 h-6 text-[#BE1E2F] ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-['Hammersmith_One',sans-serif] text-xs sm:text-sm text-white truncate uppercase tracking-wide">
                {trackTitle}
              </span>
              {/* Equalizer animation */}
              {isPlaying && (
                <div className="hidden sm:flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#BE1E2F] rounded-full animate-eq-1" />
                  <span className="w-0.5 bg-white rounded-full animate-eq-2" />
                  <span className="w-0.5 bg-[#BE1E2F] rounded-full animate-eq-3" />
                  <span className="w-0.5 bg-white rounded-full animate-eq-4" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-['DM_Mono',monospace] truncate">
              {artistName} {releaseTitle ? `— ${releaseTitle}` : ''}
            </p>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[360px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2 text-[10px] font-['DM_Mono',monospace] text-slate-400">
            <span>1:24</span>
            <div
              className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-[#BE1E2F] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>6:45</span>
          </div>
        </div>

        {/* Right Actions: Mute, Direct Spotify & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-['DM_Mono',monospace] text-white transition-colors"
          >
            <span>Spotify</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
