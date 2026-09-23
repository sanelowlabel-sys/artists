/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Heart, Disc3, Menu, X, Music, Radio, Calendar, Send, Info } from 'lucide-react';

export type NavTab = 'artists' | 'releases' | 'radio' | 'events' | 'demodrop' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  isNavigating?: boolean;
  isPlaying?: boolean;
  playingTrackTitle?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  isNavigating = false,
  isPlaying = false,
  playingTrackTitle = null,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'artists', label: 'Artists', icon: <Disc3 className="w-3.5 h-3.5" /> },
    { id: 'releases', label: 'Releases', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'radio', label: 'Radio & Sets', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Live Events', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'demodrop', label: 'Demo Drop', icon: <Send className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About Label', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all relative">
      {/* Minimal Top Navigation Loading Animation Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none z-50">
        {isNavigating && (
          <div className="h-full bg-gradient-to-r from-[#BE1E2F] via-rose-400 to-[#BE1E2F] shadow-[0_0_10px_#BE1E2F] animate-nav-sweep" />
        )}
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          type="button"
          onClick={() => handleTabClick('artists')}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs group-hover:border-[#BE1E2F]/50 transition-colors">
            <img
              src="/sanelow-logo.png"
              alt="Sanelow Music Group"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <span className="font-['Hammersmith_One',sans-serif] text-lg sm:text-xl font-normal text-slate-900 uppercase tracking-wide leading-none group-hover:text-[#BE1E2F] transition-colors block">
              Sanelow Music Group
            </span>
            <p className="text-[11px] font-['DM_Mono',monospace] text-slate-500 tracking-wide mt-0.5">
              Independent Electronic Record Label
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links with Minimal Active Indicators */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/80">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className={isActive ? 'text-[#BE1E2F]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F] ml-0.5 shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Audio Waveform Minimal Indicator */}
        {isPlaying && (
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-['DM_Mono',monospace] text-slate-700 animate-in fade-in duration-300">
            <span className="flex items-end gap-0.5 h-3.5">
              <span className="w-1 bg-[#BE1E2F] rounded-full animate-eq-1" />
              <span className="w-1 bg-[#BE1E2F] rounded-full animate-eq-2" />
              <span className="w-1 bg-[#BE1E2F] rounded-full animate-eq-3" />
              <span className="w-1 bg-[#BE1E2F] rounded-full animate-eq-4" />
            </span>
            <span className="text-[11px] truncate max-w-[130px] font-medium text-slate-900">
              {playingTrackTitle || 'Playing Audio'}
            </span>
          </div>
        )}

        {/* Center Search Input on desktop */}
        <div className="hidden md:block w-44 xl:w-56">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs pl-8 pr-7 py-2 rounded-full focus:outline-none focus:border-[#BE1E2F] focus:bg-white transition-all font-['Exo',sans-serif]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Saved Shortlist button */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-['DM_Mono',monospace] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="View saved artists"
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-[#BE1E2F] text-[#BE1E2F]' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Shortlist</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#BE1E2F] text-white text-[10px] flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Spotify Direct Portal */}
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs font-semibold uppercase tracking-wider font-['Exo',sans-serif] transition-all shadow-xs cursor-pointer"
          >
            <Disc3 className="w-3.5 h-3.5" />
            <span>Open Spotify</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search artists, tracks, releases..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm pl-10 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-[#BE1E2F]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Nav Links */}
          <nav className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-medium shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className={isActive ? 'text-[#BE1E2F]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Direct Spotify */}
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-[#BE1E2F] text-white text-xs font-semibold uppercase tracking-wider font-['Exo',sans-serif] flex items-center justify-center gap-2"
          >
            <Disc3 className="w-4 h-4" />
            <span>Open Sanelow on Spotify</span>
          </a>
        </div>
      )}
    </header>
  );
};
