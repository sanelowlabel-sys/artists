/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SANELOW_RADIO_SESSIONS, RadioSession } from '../data/sanelowCatalog';
import { ArtworkImage } from './ArtworkImage';
import { Radio, Play, Pause, Disc3, ExternalLink, Calendar, Clock, ListMusic } from 'lucide-react';

interface RadioViewProps {
  onPlayEpisode: (episodeTitle: string, hostName: string) => void;
  currentPlayingTrack: string | null;
  isPlaying: boolean;
}

export const RadioView: React.FC<RadioViewProps> = ({
  onPlayEpisode,
  currentPlayingTrack,
  isPlaying,
}) => {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>(SANELOW_RADIO_SESSIONS[0].id);

  const selectedEpisode =
    SANELOW_RADIO_SESSIONS.find((ep) => ep.id === activeEpisodeId) || SANELOW_RADIO_SESSIONS[0];

  const isCurrentEpisodePlaying =
    currentPlayingTrack === selectedEpisode.title && isPlaying;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
          Curated Soundwaves
        </span>
        <h2 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
          Sanelow Radio & Sets
        </h2>
        <p className="text-sm text-slate-600 font-['Exo',sans-serif]">
          Monthly studio sessions, guest mixes, tape loops, and rare vinyl selections broadcast straight from the label archive.
        </p>
      </div>

      {/* Featured Episode Showcase Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
        {/* Cover Art Backdrop */}
        <div className="absolute inset-0 z-0">
          <ArtworkImage
            src={selectedEpisode.coverImageUrl}
            alt={selectedEpisode.title}
            className="w-full h-full object-cover brightness-40 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-['DM_Mono',monospace] text-white/80">
              <span className="px-2.5 py-1 rounded-md bg-[#BE1E2F] text-white font-bold uppercase tracking-wider shadow-xs">
                {selectedEpisode.episodeNumber}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {selectedEpisode.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {selectedEpisode.duration}
              </span>
            </div>

            <h3 className="font-['Hammersmith_One',sans-serif] text-2xl sm:text-3xl text-white uppercase tracking-wide">
              {selectedEpisode.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 font-['Exo',sans-serif] leading-relaxed">
              {selectedEpisode.description}
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs text-slate-400 font-['DM_Mono',monospace]">Curated by:</span>
              <span className="text-xs font-semibold text-white font-['Exo',sans-serif]">
                {selectedEpisode.host}
              </span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {selectedEpisode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-['DM_Mono',monospace] border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Player CTA */}
          <div className="shrink-0 flex flex-col items-center sm:items-start lg:items-center gap-4">
            <button
              type="button"
              onClick={() => onPlayEpisode(selectedEpisode.title, selectedEpisode.host)}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white font-semibold font-['DM_Mono',monospace] text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg cursor-pointer"
            >
              {isCurrentEpisodePlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Broadcast</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                  <span>Stream Session</span>
                </>
              )}
            </button>

            <a
              href={selectedEpisode.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors font-['DM_Mono',monospace]"
            >
              <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Listen on Spotify</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Selected Episode Tracklist Scrubber */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
          <div className="flex items-center gap-2 text-xs font-['DM_Mono',monospace] text-white/80 uppercase tracking-wider mb-3">
            <ListMusic className="w-4 h-4 text-[#BE1E2F]" />
            <span>Broadcast Cue Sheet & Selections</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {selectedEpisode.tracklist.map((track, i) => (
              <div
                key={i}
                className="p-2.5 bg-black/40 backdrop-blur-xs border border-white/10 rounded-xl flex items-center gap-2.5 text-xs text-white/90"
              >
                <span className="text-[10px] font-['DM_Mono',monospace] text-[#BE1E2F] font-bold">
                  {i < 9 ? `0${i + 1}` : i + 1}
                </span>
                <span className="truncate">{track}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Episode Archive List */}
      <div className="space-y-4">
        <h4 className="font-['Hammersmith_One',sans-serif] text-xl text-slate-900 uppercase tracking-wide">
          Broadcast Archive
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SANELOW_RADIO_SESSIONS.map((ep) => {
            const isSelected = activeEpisodeId === ep.id;
            const isThisPlaying = currentPlayingTrack === ep.title && isPlaying;

            return (
              <div
                key={ep.id}
                onClick={() => setActiveEpisodeId(ep.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-red-50/40 border-[#BE1E2F] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Episode Cover Art Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-900">
                    <ArtworkImage
                      src={ep.coverImageUrl}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-['DM_Mono',monospace] text-[#BE1E2F] font-semibold uppercase tracking-wider block mb-0.5">
                      {ep.episodeNumber} · {ep.date}
                    </span>
                    <h5 className="font-['Hammersmith_One',sans-serif] text-base text-slate-900 uppercase truncate">
                      {ep.title}
                    </h5>
                    <p className="text-xs text-slate-500 font-['DM_Mono',monospace] mt-0.5 truncate">
                      Host: {ep.host}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayEpisode(ep.title, ep.host);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                      isThisPlaying
                        ? 'bg-[#BE1E2F] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-[#BE1E2F] text-slate-700 hover:text-white'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 font-['Exo',sans-serif]">
                  {ep.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-['DM_Mono',monospace] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Duration: {ep.duration}</span>
                  <span>{ep.tracklist.length} Tracks</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
