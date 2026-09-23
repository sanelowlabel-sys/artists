/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Disc3, Radio, Globe, Layers, Award, Sparkles, Music } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
          Origins & Manifesto
        </span>
        <h2 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight leading-tight">
          The Sanelow Philosophy
        </h2>
        <p className="text-base text-slate-600 font-['Exo',sans-serif] leading-relaxed">
          Sanelow Music Group is an independent record label and artist incubator dedicated to the sonic depth of South African deep house, dub techno, and organic afro electronics.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#BE1E2F] shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-['Hammersmith_One',sans-serif] text-lg text-slate-900 uppercase">
            Sonic Depth & Rhythm
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-['Exo',sans-serif]">
            We cherish hypnotic chord progressions, tape-saturated subs, and intricate African polyrhythms. Every release is curated to provide an authentic, meditative headphone journey and an immersive club experience.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#BE1E2F] shadow-xs">
            <Disc3 className="w-5 h-5" />
          </div>
          <h3 className="font-['Hammersmith_One',sans-serif] text-lg text-slate-900 uppercase">
            Vinyl & Pure Signal
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-['Exo',sans-serif]">
            Our physical catalog features heavyweight 12&quot; vinyl pressed in limited runs for purist selectors. We respect dynamic range over brickwall loudness, celebrating natural harmonics and analog warmth.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#BE1E2F] shadow-xs">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-['Hammersmith_One',sans-serif] text-lg text-slate-900 uppercase">
            Global African Diaspora
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-['Exo',sans-serif]">
            Connecting visionary talent from Johannesburg, Soweto, Pretoria, Durban, Cape Town, and Bloemfontein directly to worldwide sound systems in Berlin, London, Tokyo, and Amsterdam.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
            Our Story
          </span>
          <h3 className="font-['Hammersmith_One',sans-serif] text-2xl sm:text-4xl text-white uppercase tracking-wide">
            From Underground Tape Loops to Global Dance Floors
          </h3>
          <p className="text-sm text-slate-300 font-['Exo',sans-serif] leading-relaxed">
            Founded with a singular dedication to pure underground sound architecture, Sanelow Music Group started as an independent collective sharing unmastered dubplates and live jams recorded in backroom studios.
          </p>
          <p className="text-sm text-slate-300 font-['Exo',sans-serif] leading-relaxed">
            Today, our family spans 23 dedicated producers, each carving distinct sonic identities in deep tech, dub techno, ancestral afro rhythms, and soulful chord studies. Rather than pursuing fleeting commercial trends, we build timeless discographies that endure.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs font-['DM_Mono',monospace] text-white/80 flex-wrap">
            <div>
              <strong className="text-xl font-['Hammersmith_One',sans-serif] text-white block">23</strong>
              <span>Roster Artists</span>
            </div>
            <span className="text-white/20">|</span>
            <div>
              <strong className="text-xl font-['Hammersmith_One',sans-serif] text-white block">24+</strong>
              <span>Catalog Releases</span>
            </div>
            <span className="text-white/20">|</span>
            <div>
              <strong className="text-xl font-['Hammersmith_One',sans-serif] text-white block">48</strong>
              <span>Radio Broadcasts</span>
            </div>
            <span className="text-white/20">|</span>
            <div>
              <strong className="text-xl font-['Hammersmith_One',sans-serif] text-white block">100%</strong>
              <span>Independent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operations & Inquiries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-slate-200 rounded-3xl bg-white space-y-3">
          <h4 className="font-['Hammersmith_One',sans-serif] text-base text-slate-900 uppercase">
            Label Head & A&R Operations
          </h4>
          <p className="text-xs text-slate-600 font-['Exo',sans-serif] leading-relaxed">
            For licensing, synchronization, compilations, or press coverage inquiries, contact our management team directly at:
          </p>
          <div className="font-['DM_Mono',monospace] text-xs text-[#BE1E2F] space-y-1">
            <div>sanelowlabel@gmail.com</div>
            <div className="text-slate-500 text-[11px]">contact@sanelowmusiclabel.co.za</div>
          </div>
        </div>

        <div className="p-6 border border-slate-200 rounded-3xl bg-white space-y-3">
          <h4 className="font-['Hammersmith_One',sans-serif] text-base text-slate-900 uppercase">
            Booking & Live Showcases
          </h4>
          <p className="text-xs text-slate-600 font-['Exo',sans-serif] leading-relaxed">
            For booking Sanelow roster artists or hosting official label showcase takeovers at your festival or venue:
          </p>
          <div className="font-['DM_Mono',monospace] text-xs text-[#BE1E2F]">
            bookings@sanelowmusiclabel.co.za
          </div>
        </div>
      </div>
    </div>
  );
};
