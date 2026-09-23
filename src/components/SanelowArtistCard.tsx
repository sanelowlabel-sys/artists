/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SanelowArtist } from '../data/sanelowArtists';
import { ArtworkImage } from './ArtworkImage';
import {
  ExternalLink,
  Share2,
  Check,
  Disc3,
  Heart,
  Play,
  Pause,
  MapPin,
  ChevronDown,
  ChevronUp,
  Radio
} from 'lucide-react';

interface SanelowArtistCardProps {
  artist: SanelowArtist;
  index: number;
  playerMode: 'standard' | 'compact';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (artist: SanelowArtist) => void;
  onPlayTrack?: (trackName: string, artistName: string) => void;
  currentPlayingTrack?: string | null;
  isPlaying?: boolean;
}

const ARTIST_ACCENTS: Record<string, string> = {
  themetique: '#BE1E2F',
  spaceman: '#1E293B',
  sanque: '#9A3412',
  'blac-tears': '#0F172A',
  'soil-zintoh-sa': '#475569',
  'sir-kabiano': '#D97706',
  belmiredub: '#334155',
  'the-irish-sa': '#7C2D12',
  'gigantic-deep-za': '#1E1B4B',
  'sound-minds-muzik': '#065F46',
  'soilyque-land': '#854D0E',
  'dj-asi': '#4C1D95',
  'da-conist': '#155E75',
  'matt-solo': '#831843',
  'bogy-be': '#78350F',
  'deeper-thoughts': '#1E293B',
  abo: '#374151',
  lance: '#0F766E',
  'toffo-za': '#B45309',
  brightkay: '#0284C7',
  'kmj-soulz': '#7E22CE',
  'lord-kyno': '#111827',
  'yaros-keys': '#C2410C',
};

export const SanelowArtistCard: React.FC<SanelowArtistCardProps> = ({
  artist,
  index,
  playerMode,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onPlayTrack,
  currentPlayingTrack,
  isPlaying = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(artist.spotifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = ARTIST_ACCENTS[artist.id] || '#BE1E2F';
  const catalogCode = `SNLW-ART-${index < 9 ? `0${index + 1}` : index + 1}`;
  const firstTrack = artist.keyReleases[0] || `${artist.name} - Deep Session`;
  const isThisArtistPlaying = currentPlayingTrack === firstTrack && isPlaying;
  const iframeHeight = playerMode === 'compact' ? 152 : 352;

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
      role="listitem"
      tabIndex={0}
      aria-label={`${artist.name} Profile`}
    >
      {/* Cover Art Box with Real Photo, Vinyl Accent & Release Page Style */}
      <div
        className="relative aspect-square p-6 flex flex-col justify-between cursor-pointer overflow-hidden transition-transform duration-300 select-none bg-slate-900"
        onClick={() => onOpenDetails(artist)}
      >
        {/* Real Artist Picture with fallback */}
        <div className="absolute inset-0 z-0">
          <ArtworkImage
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            fallbackAccent={accentColor}
            fallbackTitle={artist.name}
          />
          {/* Subtle Dark Gradient Vignette for high contrast legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/30 pointer-events-none" />
        </div>

        {/* Vinyl Record Visual Accent overlay */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-white/15 opacity-40 flex items-center justify-center pointer-events-none group-hover:scale-110 group-hover:rotate-45 transition-all duration-700 z-1">
          <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center">
              <Disc3 className={`w-6 h-6 text-white/40 ${isThisArtistPlaying ? 'animate-spin' : ''}`} />
            </div>
          </div>
        </div>

        {/* Top Badges: Catalog Code & Origin */}
        <div className="flex items-center justify-between text-[11px] font-['DM_Mono',monospace] text-white/90 z-10">
          <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 font-bold tracking-wider shadow-xs">
            {catalogCode}
          </span>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 text-white/90 text-[10px] shadow-xs">
            <MapPin className="w-3 h-3 text-[#BE1E2F]" />
            <span>{artist.origin.split(',')[0]}</span>
          </div>
        </div>

        {/* Center / Bottom Title and Sound */}
        <div className="z-10 mt-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#BE1E2F] font-bold font-['DM_Mono',monospace] bg-white/95 px-2 py-0.5 rounded-sm inline-block mb-1.5 shadow-sm">
            {artist.genre.split('/')[0].trim()}
          </span>
          <h3 className="font-['Hammersmith_One',sans-serif] text-2xl text-white uppercase tracking-wide leading-tight group-hover:text-red-200 transition-colors drop-shadow-md">
            {artist.name}
          </h3>
          <p className="text-xs font-['Exo',sans-serif] text-white/80 mt-1 line-clamp-1 drop-shadow-xs">
            {artist.genre}
          </p>
        </div>

        {/* Quick Play Action Overlay Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onPlayTrack) {
              onPlayTrack(firstTrack, artist.name);
            }
          }}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white flex items-center justify-center shadow-lg transition-transform transform active:scale-95 z-20 group-hover:scale-105"
          title={`Play preview of ${artist.name}`}
        >
          {isThisArtistPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>
      </div>

      {/* Artist Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-['DM_Mono',monospace]">
            <span>{artist.origin}</span>
            <span className="text-slate-700 font-semibold">{artist.keyReleases.length} Key Cuts</span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 font-['Exo',sans-serif] leading-relaxed">
            {artist.description}
          </p>
        </div>

        {/* Key Releases List with Play triggers */}
        <div className="border-t border-slate-100 pt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-['DM_Mono',monospace] text-slate-400 uppercase tracking-wider">
            <span>Essential Discography</span>
            <button
              type="button"
              onClick={() => onOpenDetails(artist)}
              className="text-[#BE1E2F] hover:underline cursor-pointer"
            >
              Full Profile &rarr;
            </button>
          </div>

          <div className="space-y-1">
            {artist.keyReleases.slice(0, 3).map((rel, idx) => {
              const isPlayingThisCut = currentPlayingTrack === rel && isPlaying;
              return (
                <div
                  key={idx}
                  onClick={() => onPlayTrack && onPlayTrack(rel, artist.name)}
                  className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isPlayingThisCut
                      ? 'bg-red-50 text-[#BE1E2F] font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400">
                      {isPlayingThisCut ? (
                        <Pause className="w-3 h-3 fill-current text-[#BE1E2F]" />
                      ) : (
                        <Play className="w-3 h-3 fill-current text-slate-400" />
                      )}
                    </span>
                    <span className="truncate">{rel}</span>
                  </div>
                  <span className="text-[10px] font-['DM_Mono',monospace] text-slate-400 shrink-0 ml-2">
                    Spotify
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Embedded Spotify Player Area — Always Showing Picture and Cover Art on Embed Placeholder */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setShowEmbedPlayer(!showEmbedPlayer)}
              className="inline-flex items-center gap-1.5 text-xs font-['DM_Mono',monospace] text-slate-700 hover:text-[#BE1E2F] cursor-pointer transition-colors"
            >
              <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
              <span className="font-medium">
                {showEmbedPlayer ? 'Spotify Embed Player' : 'Open Spotify Embed Player'}
              </span>
              {showEmbedPlayer ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
            </button>

            <span className="text-[10px] font-['DM_Mono',monospace] text-slate-400 uppercase tracking-wider">
              {playerMode}
            </span>
          </div>

          {/* Rounded Embed Placeholder Container — Picture and Cover Art ALWAYS Show */}
          {showEmbedPlayer && (
            <div
              className="sanelow-embed-placeholder relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xs animate-in fade-in duration-300"
              style={{ minHeight: `${iframeHeight}px` }}
            >
              {/* Cover Art and Picture Backdrop — ALWAYS visible on embed placeholder */}
              <div className="absolute inset-0 z-0">
                <ArtworkImage
                  src={artist.coverArtUrl || artist.imageUrl}
                  alt={`${artist.name} Cover Art`}
                  className="w-full h-full object-cover brightness-75 scale-102"
                  fallbackAccent={accentColor}
                  fallbackTitle={artist.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50 pointer-events-none" />
              </div>

              {/* Cover Art Header Strip on Embed Placeholder */}
              <div className="relative z-10 p-3 flex items-center justify-between text-white border-b border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20 shadow-xs relative">
                    <ArtworkImage
                      src={artist.coverArtUrl || artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      fallbackAccent={accentColor}
                    />
                  </div>
                  <div className="truncate">
                    <span className="font-['Hammersmith_One',sans-serif] text-xs uppercase tracking-wide text-white block truncate leading-tight">
                      {artist.name}
                    </span>
                    <span className="text-[10px] font-['DM_Mono',monospace] text-[#1DB954] flex items-center gap-1 leading-none mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping" />
                      Spotify Embed
                    </span>
                  </div>
                </div>

                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-black text-[10px] font-['DM_Mono',monospace] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors shrink-0 shadow-xs"
                >
                  <span>Open App</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Embed Iframe Container */}
              <div className="relative z-10 w-full" style={{ height: `${iframeHeight}px` }}>
                {/* Minimal Loading Animation on Embed Placeholder with Cover Art visible */}
                {!isIframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-5">
                    {/* Equalizer Wave Shimmer over the visible cover art */}
                    <div className="flex items-end gap-1 h-5 mb-2">
                      <div className="w-1 bg-[#1DB954] rounded-full animate-eq-1" />
                      <div className="w-1 bg-[#1DB954] rounded-full animate-eq-2" />
                      <div className="w-1 bg-[#1DB954] rounded-full animate-eq-3" />
                      <div className="w-1 bg-[#1DB954] rounded-full animate-eq-4" />
                    </div>
                    <span className="text-[11px] font-['DM_Mono',monospace] text-white/90 drop-shadow-md">
                      Connecting Spotify Embed for {artist.name}...
                    </span>
                  </div>
                )}

                <iframe
                  src={artist.embedUrl}
                  width="100%"
                  height={iframeHeight}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${artist.name} Spotify Player`}
                  onLoad={() => setIsIframeLoaded(true)}
                  className={`w-full rounded-b-2xl transition-opacity duration-300 ${
                    isIframeLoaded ? 'opacity-100' : 'opacity-85'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: Shortlist, Share & Spotify Direct */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(artist.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-['DM_Mono',monospace] transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-red-50 text-[#BE1E2F] border border-red-200 font-medium'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200'
              }`}
              title={isFavorite ? 'Remove from shortlist' : 'Add to shortlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#BE1E2F] text-[#BE1E2F]' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Shortlist'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Copy Spotify Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-['DM_Mono',monospace] text-slate-700 hover:text-[#BE1E2F] transition-colors"
          >
            <span>Spotify Artist</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
