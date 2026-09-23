/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, Check, Mail, ShieldCheck, HelpCircle, ExternalLink } from 'lucide-react';

export const DemoDropView: React.FC = () => {
  const [formData, setFormData] = useState({
    artistName: '',
    email: '',
    country: '',
    demoLink: '',
    genre: 'Deep House',
    trackCount: '1-2 tracks',
    hardwareUsed: '',
    bio: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPackage, setCopiedPackage] = useState(false);

  const TARGET_EMAIL = 'sanelowlabel@gmail.com';

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `[DEMO SUBMISSION] ${formData.artistName || 'Artist'} — ${formData.genre}`
    );
    const bodyText = encodeURIComponent(
      `Hello Sanelow A&R Team,\n\n` +
      `Here is my demo submission for Sanelow Music Group consideration:\n\n` +
      `• Artist / Producer: ${formData.artistName}\n` +
      `• Contact Email: ${formData.email}\n` +
      `• Location: ${formData.country}\n` +
      `• Genre / Sound: ${formData.genre}\n` +
      `• Private Streaming Link: ${formData.demoLink}\n` +
      `• Hardware / Gear: ${formData.hardwareUsed || 'Not specified'}\n` +
      `• Bio & Vision: ${formData.bio || 'Not specified'}\n\n` +
      `Tracking Code: ${submittedId || 'PENDING'}\n\n` +
      `Best regards,\n${formData.artistName}`
    );
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${bodyText}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = 'DEMO-SNLW-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedId(randomCode);

      // Trigger user's mail client directly with pre-filled details to sanelowlabel@gmail.com
      const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
        `[DEMO SUBMISSION ${randomCode}] ${formData.artistName} — ${formData.genre}`
      )}&body=${encodeURIComponent(
        `Artist / Producer: ${formData.artistName}\n` +
        `Contact: ${formData.email}\n` +
        `City/Country: ${formData.country}\n` +
        `Genre: ${formData.genre}\n` +
        `Streaming Link: ${formData.demoLink}\n` +
        `Hardware/Synths: ${formData.hardwareUsed}\n\n` +
        `Bio: ${formData.bio}\n\n` +
        `Reference ID: ${randomCode}`
      )}`;
      window.location.href = mailtoLink;
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopySubmissionPackage = () => {
    const text =
      `A&R Demo Submission for Sanelow Music Group (${TARGET_EMAIL})\n\n` +
      `Artist Name: ${formData.artistName}\n` +
      `Contact Email: ${formData.email}\n` +
      `Location: ${formData.country}\n` +
      `Genre: ${formData.genre}\n` +
      `Private Demo Link: ${formData.demoLink}\n` +
      `Gear Used: ${formData.hardwareUsed}\n` +
      `Bio: ${formData.bio}\n` +
      `Submission ID: ${submittedId}`;
    navigator.clipboard.writeText(text);
    setCopiedPackage(true);
    setTimeout(() => setCopiedPackage(false), 2000);
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      artistName: '',
      email: '',
      country: '',
      demoLink: '',
      genre: 'Deep House',
      trackCount: '1-2 tracks',
      hardwareUsed: '',
      bio: '',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-['DM_Mono',monospace] text-[#BE1E2F] uppercase tracking-wider font-semibold">
          Official A&R Demo Drop Portal
        </span>
        <h2 className="font-['Hammersmith_One',sans-serif] text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
          Demo Drop
        </h2>
        <p className="text-sm text-slate-600 font-['Exo',sans-serif]">
          Direct line to the Sanelow Label A&R desk at{' '}
          <strong className="text-slate-900 font-['DM_Mono',monospace]">{TARGET_EMAIL}</strong>.
          We review unreleased deep house, dub techno, and afro deep demos weekly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Area */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          {!submittedId ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Hammersmith_One',sans-serif] text-xl text-slate-900 uppercase">
                    Submit Unreleased Music
                  </h3>
                  <p className="text-xs text-slate-500 font-['DM_Mono',monospace]">
                    Routed directly to <span className="text-[#BE1E2F] font-semibold">{TARGET_EMAIL}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-['DM_Mono',monospace] text-slate-600 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3 h-3 text-[#BE1E2F]" />
                  <span>{copiedEmail ? 'Copied' : TARGET_EMAIL}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                    Artist / Producer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    placeholder="e.g. Lunar Sequence"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="producer@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                    Primary Sound / Genre *
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50 font-['DM_Mono',monospace]"
                  >
                    <option value="Deep House">Deep House</option>
                    <option value="Afro House / Tribal">Afro House / Tribal</option>
                    <option value="Dub Techno">Dub Techno</option>
                    <option value="Organic House">Organic House</option>
                    <option value="Deep Tech / Minimal">Deep Tech / Minimal</option>
                    <option value="Ambient / Downtempo">Ambient / Downtempo</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                    City & Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Durban, South Africa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                  Private Streaming Link (SoundCloud / Dropbox / Drive) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.demoLink}
                  onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                  placeholder="https://soundcloud.com/you/s-secretlink"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                  Hardware / Synths / Production Gear Used
                </label>
                <input
                  type="text"
                  value={formData.hardwareUsed}
                  onChange={(e) => setFormData({ ...formData, hardwareUsed: e.target.value })}
                  placeholder="e.g. Roland Juno 106, Moog Sub 37, tape delays, live kalimba"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1 font-['DM_Mono',monospace]">
                  Artist Concept & Vision
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us briefly about your music, vision, and catalog background..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#BE1E2F] bg-slate-50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs font-bold uppercase tracking-wider font-['DM_Mono',monospace] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Routing to {TARGET_EMAIL}...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Demo to {TARGET_EMAIL}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center font-['DM_Mono',monospace]">
                Submitting opens your email client directly pre-addressed to {TARGET_EMAIL}.
              </p>
            </form>
          ) : (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Hammersmith_One',sans-serif] text-2xl text-slate-900 uppercase">
                Demo Package Prepared & Linked
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-['Exo',sans-serif] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.artistName}</strong>. Your demo package is linked to our official A&R recipient:
                <br />
                <span className="font-['DM_Mono',monospace] text-[#BE1E2F] font-bold text-sm">
                  {TARGET_EMAIL}
                </span>
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-left font-['DM_Mono',monospace] text-xs space-y-1.5">
                <div>Tracking ID: <strong className="text-slate-900">{submittedId}</strong></div>
                <div>Recipient: <span className="text-[#BE1E2F] font-semibold">{TARGET_EMAIL}</span></div>
                <div>Status: <span className="text-emerald-700 font-semibold">Logged for A&R Review</span></div>
                <div>Demo Link: <span className="text-slate-500 truncate block">{formData.demoLink}</span></div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateMailtoUrl()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#BE1E2F] hover:bg-[#a11624] text-white text-xs font-semibold uppercase tracking-wider font-['DM_Mono',monospace] flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail App</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySubmissionPackage}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider font-['DM_Mono',monospace] flex items-center justify-center gap-2"
                >
                  {copiedPackage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied Package</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Full Package</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-900 font-['DM_Mono',monospace] underline"
                >
                  Submit Another Demo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Info Box: Guidelines & Direct Email */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-['Hammersmith_One',sans-serif] text-base uppercase">
                <ShieldCheck className="w-4 h-4 text-[#BE1E2F]" />
                <span>A&R Submission Policy</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-['DM_Mono',monospace] text-slate-400 uppercase tracking-wider block">
                Direct Submission Address
              </span>
              <div className="flex items-center justify-between">
                <span className="font-['DM_Mono',monospace] text-xs font-bold text-[#BE1E2F]">
                  {TARGET_EMAIL}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-[11px] font-['DM_Mono',monospace] text-slate-500 hover:text-slate-900 underline"
                >
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <ul className="text-xs space-y-3 font-['Exo',sans-serif] text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-slate-900">Direct to {TARGET_EMAIL}:</strong> All demo submissions are cataloged in our weekly listening session with label selectors.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-slate-900">Audio Standards:</strong> Please send private SoundCloud links (downloadable 320kbps MP3 or 24-bit WAV) with clean headroom (-3dB True Peak).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-slate-900">Sonic Identity:</strong> We focus on Deep House, Afro Deep, Dub Techno, Minimal, and Organic electronics.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-slate-900">Feedback Timeline:</strong> If a track matches our release schedule, our A&R will reply directly from {TARGET_EMAIL} within 14 business days.
                </div>
              </li>
            </ul>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white space-y-2 text-xs">
            <div className="flex items-center gap-2 font-['Hammersmith_One',sans-serif] text-slate-900 uppercase">
              <HelpCircle className="w-4 h-4 text-[#BE1E2F]" />
              <span>Need Direct Press or Licensing?</span>
            </div>
            <p className="text-slate-500 font-['Exo',sans-serif] leading-relaxed">
              For synchronization licensing, DJ promo pool inclusion, or interview requests, email{' '}
              <a href={`mailto:${TARGET_EMAIL}`} className="text-[#BE1E2F] font-semibold underline font-['DM_Mono',monospace]">
                {TARGET_EMAIL}
              </a>{' '}
              with [PRESS] or [LICENSING] in the subject header.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
