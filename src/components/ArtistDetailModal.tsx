/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SanelowArtist, SANELOW_ARTISTS } from '../data/sanelowArtists';
import { ArtworkImage } from './ArtworkImage';
import { X, ExternalLink, Copy, Check, Disc3, MapPin, Music2, Heart } from 'lucide-react';

interface ArtistDetailModalProps {
  artist: SanelowArtist | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectArtist: (artist: SanelowArtist) => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({
  artist,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectArtist,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!artist) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artist.spotifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related artists with matching or similar genre
  const relatedArtists = SANELOW_ARTISTS.filter(
    (a) => a.id !== artist.id && (a.genre.includes(artist.genre.split('/')[0].trim()) || artist.genre.includes(a.genre.split('/')[0].trim()))
  ).slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Cover Header with Real Picture & Vignette */}
        <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden shrink-0 select-none">
          <ArtworkImage
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover brightness-85"
            fallbackTitle={artist.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30 pointer-events-none" />

          {/* Close Button overlay */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors z-20 cursor-pointer shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Artist Header Info */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#BE1E2F] font-bold font-['DM_Mono',monospace] bg-white/95 px-2 py-0.5 rounded-sm inline-block shadow-xs">
                {artist.genre.split('/')[0].trim()}
              </span>
              <h2 className="font-['Hammersmith_One',sans-serif] text-2xl sm:text-3xl text-white uppercase tracking-wide drop-shadow-md">
                {artist.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-white/80 font-['DM_Mono',monospace]">
                <span>{artist.genre}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#BE1E2F]" />
                  {artist.origin}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleFavorite(artist.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer shrink-0 ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Embedded Spotify player with Cover Art Always Showing on Embed Placeholder */}
          <div>
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-['DM_Mono',monospace]">
              Spotify Embed Player
            </h4>

            {/* Rounded Embed Placeholder with Cover Art */}
            <div className="sanelow-embed-placeholder relative h-[152px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              {/* Cover Art Backdrop */}
              <div className="absolute inset-0 z-0">
                <ArtworkImage
                  src={artist.coverArtUrl || artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover brightness-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50 pointer-events-none" />
              </div>

              <iframe
                src={`https://open.spotify.com/embed/artist/${artist.spotifyArtistId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${artist.name} Spotify Player`}
                className="w-full h-[152px] rounded-2xl relative z-10"
              />
            </div>
          </div>

          {/* Biography / Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-['DM_Mono',monospace]">
              Artist Biography
            </h4>
            <p className="text-sm text-slate-600 font-['Exo',sans-serif] leading-relaxed">
              {artist.description}
            </p>
          </div>

          {/* Discography & Key Releases */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-['DM_Mono',monospace]">
              Essential Releases & Singles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {artist.keyReleases.map((release, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-['Exo',sans-serif] text-slate-800"
                >
                  <Music2 className="w-4 h-4 text-[#BE1E2F] shrink-0" />
                  <span className="font-medium truncate">{release}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Label Artists */}
          {relatedArtists.length > 0 && (
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-['DM_Mono',monospace]">
                Similar Sanelow Artists
              </h4>
              <div className="flex flex-wrap gap-2">
                {relatedArtists.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectArtist(rel)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-['DM_Mono',monospace] text-slate-700 transition-colors cursor-pointer"
                  >
                    <Disc3 className="w-3 h-3 text-[#BE1E2F]" />
                    <span>{rel.name}</span>
                    <span className="text-[10px] text-slate-400">({rel.genre.split('/')[0].trim()})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Links */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-xs font-['DM_Mono',monospace] text-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Spotify Link'}</span>
          </button>

          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-black text-xs font-semibold uppercase tracking-wider font-['Exo',sans-serif] transition-colors shadow-xs cursor-pointer"
          >
            <Disc3 className="w-4 h-4" />
            <span>Open in Spotify App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
