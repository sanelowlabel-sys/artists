/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SANELOW_EVENTS, LabelEvent } from '../data/sanelowCatalog';
import { Calendar, MapPin, Ticket, Check, Users, Sparkles, X } from 'lucide-react';

export const EventsView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<LabelEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const cities = ['All', 'Johannesburg', 'Cape Town', 'Durban', 'London', 'Berlin'];

  const filteredEvents = SANELOW_EVENTS.filter((ev) => {
    if (selectedCity === 'All') return true;
    return ev.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpSuccess(true);
  };

  const resetRsvp = () => {
    setSelectedEventForRsvp(null);
    setRsvpName('');
    setRsvpEmail('');
    setRsvpSuccess(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
          Live Showcases & Tour Dates
        </span>
        <h2 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
          Club Nights & Gatherings
        </h2>
        <p className="text-sm text-slate-600 font-['Exo',sans-serif]">
          Experience the Sanelow sound live on audiophile club rigs across South Africa and Europe.
        </p>
      </div>

      {/* Filter by City */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-['DM_Mono',monospace] text-slate-500 uppercase mr-1">
            City:
          </span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full text-xs font-['DM_Mono',monospace] uppercase tracking-wider transition-all ${
                selectedCity === city
                  ? 'bg-[#BE1E2F] text-white font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <span className="text-xs font-['DM_Mono',monospace] text-slate-500">
          Showing <strong className="text-slate-900">{filteredEvents.length}</strong> upcoming shows
        </span>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Date block */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] uppercase font-['DM_Mono',monospace] text-[#BE1E2F] font-bold">
                  {event.date.split(' ')[0]}
                </span>
                <span className="font-['Hammersmith_One',sans-serif] text-xl text-slate-900 leading-none mt-0.5">
                  {event.date.split(' ')[1].replace(',', '')}
                </span>
                <span className="text-[9px] font-['DM_Mono',monospace] text-slate-400">
                  {event.date.split(' ')[2]}
                </span>
              </div>

              {/* Event details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-['Hammersmith_One',sans-serif] text-lg sm:text-xl text-slate-900 uppercase">
                    {event.title}
                  </h3>
                  <span
                    className={`text-[10px] font-['DM_Mono',monospace] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      event.status === 'Few Tickets Left'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : event.status === 'Free RSVP'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-['DM_Mono',monospace] flex-wrap">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#BE1E2F]" />
                    {event.venue}, {event.city} ({event.country})
                  </span>
                </div>

                {/* Lineup */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1 flex-wrap font-['Exo',sans-serif]">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">Lineup:</span>
                  <span>{event.lineup.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedEventForRsvp(event)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs font-semibold uppercase tracking-wider font-['DM_Mono',monospace] transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>RSVP / Tickets</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Modal */}
      {selectedEventForRsvp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={resetRsvp}
        >
          <div
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetRsvp}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {!rsvpSuccess ? (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
                    Guestlist & RSVP
                  </span>
                  <h3 className="font-['Hammersmith_One',sans-serif] text-xl text-slate-900 uppercase">
                    {selectedEventForRsvp.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-['DM_Mono',monospace] mt-1">
                    {selectedEventForRsvp.venue} &bull; {selectedEventForRsvp.date}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Sipho Sithole"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="sipho@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-['DM_Mono',monospace]">
                  Confirmation barcode and door check-in details will be issued immediately.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs font-bold uppercase tracking-wider font-['DM_Mono',monospace] transition-colors shadow-sm"
                >
                  Confirm Guestlist RSVP
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-['Hammersmith_One',sans-serif] text-2xl text-slate-900 uppercase">
                  You are on the list!
                </h3>
                <p className="text-xs text-slate-600 font-['Exo',sans-serif] max-w-xs mx-auto">
                  Thank you, <strong>{rsvpName}</strong>. Your confirmation for{' '}
                  <strong>{selectedEventForRsvp.venue}</strong> on{' '}
                  <strong>{selectedEventForRsvp.date}</strong> has been logged.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-['DM_Mono',monospace] text-slate-600">
                  Passcode: <strong className="text-slate-900">SNLW-RSVP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <button
                  type="button"
                  onClick={resetRsvp}
                  className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider font-['DM_Mono',monospace]"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
