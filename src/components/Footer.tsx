/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Music2, ExternalLink, Radio, Disc3, Calendar, Send, Info } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-12 pb-14 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
                <img
                  src="/sanelow-logo.png"
                  alt="Sanelow Logo Emblem"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h3 className="font-['Hammersmith_One',sans-serif] text-base sm:text-lg text-slate-900 uppercase tracking-wide">
                  Sanelow Music Group
                </h3>
                <p className="text-[11px] font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
                  Electronic Music Label
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-['Exo',sans-serif] max-w-sm leading-relaxed">
              Pioneering Deep House, Dub Techno, Afro Deep, and Organic electronics from visionary producers in South Africa to the worldwide dance floor.
            </p>
            <div className="flex items-center gap-2 text-xs font-['DM_Mono',monospace] text-slate-500 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                Spotify Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#BE1E2F]" />
                23 Producers
              </span>
            </div>
          </div>

          {/* Col 2: Website Navigation */}
          <div className="space-y-3">
            <h4 className="font-['Hammersmith_One',sans-serif] text-xs uppercase tracking-widest text-slate-900">
              Website Navigation
            </h4>
            <ul className="text-xs font-['DM_Mono',monospace] text-slate-600 space-y-2 uppercase tracking-wide">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('artists')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Disc3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Artists Roster (23)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('releases')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Music2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Catalog & Releases</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('radio')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Radio className="w-3.5 h-3.5 text-slate-400" />
                  <span>Radio & Mix Sets</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('events')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Live Events & RSVP</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('demodrop')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-slate-400" />
                  <span>Demo Drop Portal</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('about')}
                  className="hover:text-[#BE1E2F] transition-colors flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>About & Manifesto</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Label Sounds */}
          <div className="space-y-3">
            <h4 className="font-['Hammersmith_One',sans-serif] text-xs uppercase tracking-widest text-slate-900">
              Roster Sounds
            </h4>
            <ul className="text-xs font-['Exo',sans-serif] text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F]" />
                <span>Deep House & Dub Techno</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F]" />
                <span>Afro House & Melodic Tribal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F]" />
                <span>Organic & Soulful House</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F]" />
                <span>Minimal & Deep Tech</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE1E2F]" />
                <span>Subterranean Ambient</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Streaming Portals */}
          <div className="space-y-3">
            <h4 className="font-['Hammersmith_One',sans-serif] text-xs uppercase tracking-widest text-slate-900">
              External Portals
            </h4>
            <ul className="text-xs font-['Exo',sans-serif] text-slate-600 space-y-2">
              <li>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <Disc3 className="w-4 h-4 text-[#1DB954]" />
                  <span>Spotify Artist Portal</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://volt.fm/label/sanelow-label"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <Radio className="w-4 h-4 text-[#BE1E2F]" />
                  <span>Volt.fm Label Profile</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://sanelowmusiclabel.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <Music2 className="w-4 h-4 text-slate-500" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['DM_Mono',monospace] text-slate-500">
          <p>
            © {new Date().getFullYear()} Sanelow Music Group. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400">
            Independent Record Label &bull; Johannesburg, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
};
