/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SANELOW_RELEASES, LabelRelease } from '../data/sanelowCatalog';
import { ArtworkImage } from './ArtworkImage';
import {
  Disc3,
  Play,
  Pause,
  ExternalLink,
  Share2,
  Check,
  Music2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ReleasesViewProps {
  onPlayTrack: (trackTitle: string, artistName: string, releaseTitle?: string) => void;
  currentPlayingTrack: string | null;
  isPlaying: boolean;
  onNavigateToArtist: (artistId: string) => void;
}

export const ReleasesView: React.FC<ReleasesViewProps> = ({
  onPlayTrack,
  currentPlayingTrack,
  isPlaying,
  onNavigateToArtist,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [expandedReleaseId, setExpandedReleaseId] = useState<string | null>(null);
  const [activeEmbedReleaseId, setActiveEmbedReleaseId] = useState<string | null>(SANELOW_RELEASES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formats = ['All', 'Vinyl', 'Digital EP', 'Compilation'];

  const filteredReleases = SANELOW_RELEASES.filter((rel) => {
    if (selectedFormat === 'All') return true;
    if (selectedFormat === 'Vinyl') return rel.format.toLowerCase().includes('vinyl');
    if (selectedFormat === 'Digital EP') return rel.format.toLowerCase().includes('digital ep');
    if (selectedFormat === 'Compilation') return rel.format.toLowerCase().includes('compilation');
    return true;
  });

  const handleShare = (release: LabelRelease) => {
    navigator.clipboard.writeText(release.spotifyUrl);
    setCopiedId(release.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
          Official Discography
        </span>
        <h2 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
          Sanelow Music Catalog
        </h2>
        <p className="text-sm text-slate-600 font-['Exo',sans-serif]">
          Explore vinyl editions, catalog compilations, and digital master EPs released under the Sanelow Music Group banner.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-['DM_Mono',monospace] text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Format:
          </span>
          {formats.map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1.5 rounded-full text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="text-xs font-['DM_Mono',monospace] text-slate-500">
          Showing <strong className="text-slate-900">{filteredReleases.length}</strong> releases
        </div>
      </div>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReleases.map((release) => {
          const isCurrentlyPlayingThisRelease = release.tracks.some(
            (t) => t.title === currentPlayingTrack && isPlaying
          );
          const isExpanded = expandedReleaseId === release.id;
          const isEmbedOpen = activeEmbedReleaseId === release.id;

          return (
            <div
              key={release.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Cover Art Box with Real Artwork & Vinyl Center */}
              <div
                className="relative aspect-square p-6 flex flex-col justify-between overflow-hidden transition-transform duration-300 bg-slate-900 select-none cursor-pointer"
                onClick={() => setActiveEmbedReleaseId(isEmbedOpen ? null : release.id)}
              >
                {/* Real Release Cover Art Image */}
                <div className="absolute inset-0 z-0">
                  <ArtworkImage
                    src={release.coverImageUrl}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    fallbackAccent={release.coverAccent}
                    fallbackTitle={release.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/30 pointer-events-none" />
                </div>

                {/* Stylized Vinyl Disc Accent overlay */}
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-white/15 opacity-40 flex items-center justify-center pointer-events-none group-hover:scale-110 group-hover:rotate-45 transition-all duration-700 z-1">
                  <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center">
                      <Disc3 className={`w-6 h-6 text-white/40 ${isCurrentlyPlayingThisRelease ? 'animate-spin' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Top Badges: Catalog & Format */}
                <div className="flex items-center justify-between text-[11px] font-['DM_Mono',monospace] text-white/90 z-10">
                  <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 font-bold tracking-wider shadow-xs">
                    {release.catalogNumber}
                  </span>
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 text-white/80 text-[10px]">
                    {release.format.split('&')[0]}
                  </span>
                </div>

                {/* Center Title and Artist */}
                <div className="z-10 mt-auto">
                  <span className="text-[10px] uppercase tracking-widest text-[#BE1E2F] font-bold font-['DM_Mono',monospace] bg-white/95 px-2 py-0.5 rounded-sm inline-block mb-1.5 shadow-sm">
                    {release.genre}
                  </span>
                  <h3 className="font-['Hammersmith_One',sans-serif] text-xl text-white uppercase tracking-wide leading-tight group-hover:text-red-200 transition-colors drop-shadow-md">
                    {release.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToArtist(release.artistId);
                    }}
                    className="text-xs font-['Exo',sans-serif] text-white/90 hover:text-white underline mt-1 text-left block cursor-pointer"
                  >
                    by {release.artistName}
                  </button>
                </div>

                {/* Quick Play First Track Action overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const firstTrack = release.tracks[0];
                    onPlayTrack(firstTrack.title, release.artistName, release.title);
                  }}
                  className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white flex items-center justify-center shadow-lg transition-transform transform active:scale-95 z-20 group-hover:scale-105"
                  title="Play Release Preview"
                >
                  {isCurrentlyPlayingThisRelease && isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Release Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-['DM_Mono',monospace]">
                    <span>{release.releaseDate}</span>
                    <span>{release.bpm} BPM · {release.key}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 font-['Exo',sans-serif] leading-relaxed">
                    {release.description}
                  </p>
                </div>

                {/* Tracklist Preview */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  <span className="text-[10px] font-['DM_Mono',monospace] text-slate-400 uppercase tracking-wider block">
                    Tracklist ({release.tracks.length} Cuts)
                  </span>
                  <div className="space-y-1">
                    {release.tracks.slice(0, isExpanded ? release.tracks.length : 2).map((tr, i) => {
                      const isThisTrackPlaying = currentPlayingTrack === tr.title && isPlaying;
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            isThisTrackPlaying
                              ? 'bg-red-50 text-[#BE1E2F] font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                          onClick={() => onPlayTrack(tr.title, release.artistName, release.title)}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400">
                              {isThisTrackPlaying ? (
                                <Pause className="w-3 h-3 fill-current text-[#BE1E2F]" />
                              ) : (
                                <Play className="w-3 h-3 fill-current ml-0.5" />
                              )}
                            </span>
                            <div className="truncate">
                              <span>{tr.title}</span>
                              {tr.artistCredit && (
                                <span className="text-[10px] text-slate-400 font-['DM_Mono',monospace] ml-1">
                                  ({tr.artistCredit})
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] font-['DM_Mono',monospace] text-slate-400 shrink-0 ml-2">
                            {tr.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {release.tracks.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setExpandedReleaseId(isExpanded ? null : release.id)}
                      className="text-[11px] font-['DM_Mono',monospace] text-[#BE1E2F] hover:underline pt-1 block cursor-pointer"
                    >
                      {isExpanded ? '▲ Hide Full Tracklist' : `▼ +${release.tracks.length - 2} more tracks`}
                    </button>
                  )}
                </div>

                {/* Spotify Embed Player with Cover Art Always Showing on Embed Placeholder */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveEmbedReleaseId(isEmbedOpen ? null : release.id)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-['DM_Mono',monospace] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
                      <span className="font-medium">
                        {isEmbedOpen ? 'Hide Spotify Player' : 'Play on Spotify Embed'}
                      </span>
                    </span>
                    {isEmbedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Rounded Embed Placeholder — Cover Art ALWAYS Shows */}
                  {isEmbedOpen && (
                    <div className="sanelow-embed-placeholder relative mt-2 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs animate-in fade-in duration-300">
                      {/* Cover Art Backdrop */}
                      <div className="absolute inset-0 z-0">
                        <ArtworkImage
                          src={release.coverImageUrl}
                          alt={release.title}
                          className="w-full h-full object-cover brightness-70"
                          fallbackAccent={release.coverAccent}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50 pointer-events-none" />
                      </div>

                      {/* Header strip on placeholder */}
                      <div className="relative z-10 px-3 py-2 flex items-center justify-between text-white border-b border-white/10 bg-black/40 backdrop-blur-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-2 h-2 rounded-full bg-[#1DB954] shrink-0" />
                          <span className="font-['Hammersmith_One',sans-serif] text-xs uppercase tracking-wide truncate">
                            {release.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-['DM_Mono',monospace] text-white/70 shrink-0">
                          {release.catalogNumber}
                        </span>
                      </div>

                      {/* Iframe */}
                      <div className="relative z-10">
                        <iframe
                          src={release.spotifyEmbedUrl}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={`${release.title} on Spotify`}
                          className="w-full rounded-b-2xl"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link & Share */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-['DM_Mono',monospace] text-slate-700 hover:text-[#BE1E2F] transition-colors"
                  >
                    <span>Stream on Spotify</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleShare(release)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Copy Release Link"
                  >
                    {copiedId === release.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
