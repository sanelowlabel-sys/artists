export interface LabelRelease {
  id: string;
  catalogNumber: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseDate: string;
  format: string; // 'Digital & 12" Vinyl', 'Digital EP', 'Compilation LP'
  genre: string;
  coverAccent: string; // color gradient accent
  coverImageUrl: string; // high-resolution real cover art image
  description: string;
  tracks: {
    title: string;
    duration: string;
    mixName?: string;
    artistCredit?: string;
  }[];
  spotifyUrl: string;
  spotifyEmbedUrl: string;
  bpm: number;
  key: string;
}

export interface RadioSession {
  id: string;
  episodeNumber: string;
  title: string;
  host: string;
  duration: string;
  date: string;
  coverImageUrl: string;
  description: string;
  tracklist: string[];
  streamUrl: string;
  tags: string[];
}

export interface LabelEvent {
  id: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  country: string;
  lineup: string[];
  status: 'On Sale' | 'Sold Out' | 'Free RSVP' | 'Few Tickets Left';
  ticketUrl: string;
}

export const SANELOW_RELEASES: LabelRelease[] = [
  {
    id: 'snlw-dark-23',
    catalogNumber: 'SNLW-DARK-23',
    title: 'Sanelow Dark, Vol. 23',
    artistId: 'themetique',
    artistName: 'Various Artists / Themetique',
    releaseDate: 'February 2026',
    format: 'Compilation LP & Digital',
    genre: 'Deep House / Minimal',
    coverAccent: '#1E1B4B',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b27340b9e57d28366627139ac619',
    description: 'The premier volume in the acclaimed Sanelow Dark compilation catalog. Hypnotic subterranean kick pulses, resonant delays, and cavernous sub-bass built strictly for late night club sound systems.',
    tracks: [
      { title: 'Dark Controller', duration: '6:54', mixName: 'Original Mix', artistCredit: 'Dex Outro' },
      { title: 'Escaping The Matrix', duration: '7:18', mixName: 'Deep Club Mix', artistCredit: 'Marcus Watkins' },
      { title: 'Full Change', duration: '7:02', mixName: 'Original Mix', artistCredit: 'Themetique' },
      { title: 'Colossal Chords', duration: '6:45', mixName: 'Dub Tech Mix', artistCredit: 'Gigantic_Deep ZA' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/5HsSveN7p5MHi2OMxBPyHt',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/5HsSveN7p5MHi2OMxBPyHt?utm_source=generator&theme=0',
    bpm: 122,
    key: 'F Minor'
  },
  {
    id: 'snlw-themetique-lost',
    catalogNumber: 'SNLW024',
    title: 'Lost and Found EP',
    artistId: 'themetique',
    artistName: 'Themetique',
    releaseDate: 'November 2025',
    format: '12" Vinyl & Digital EP',
    genre: 'Deep House / Afro Deep',
    coverAccent: '#BE1E2F',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b27340b9e57d28366627139ac619',
    description: 'Official flagship release by Themetique on Sanelow Label. Featuring lush atmospheric chords, polyrhythmic percussion, and the underground club anthem "Lost and Found".',
    tracks: [
      { title: 'Lost and Found', duration: '6:42', mixName: 'Original Mix', artistCredit: 'Themetique' },
      { title: 'Solar Waves', duration: '7:15', mixName: 'Afro Space Dub', artistCredit: 'Themetique' },
      { title: 'Echoes of Azania', duration: '6:30', mixName: 'Deep Cut', artistCredit: 'Themetique' },
      { title: 'Lost and Found (BelmireDub Remix)', duration: '8:05', mixName: 'Subterranean Dub', artistCredit: 'Themetique & BelmireDub' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/5HsSveN7p5MHi2OMxBPyHt',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/5HsSveN7p5MHi2OMxBPyHt?utm_source=generator&theme=0',
    bpm: 121,
    key: 'A Minor'
  },
  {
    id: 'snlw-dark-21',
    catalogNumber: 'SNLW-DARK-21',
    title: 'Sanelow Dark, Vol. 21',
    artistId: 'belmiredub',
    artistName: 'Various Artists / BelmireDub',
    releaseDate: 'September 2025',
    format: '12" Vinyl & Digital',
    genre: 'Dub Techno / Deep House',
    coverAccent: '#0F172A',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b273562d70fbe978660dcc02cf47',
    description: 'Analog synthesizer saturation meets tape flutter. An essential Sanelow collection showcasing the raw depths of modern South African dub techno and deep house architecture.',
    tracks: [
      { title: 'Subterranean Echoes', duration: '8:12', mixName: 'Tape Master', artistCredit: 'BelmireDub' },
      { title: 'Tears in the Dark', duration: '7:36', mixName: 'Dub Tech Mix', artistCredit: 'Blac Tears' },
      { title: 'Cognitive Flow', duration: '6:48', mixName: 'Modular Mix', artistCredit: 'Sound minds Muzik' },
      { title: 'Sunrise over Soweto', duration: '7:04', mixName: 'Deep Soul Dub', artistCredit: 'Sir Kabiano' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/7c0zNsYXD0jGV37f3cjOKn',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/7c0zNsYXD0jGV37f3cjOKn?utm_source=generator&theme=0',
    bpm: 120,
    key: 'C Minor'
  },
  {
    id: 'snlw-sanque-rituals',
    catalogNumber: 'SNLW022',
    title: 'Rituals of the Soil',
    artistId: 'sanque',
    artistName: 'Sanque',
    releaseDate: 'July 2025',
    format: '12" Vinyl & Digital',
    genre: 'Afro Deep / Tribal',
    coverAccent: '#9A3412',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b273d7fa9c6691e05f5f732335a7',
    description: 'Ancestral percussions from KwaZulu-Natal intertwine with hypnotic modular sequences. A profound deep ritual that has resonated across European and African clubs alike.',
    tracks: [
      { title: 'Rituals of the Soil', duration: '8:16', mixName: 'Sacred Groove', artistCredit: 'Sanque' },
      { title: 'Ancestral Whisper', duration: '7:24', mixName: 'Vocal Chants Mix', artistCredit: 'Sanque' },
      { title: 'Origins', duration: '6:50', mixName: 'Percussive Dub', artistCredit: 'Sanque' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/6A3Ni01Ob6LF3QOUSaOmEG',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/6A3Ni01Ob6LF3QOUSaOmEG?utm_source=generator&theme=0',
    bpm: 119,
    key: 'D Minor'
  },
  {
    id: 'snlw-dark-18',
    catalogNumber: 'SNLW-DARK-18',
    title: 'Sanelow Dark, Vol. 18',
    artistId: 'spaceman',
    artistName: 'Various Artists / Spaceman',
    releaseDate: 'May 2025',
    format: 'Digital EP',
    genre: 'Deep Tech / Minimal',
    coverAccent: '#334155',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b2734da25e2e37527fc033b43291',
    description: 'Minimal drum patterns, deep resonant sub hits, and subtle modular synthesis built for the darkest corners of the club, championed by Da Conist and Spaceman.',
    tracks: [
      { title: 'Zero Gravity', duration: '7:20', mixName: 'Modular Edit', artistCredit: 'Da Conist' },
      { title: 'Interstellar Drift', duration: '6:55', mixName: 'Sub Bass Mix', artistCredit: 'Spaceman' },
      { title: 'Concrete & Rain', duration: '7:40', mixName: 'Dub Factor', artistCredit: 'Abo' },
      { title: 'Horizon', duration: '6:22', mixName: 'Night Lights', artistCredit: 'Lance' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/1l6wSO2dN5nDZxCERgL1mQ',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/1l6wSO2dN5nDZxCERgL1mQ?utm_source=generator&theme=0',
    bpm: 121,
    key: 'G Minor'
  },
  {
    id: 'snlw-dark-17',
    catalogNumber: 'SNLW-DARK-17',
    title: 'Sanelow Dark, Vol. 17',
    artistId: 'da-conist',
    artistName: 'Various Artists / Da Conist',
    releaseDate: 'March 2025',
    format: 'Digital & Cassette',
    genre: 'Deep House / Deep Tech',
    coverAccent: '#475569',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b2735a699d35123311101dc7a7ee',
    description: 'Pivotal volume spotlighting Da Conist, Sound minds Muzik, and Lord Kyno. Surgical low-end dynamics designed to push heavy club sound rigs.',
    tracks: [
      { title: 'Modular Dreams', duration: '7:08', mixName: 'Original Mix', artistCredit: 'Da Conist' },
      { title: 'Mind & Matter', duration: '6:42', mixName: 'Deep Cut', artistCredit: 'Sound minds Muzik' },
      { title: 'Subterranean Kingdom', duration: '7:30', mixName: 'Raw Dub', artistCredit: 'Lord Kyno' },
      { title: 'Rooted in Love', duration: '6:55', mixName: 'Soul Version', artistCredit: 'Soil Zintoh SA' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/4aaGk4esQZZVhEatIJbbMi',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/4aaGk4esQZZVhEatIJbbMi?utm_source=generator&theme=0',
    bpm: 120,
    key: 'E Minor'
  },
  {
    id: 'snlw-yaros-keys',
    catalogNumber: 'SNLW010',
    title: 'Ivory Reflections EP',
    artistId: 'yaros-keys',
    artistName: 'Yaros Keys',
    releaseDate: 'January 2025',
    format: 'Digital EP',
    genre: 'Piano Deep / Melodic House',
    coverAccent: '#D97706',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b27333123b19535e75c872e87266',
    description: 'Impeccable acoustic grand piano motifs, emotive jazz chords, and rolling sub-bass recorded in Pretoria by keyboard virtuoso Yaros Keys.',
    tracks: [
      { title: 'Ivory Reflections', duration: '6:48', mixName: 'Original Mix', artistCredit: 'Yaros Keys' },
      { title: 'Keys of Hope', duration: '7:14', mixName: 'Melodic Sunset', artistCredit: 'Yaros Keys' },
      { title: 'A Journey Within', duration: '6:20', mixName: 'Deep Reprise', artistCredit: 'Matt Solo & Yaros Keys' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/38JYCknoIFg6liNmut7Brc',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/38JYCknoIFg6liNmut7Brc?utm_source=generator&theme=0',
    bpm: 118,
    key: 'D# Minor'
  },
  {
    id: 'snlw-dark-13',
    catalogNumber: 'SNLW-DARK-13',
    title: 'Sanelow Dark, Vol. 13',
    artistId: 'themetique',
    artistName: 'Various Artists / The iRish SA',
    releaseDate: 'October 2024',
    format: 'Compilation LP & Digital',
    genre: 'Soulful House / Deep',
    coverAccent: '#7C2D12',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b2733ff38f46bf430876097c6929',
    description: 'Foundational release in the Sanelow catalog. Highlighting the warm Rhodes keys of The iRish SA, Themetique, and Soil Zintoh SA.',
    tracks: [
      { title: 'Full Change', duration: '7:22', mixName: 'Classic Mix', artistCredit: 'Themetique' },
      { title: 'Late Night Chronicles', duration: '6:45', mixName: 'Soul Expression', artistCredit: 'The iRish SA' },
      { title: 'Soil & Soul', duration: '7:10', mixName: 'Dub Instrumental', artistCredit: 'Soil Zintoh SA' },
      { title: 'Solitude', duration: '6:35', mixName: 'Healing Chords', artistCredit: 'Matt Solo' }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3DsO29Y03mSSoqsDe2SqGb',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/artist/3DsO29Y03mSSoqsDe2SqGb?utm_source=generator&theme=0',
    bpm: 119,
    key: 'B Minor'
  }
];

export const SANELOW_RADIO_SESSIONS: RadioSession[] = [
  {
    id: 'radio-048',
    episodeNumber: 'Episode 048',
    title: 'Deep Transmissions from Johannesburg',
    host: 'Themetique & Special Guest BelmireDub',
    duration: '1h 14m',
    date: 'February 2026',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b27340b9e57d28366627139ac619',
    description: 'A two-hour sonic voyage through unreleased Sanelow dubplates, rare South African private presses, and fresh Berlin dub techno imports.',
    tracklist: [
      'Themetique - Lost and Found (Unreleased Dub)',
      'BelmireDub - Subterranean Echoes (Tape Master)',
      'Dex Outro - Dark Controller (Sanelow Dark 23)',
      'Marcus Watkins - Escaping The Matrix',
      'Sanque - Ancestral Drums (Live Jam Cut)'
    ],
    streamUrl: 'https://open.spotify.com',
    tags: ['Deep House', 'Dub Techno', 'Vinyl Only', 'Live Mix']
  },
  {
    id: 'radio-047',
    episodeNumber: 'Episode 047',
    title: 'Ancestral Rhythms & Afro Deep Explorations',
    host: 'Sanque',
    duration: '1h 02m',
    date: 'January 2026',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b273d7fa9c6691e05f5f732335a7',
    description: 'Organic percussive magic recorded live in Durban featuring kalimbas, talking drums, and subtle sub-bass pulses.',
    tracklist: [
      'Sanque - Earth & Water Intro',
      'Soil Zintoh SA - Rooted In Love (Instrumental Reprise)',
      'SoilyQue Land - Savanna Horizon',
      'Bogy BE - Tribal Echoes (Live Djembe Overdub)'
    ],
    streamUrl: 'https://open.spotify.com',
    tags: ['Afro Deep', 'Tribal', 'Organic', 'Live Percussion']
  },
  {
    id: 'radio-046',
    episodeNumber: 'Episode 046',
    title: 'Late Night Soul & Rhodes Chronicles',
    host: 'The iRish SA & Matt Solo',
    duration: '58m',
    date: 'December 2025',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b2733ff38f46bf430876097c6929',
    description: 'Smooth chords, soulful vocal edits, and deep jazz-infused grooves for headphone sessions and late night drives.',
    tracklist: [
      'The iRish SA - Velvet Touch (Master)',
      'Matt Solo - Healing Chords',
      'BrightKay - Sunrise Reflection',
      'KMJ Soulz - Gentle Morning Dub'
    ],
    streamUrl: 'https://open.spotify.com',
    tags: ['Soulful House', 'Jazz Chords', 'Rhodes Keys']
  },
  {
    id: 'radio-045',
    episodeNumber: 'Episode 045',
    title: 'Underground Sound Architecture',
    host: 'Sound minds Muzik & Da Conist',
    duration: '1h 20m',
    date: 'November 2025',
    coverImageUrl: 'https://i.scdn.co/image/ab67616d0000b273c20390fe60a6305d490a358c',
    description: 'Modular synthesis, cavernous spaces, and intricate four-on-the-floor rhythms pushing deep electronic sound design.',
    tracklist: [
      'Sound minds Muzik - Cognitive Flow',
      'Da Conist - Zero Gravity (Modular Edit)',
      'Abo - Concrete & Rain Dub',
      'Lord Kyno - Industrial Kingdom'
    ],
    streamUrl: 'https://open.spotify.com',
    tags: ['Deep Tech', 'Minimal', 'Modular']
  }
];

export const SANELOW_EVENTS: LabelEvent[] = [
  {
    id: 'event-01',
    title: 'Sanelow Showcase: Night at the Subterranean',
    date: 'April 18, 2026',
    city: 'Johannesburg',
    venue: 'And Club, Newtown',
    country: 'South Africa',
    lineup: ['Themetique', 'BelmireDub', 'Spaceman', 'Sanque (Live Percussion)'],
    status: 'Few Tickets Left',
    ticketUrl: 'https://open.spotify.com'
  },
  {
    id: 'event-02',
    title: 'Deep House Sanctuary — Sunset Session',
    date: 'May 02, 2026',
    city: 'Cape Town',
    venue: 'Modular Club, Loop St',
    country: 'South Africa',
    lineup: ['Blac Tears', 'Matt Solo', 'The iRish SA', 'Gigantic_Deep ZA'],
    status: 'On Sale',
    ticketUrl: 'https://open.spotify.com'
  },
  {
    id: 'event-03',
    title: 'Afro Deep Rituals: Open Air',
    date: 'May 23, 2026',
    city: 'Durban',
    venue: 'The Plant, Station Rd',
    country: 'South Africa',
    lineup: ['Sanque', 'Soil Zintoh SA', 'Sir Kabiano', 'Bogy BE'],
    status: 'Free RSVP',
    ticketUrl: 'https://open.spotify.com'
  },
  {
    id: 'event-04',
    title: 'Sanelow London Showcase',
    date: 'June 14, 2026',
    city: 'London',
    venue: 'Corsica Studios, Elephant & Castle',
    country: 'United Kingdom',
    lineup: ['Themetique', 'Blac Tears', 'Sound minds Muzik', 'Guest Selectors'],
    status: 'On Sale',
    ticketUrl: 'https://open.spotify.com'
  },
  {
    id: 'event-05',
    title: 'Berlin Dub Sessions: Tape & Vinyl',
    date: 'July 11, 2026',
    city: 'Berlin',
    venue: 'Tresor (Globus Floor)',
    country: 'Germany',
    lineup: ['BelmireDub', 'Spaceman', 'Da Conist', 'Lance'],
    status: 'On Sale',
    ticketUrl: 'https://open.spotify.com'
  }
];
