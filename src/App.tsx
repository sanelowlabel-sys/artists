/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { SANELOW_ARTISTS, SanelowArtist } from './data/sanelowArtists';
import { SANELOW_RELEASES } from './data/sanelowCatalog';
import { Navbar, NavTab } from './components/Navbar';
import { SanelowArtistCard } from './components/SanelowArtistCard';
import { ReleasesView } from './components/ReleasesView';
import { RadioView } from './components/RadioView';
import { EventsView } from './components/EventsView';
import { DemoDropView } from './components/DemoDropView';
import { AboutView } from './components/AboutView';
import { PersistentAudioPlayer } from './components/PersistentAudioPlayer';
import { ArtistDetailModal } from './components/ArtistDetailModal';
import { Footer } from './components/Footer';
import {
  Grid3X3,
  Grid2X2,
  LayoutList,
  Search,
  Filter,
  RotateCcw,
  Heart,
  ArrowUpDown,
  ExternalLink,
  Disc3,
  Music,
  Radio,
  Calendar,
  Send,
  Info
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('artists');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc' | 'genre'>('default');
  const [columns, setColumns] = useState<3 | 2 | 1>(3);
  const [playerMode, setPlayerMode] = useState<'standard' | 'compact'>('standard');
  const [selectedArtistForModal, setSelectedArtistForModal] = useState<SanelowArtist | null>(null);

  // Persistent audio preview state
  const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);
  const [playingArtistName, setPlayingArtistName] = useState<string | null>(null);
  const [playingReleaseTitle, setPlayingReleaseTitle] = useState<string | null>(null);
  const [playingCoverImageUrl, setPlayingCoverImageUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sanelow_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sanelow_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore localStorage errors
    }
  }, [favorites]);

  const toggleFavorite = (artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId) ? prev.filter((id) => id !== artistId) : [...prev, artistId]
    );
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === currentTab) return;
    setIsNavigating(true);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsNavigating(false);
    }, 450);
  };

  const handlePlayTrack = (track: string, artist: string, release?: string) => {
    if (playingTrackTitle === track && isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingTrackTitle(track);
      setPlayingArtistName(artist);
      setPlayingReleaseTitle(release || null);

      // Find matching cover image from artists or releases
      const matchedArtist = SANELOW_ARTISTS.find(
        (a) => a.name.toLowerCase() === artist.toLowerCase() || artist.toLowerCase().includes(a.name.toLowerCase())
      );
      const matchedRelease = SANELOW_RELEASES.find(
        (r) => (release && r.title.toLowerCase().includes(release.toLowerCase())) || r.tracks.some((t) => t.title === track)
      );

      const coverImg = matchedRelease?.coverImageUrl || matchedArtist?.coverArtUrl || matchedArtist?.imageUrl || null;
      setPlayingCoverImageUrl(coverImg);
      setIsPlaying(true);
    }
  };

  // Genre filter pills for artists page
  const genreList = useMemo(() => {
    return ['All', 'Deep House', 'Afro House', 'Dub Techno', 'Organic House', 'Soulful'];
  }, []);

  // Filtered & sorted artists
  const filteredArtists = useMemo(() => {
    let result = SANELOW_ARTISTS.filter((artist) => {
      // Shortlist filter
      if (selectedGenre === 'favorites') {
        if (!favorites.includes(artist.id)) return false;
      } else if (selectedGenre !== 'All') {
        if (!artist.genre.toLowerCase().includes(selectedGenre.toLowerCase())) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesGenre = artist.genre.toLowerCase().includes(q);
        const matchesOrigin = artist.origin.toLowerCase().includes(q);
        const matchesReleases = artist.keyReleases.some((r) => r.toLowerCase().includes(q));
        if (!matchesName && !matchesGenre && !matchesOrigin && !matchesReleases) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'genre') {
      result = [...result].sort((a, b) => a.genre.localeCompare(b.genre));
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSortBy('default');
  };

  const handleNavigateToArtistFromRelease = (artistId: string) => {
    handleSelectTab('artists');
    const artist = SANELOW_ARTISTS.find((a) => a.id === artistId);
    if (artist) {
      setSelectedArtistForModal(artist);
    }
  };

  return (
    <div className="min-h-screen bg-light-canvas text-slate-900 flex flex-col font-['Exo',sans-serif]">
      {/* Label Navigation Header with Minimal Loading Animation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenFavorites={() => {
          handleSelectTab('artists');
          setSelectedGenre('favorites');
        }}
        isNavigating={isNavigating}
        isPlaying={isPlaying}
        playingTrackTitle={playingTrackTitle}
      />

      {/* Main Dynamic View Content */}
      <main
        key={currentTab}
        className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 animate-in fade-in-50 duration-300"
      >
        {/* VIEW 1: LABEL ARTISTS DISCOGRAPHY */}
        {currentTab === 'artists' && (
          <div className="space-y-8">
            {/* Header Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
                Sanelow Music Group Roster
              </span>
              <h1 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-4xl md:text-5xl text-slate-900 uppercase tracking-tight">
                Label Artists & Producers
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-['Exo',sans-serif] leading-relaxed">
                Stream curated discographies from Johannesburg, Durban, Pretoria, and beyond.
                Underground deep house, dub techno, and soulful Afro electronic music.
              </p>
            </div>

            {/* Catalog Discovery Controls */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Genre Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                  {genreList.map((g) => {
                    const isActive = selectedGenre === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedGenre(g)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white font-medium shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}

                  {/* Favorites shortcut pill */}
                  {favorites.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedGenre('favorites')}
                      className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                        selectedGenre === 'favorites'
                          ? 'bg-[#BE1E2F] text-white font-medium shadow-xs'
                          : 'bg-white text-slate-600 hover:text-[#BE1E2F] border border-slate-200'
                      }`}
                    >
                      <Heart className="w-3 h-3 fill-current" />
                      <span>Saved ({favorites.length})</span>
                    </button>
                  )}
                </div>

                {/* Right controls: Sorting, View size, Columns */}
                <div className="flex items-center gap-3 self-end lg:self-auto flex-wrap">
                  {/* Sorting dropdown */}
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-['DM_Mono',monospace]">
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-slate-700 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="default">Default Order</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="genre">By Genre</option>
                    </select>
                  </div>

                  {/* Player size mode switcher */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5">
                    <button
                      type="button"
                      onClick={() => setPlayerMode('standard')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-['DM_Mono',monospace] transition-colors cursor-pointer ${
                        playerMode === 'standard'
                          ? 'bg-slate-900 text-white font-medium'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Full Spotify Player (352px)"
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlayerMode('compact')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-['DM_Mono',monospace] transition-colors cursor-pointer ${
                        playerMode === 'compact'
                          ? 'bg-slate-900 text-white font-medium'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Compact Spotify Player (152px)"
                    >
                      Compact
                    </button>
                  </div>

                  {/* Columns switch */}
                  <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-full p-0.5">
                    <button
                      type="button"
                      onClick={() => setColumns(3)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        columns === 3 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="3 Columns"
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setColumns(2)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        columns === 2 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="2 Columns"
                    >
                      <Grid2X2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setColumns(1)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        columns === 1 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Single Column"
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Status Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs font-['DM_Mono',monospace] text-slate-500">
                <span>
                  Showing <strong className="text-slate-900">{filteredArtists.length}</strong> of{' '}
                  {SANELOW_ARTISTS.length} label artists
                  {selectedGenre !== 'All' && selectedGenre !== 'favorites' && ` in ${selectedGenre}`}
                  {selectedGenre === 'favorites' && ' in your shortlist'}
                </span>

                {(searchQuery || selectedGenre !== 'All' || sortBy !== 'default') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-[#BE1E2F] hover:text-[#a11624] font-medium transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Artists Grid */}
            {filteredArtists.length === 0 ? (
              <div className="max-w-md mx-auto py-16 px-6 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400 shadow-xs">
                  <Search className="w-5 h-5 text-[#BE1E2F]" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">No artists found</h3>
                <p className="text-xs text-slate-500 font-['DM_Mono',monospace]">
                  {selectedGenre === 'favorites'
                    ? "You haven't added any artists to your shortlist yet. Click the heart icon on any card to save it."
                    : `No artists matched your current search or filter.`}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs uppercase font-semibold tracking-wider font-['DM_Mono',monospace] rounded-full transition-colors shadow-xs cursor-pointer"
                >
                  Show All 23 Artists
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-5 sm:gap-6 ${
                  columns === 3
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : columns === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 max-w-2xl mx-auto'
                }`}
                role="list"
              >
                {filteredArtists.map((artist, idx) => (
                  <SanelowArtistCard
                    key={artist.id}
                    artist={artist}
                    index={idx}
                    playerMode={playerMode}
                    isFavorite={favorites.includes(artist.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={setSelectedArtistForModal}
                    onPlayTrack={(track, artistName) => handlePlayTrack(track, artistName, `${artist.name} Preview`)}
                    currentPlayingTrack={playingTrackTitle}
                    isPlaying={isPlaying}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: RELEASES & CATALOG */}
        {currentTab === 'releases' && (
          <ReleasesView
            onPlayTrack={handlePlayTrack}
            currentPlayingTrack={playingTrackTitle}
            isPlaying={isPlaying}
            onNavigateToArtist={handleNavigateToArtistFromRelease}
          />
        )}

        {/* VIEW 3: RADIO & SESSIONS */}
        {currentTab === 'radio' && (
          <RadioView
            onPlayEpisode={(title, host) => handlePlayTrack(title, host, 'Sanelow Radio Broadcast')}
            currentPlayingTrack={playingTrackTitle}
            isPlaying={isPlaying}
          />
        )}

        {/* VIEW 4: LIVE EVENTS */}
        {currentTab === 'events' && <EventsView />}

        {/* VIEW 5: DEMO DROP PORTAL */}
        {currentTab === 'demodrop' && <DemoDropView />}

        {/* VIEW 6: ABOUT LABEL & MANIFESTO */}
        {currentTab === 'about' && <AboutView />}
      </main>

      {/* Persistent Audio Bottom Player */}
      <PersistentAudioPlayer
        trackTitle={playingTrackTitle}
        artistName={playingArtistName}
        releaseTitle={playingReleaseTitle}
        coverImageUrl={playingCoverImageUrl}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onClose={() => {
          setIsPlaying(false);
          setPlayingTrackTitle(null);
          setPlayingCoverImageUrl(null);
        }}
      />

      {/* Artist Details Drawer Modal */}
      <ArtistDetailModal
        artist={selectedArtistForModal}
        onClose={() => setSelectedArtistForModal(null)}
        isFavorite={selectedArtistForModal ? favorites.includes(selectedArtistForModal.id) : false}
        onToggleFavorite={toggleFavorite}
        onSelectArtist={(artist) => setSelectedArtistForModal(artist)}
      />

      {/* Footer with website navigation tabs */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
