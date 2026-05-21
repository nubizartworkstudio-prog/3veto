import { Band, TicketTier, QuizQuestion, Shoutout } from './types';

export const CONCERT_DETAILS = {
  title: 'Konsert 3 Veto',
  date: '1 Ogos 2026',
  time: '8:30 Malam',
  venue: 'Megastar Arena, Kuala Lumpur',
  slogan: 'Tiga Perjalanan. Tiga Kuasa. Satu Takdir.',
  ticketLink: 'https://3veto.ubertickets.asia?access_code=marrazi',
  organizers: [
    { name: 'Bintang Batu Event', role: 'Penganjur Utama' },
    { name: 'Seri Simfoni', role: 'Penganjur Bersama' }
  ],
  partners: [
    { name: 'Rampage Studioworks', role: 'Rakan Strategik' },
    { name: 'UberTickets', role: 'Tiket Rasmi' }
  ]
};

export const BANDS: Band[] = [
  {
    id: 'search',
    name: 'SEARCH',
    logo: 'S',
    slogan: 'Fenomena Rock Sepanjang Zaman',
    description: 'Pioneers muzik rock tanah air yang mempelopori era "Rock Kapak". Terkenal dengan solo gitar berapi dan vokal bernada tinggi yang ikonik, mendefinisikan standard rock Melayu sejak era 80-an.',
    established: '1981',
    vocalist: 'Amy / Denden',
    famousSongs: [
      { title: 'Isabella', year: '1989', previewNote: 'E5' },
      { title: 'Fantasia Bulan Madu', year: '1986', previewNote: 'A5' },
      { title: 'Pawana', year: '1989', previewNote: 'G5' }
    ],
    accentColor: '#fbbf24', // Amber/gold
    memberNames: ['Amy (Vokal)', 'Kid (Gitar Utama)', 'Din (Gitar Irama)', 'Nasir (Bass)'],
    image: 'https://arleta.site/interactivelink/3025/FB_IMG_1779252939487.jpg',
    totalMembers: 4,
    photoDescription: 'Sesi latihan panggung penuh berkarisma tinggi dari Search.'
  },
  {
    id: 'wings',
    name: 'WINGS',
    logo: 'W',
    slogan: 'Kuasa Rock Sejati Tanpa Sempadan',
    description: 'Gergasi rock tanah air dengan barisan himpunan lagu cinta berhantu serta lagu rancak yang bertenaga. Diperkasakan oleh suara emas Datuk Awie, Wings terus menggegar pentas demi pentas dengan karisma teaterikal mereka.',
    established: '1985',
    vocalist: 'Datuk Awie',
    famousSongs: [
      { title: 'Sejati', year: '1990', previewNote: 'C5' },
      { title: 'Taman Rashidah Utama', year: '1988', previewNote: 'F5' },
      { title: 'Misteri Mimpi Syakilla', year: '1989', previewNote: 'D5' }
    ],
    accentColor: '#f87171', // Red/Crimson
    memberNames: ['Awie (Vokal)', 'Syamil (Gitar)', 'Eddie (Bass)', 'Black (Drum)'],
    image: 'https://arleta.site/interactivelink/3025/FB_IMG_1779252945040.jpg',
    totalMembers: 4,
    photoDescription: 'Potret penuh aksi pahlawan rock di atas kapal legasi dari Wings.'
  },
  {
    id: 'xpdc',
    name: 'XPDC',
    logo: 'X',
    slogan: 'Raja Heavy Metal & Thrash Rock',
    description: 'Terkenal sebagai raksasa "Metal Timur", XPDC menggabungkan riffs gitar berat dengan lirik mendalam bercorak sosial & ketuhanan. Muzik agresif mereka menjadi rujukan wajib pencinta muzik keras.',
    established: '1989',
    vocalist: 'Mael (Alm) & Ali',
    famousSongs: [
      { title: 'Semangat Yang Hilang', year: '1994', previewNote: 'D5' },
      { title: 'C.I.D.', year: '1992', previewNote: 'E5' },
      { title: 'Titik-Titik Noda', year: '1997', previewNote: 'B4' }
    ],
    accentColor: '#a78bfa', // Purple
    memberNames: ['Mael / Ali (Vokal)', 'Izo (Gitar Utama)', 'Zuar (Bass)', 'Amy (Drum)'],
    image: 'https://arleta.site/interactivelink/3025/FB_IMG_1779252951028.jpg',
    totalMembers: 4,
    photoDescription: 'Raja heavy metal memukau barisan saf hadapan dewan dari XPDC.'
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'grand-vip',
    name: 'GRAND VIP (20 Premium Sofa)',
    price: 1500,
    earlyBirdPrice: 1500,
    normalPrice: 1650.00,
    type: '20 Premium Sofa',
    level: 'Upper Level',
    perks: [
      'POSTER',
      'LANYARD',
      'PATCHES',
      'EXCLUSIVE T-SHIRT',
      'WRISTBAND',
      'LITE F&B'
    ],
    color: 'from-fuchsia-600 to-purple-800',
    status: 'Selling Fast',
    seatsLeft: 5
  },
  {
    id: 'cat-1',
    name: 'CAT 1 (Numbered Seat)',
    price: 449,
    earlyBirdPrice: 449,
    normalPrice: 493.90,
    type: 'Numbered Seat',
    level: 'Lower Level',
    perks: [
      'POSTER',
      'LANYARD',
      'PATCHES',
      'WRISTBAND'
    ],
    color: 'from-blue-600 to-indigo-800',
    status: 'Available',
    seatsLeft: 50
  },
  {
    id: 'cat-3',
    name: 'CAT 3 (Numbered Seat)',
    price: 429,
    earlyBirdPrice: 429,
    normalPrice: 471.90,
    type: 'Numbered Seat',
    level: 'Upper Level',
    perks: [
      'POSTER',
      'WRISTBAND'
    ],
    color: 'from-red-600 to-rose-700',
    status: 'Available',
    seatsLeft: 84
  },
  {
    id: 'cat-4',
    name: 'CAT 4 (Numbered Seat)',
    price: 329,
    earlyBirdPrice: 329,
    normalPrice: 361.90,
    type: 'Numbered Seat',
    level: 'Upper Level',
    perks: [
      'POSTER',
      'WRISTBAND'
    ],
    color: 'from-amber-400 to-yellow-600',
    status: 'Available',
    seatsLeft: 125
  },
  {
    id: 'rock-zone',
    name: 'ROCK ZONE (Free Standing)',
    price: 269,
    earlyBirdPrice: 269,
    normalPrice: 295.90,
    type: 'Free Standing',
    level: 'Lower Level',
    perks: [
      'POSTER',
      'WRISTBAND'
    ],
    color: 'from-emerald-600 to-green-600',
    status: 'Selling Fast',
    seatsLeft: 98
  },
  {
    id: 'cat-2',
    name: 'CAT 2 (Free Standing)',
    price: 189,
    earlyBirdPrice: 189,
    normalPrice: 207.90,
    type: 'Free Standing',
    level: 'Lower Level',
    perks: [
      'WRISTBAND'
    ],
    color: 'from-neutral-600 to-stone-700',
    status: 'Available',
    seatsLeft: 110
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Bila dengar intro lagu rock kapak, apa perkara pertama yang buat darah anda menderu?',
    options: [
      { text: 'Jeritan vokal bernada tinggi ("gila") yang menusuk jiwa!', pointsFor: 'search' },
      { text: 'Melodi gitar solo yang sayu, jiwang & berhantu.', pointsFor: 'wings' },
      { text: 'Riff gitar yang berat, agresif & menghentak kepala!', pointsFor: 'xpdc' }
    ]
  },
  {
    id: 2,
    question: 'Pilih lirik/bait kata yang paling dekat dengan jiwa rock anda:',
    options: [
      { text: '"Isabella... lambang cinta yang lara / Kita terpaksa berpisah..."', pointsFor: 'search' },
      { text: '"Oh sejati... Di mana kan kucari ganti / Seraut wajah yang tak pernah layu..."', pointsFor: 'wings' },
      { text: '"Masih ada lagi... semangat yang hilang / Marilah kita bangkit semula..."', pointsFor: 'xpdc' }
    ]
  },
  {
    id: 3,
    question: 'Apakah vibe konsert impian anda?',
    options: [
      { text: 'Karisma panggung bertaraf glamor dengan magis lampu berwarna-warni.', pointsFor: 'search' },
      { text: 'Rock beremosi, di mana berpuluh ribu orang menyanyi koir bersama penuh perasaan.', pointsFor: 'wings' },
      { text: 'Mosh pit liar penuh peluh dan tenaga berat yang membuat kepala tak berhenti headbang.', pointsFor: 'xpdc' }
    ]
  },
  {
    id: 4,
    question: 'Jika anda seorang pahlawan laut (sesuai tema kapal layar 3 Veto), anda ialah...',
    options: [
      { text: 'Kapten armada yang karismatik dan bergaya tinggi.', pointsFor: 'search' },
      { text: 'Ksatria utama dengan pelindung dada emas dan pedang sakti.', pointsFor: 'wings' },
      { text: 'Pahlawan hadapan yang mengemudikan kapal merempuh badai ganas.', pointsFor: 'xpdc' }
    ]
  }
];

export const PRESET_SHOUTOUTS: Shoutout[] = [
  {
    id: 's1',
    name: 'Zul Rockers',
    message: 'Pergh! Tiga band gergasi atas satu stage! Wings, XPDC dengan Search! Memang takkan lepaskan peluang ni bro! Tiket Rock Zone dah dalam tangan! 🤘🔥',
    timestamp: '2 jam yang lalu',
    likes: 84,
    badge: 'Rock Iron Fan'
  },
  {
    id: 's2',
    name: 'Roslina S.',
    message: 'LaguSejati Datuk Awie tu wajib dengar live! Nostalgia betul zaman sekolah dulu. Jumpa korang kat Megastar Arena 1 Ogos ni!',
    timestamp: '4 jam yang lalu',
    likes: 56,
    badge: 'Wings Supporter'
  },
  {
    id: 's3',
    name: 'Izo_Headbanger',
    message: 'XPDC selamanya! Riff maut dari abang Izo wajib digegar! Biar roboh Megastar Arena dengan jeritan Semangat Yang Hilang!',
    timestamp: '6 jam yang lalu',
    likes: 102,
    badge: 'Thrash Metalhead'
  },
  {
    id: 's4',
    name: 'Farid_Din',
    message: 'Search tanpa Din dan Kid memang tak lengkap. Terima kasih penganjur bawa gandingan hebat pahlawan rock dalam konsert bertema pelayaran ni. Slogan mantap!',
    timestamp: '1 hari yang lalu',
    likes: 41,
    badge: 'Search Loyal Fan'
  }
];

export const ROCK_CHANTS = [
  'Hooooyaaaa! 🤘',
  'Semangat Yang Hilang bangkitlah! 🔥',
  'Sejati selamanya! ❤️',
  'Isabella oh Isabella! 🌹',
  'Rock kapak takkan pernah mati! 🎸',
  'Gegar Megastar Arena! ⚡',
  'VETO! VETO! VETO! 🚢'
];
