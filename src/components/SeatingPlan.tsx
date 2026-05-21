import React, { useState } from 'react';
import { Ticket, ShieldCheck, MapPin, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TICKET_TIERS, CONCERT_DETAILS } from '../data';
import { TicketTier } from '../types';

interface SeatingPlanProps {
  ticketTiers?: TicketTier[];
}

export default function SeatingPlan({ ticketTiers }: SeatingPlanProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('rock-zone');

  const tiers = ticketTiers || TICKET_TIERS;
  const selectedTier = tiers.find(t => t.id === selectedTierId) || tiers[0];

  return (
    <div id="seating-section" className="p-4 sm:p-6 md:p-8 bg-neutral-900/95 border border-neutral-850 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="text-center mb-8">
        <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-[0.2em] bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded-full inline-flex items-center gap-1.5 uppercase">
          <MapPin className="w-3.5 h-3.5 text-lime-400" /> PELAN DEWAN MEGASTAR ARENA
        </span>
        <h3 className="text-4xl font-display font-black text-white tracking-tighter uppercase italic mt-3">
          Peta Interaktif & Zon Tiket
        </h3>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto mt-1 first-letter:uppercase font-sans">
          Klik pada mana-mana zon dewan di peta interaktif atau pilih kad kategori di sebelah kanan untuk memperincikan harga Early Bird, harga normal & senarai kelebihan eksklusif tiket anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive SVG Map representing Megastar Arena layout */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-800 shadow-inner relative overflow-hidden">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Map Title/Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[9px] text-neutral-500 uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" /> PANDANGAN INTERAKTIF
          </div>

          <div className="w-full max-w-[380px] aspect-[4/4.5] relative flex items-center justify-center">
            <svg 
              viewBox="0 0 400 450" 
              className="w-full h-full filter drop-shadow-2xl"
              style={{ maxHeight: '420px' }}
            >
              <defs>
                <filter id="glow-selected" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a3e635" floodOpacity="0.85" />
                </filter>
              </defs>

              {/* STAGE */}
              <g transform="translate(100, 10)">
                <path 
                  d="M 20,0 L 180,0 L 200,32 L 0,32 Z" 
                  fill="#171717" 
                  stroke="#404040" 
                  strokeWidth="2"
                />
                <text 
                  x="100" 
                  y="20" 
                  textAnchor="middle" 
                  fill="#888888" 
                  fontSize="10" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  letterSpacing="3"
                >
                  STAGE / PENTAS
                </text>
                <line x1="0" y1="32" x2="200" y2="32" stroke="#a3e635" strokeWidth="2" strokeDasharray="4 2" />
              </g>

              {/* CAT 1 (Left Wing) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('cat-1')}
              >
                <path 
                  d="M 40,48 L 120,48 L 105,98 L 20,98 Z" 
                  fill={selectedTierId === 'cat-1' ? '#a3e635' : '#1e3a8a'} 
                  stroke={selectedTierId === 'cat-1' ? '#a3e635' : '#3b82f6'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'cat-1' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="70" 
                  y="77" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'cat-1' ? '#000' : '#ffffff'} 
                  fontSize="8" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  className="pointer-events-none"
                >
                  CAT 1
                </text>
              </g>

              {/* ROCK ZONE (Center) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('rock-zone')}
              >
                <path 
                  d="M 125,48 L 275,48 L 295,98 L 105,98 Z" 
                  fill={selectedTierId === 'rock-zone' ? '#a3e635' : '#14532d'} 
                  stroke={selectedTierId === 'rock-zone' ? '#a3e635' : '#22c55e'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'rock-zone' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="195" 
                  y="77" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'rock-zone' ? '#000' : '#a7f3d0'} 
                  fontSize="10" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  letterSpacing="1"
                  className="pointer-events-none"
                >
                  ⚡ ROCK ZONE
                </text>
              </g>

              {/* CAT 1 (Right Wing) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('cat-1')}
              >
                <path 
                  d="M 280,48 L 360,48 L 380,98 L 295,98 Z" 
                  fill={selectedTierId === 'cat-1' ? '#a3e635' : '#1e3a8a'} 
                  stroke={selectedTierId === 'cat-1' ? '#a3e635' : '#3b82f6'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'cat-1' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="330" 
                  y="77" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'cat-1' ? '#000' : '#ffffff'} 
                  fontSize="8" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  className="pointer-events-none"
                >
                  CAT 1
                </text>
              </g>

              {/* CAT 2 (Free Standing - Lower Level) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('cat-2')}
              >
                <path 
                  d="M 15,106 L 385,106 L 394,156 L 6,156 Z" 
                  fill={selectedTierId === 'cat-2' ? '#a3e635' : '#262626'} 
                  stroke={selectedTierId === 'cat-2' ? '#a3e635' : '#737373'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'cat-2' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="200" 
                  y="136" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'cat-2' ? '#000' : '#e5e5e5'} 
                  fontSize="11" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  letterSpacing="1.5"
                  className="pointer-events-none"
                >
                  🏟️ CAT 2
                </text>
              </g>

              {/* Demarcation line: LOWER LEVEL vs UPPER LEVEL */}
              <line 
                x1="0" 
                y1="183" 
                x2="400" 
                y2="183" 
                stroke="#404040" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
              <rect x="5" y="174" width="90" height="18" rx="3" fill="#14532d" className="opacity-90" />
              <text x="50" y="186" textAnchor="middle" fill="#22c55e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">LOWER LEVEL</text>
              
              <rect x="305" y="174" width="90" height="18" rx="3" fill="#3b0764" className="opacity-90" />
              <text x="350" y="186" textAnchor="middle" fill="#c084fc" fontSize="6.5" fontFamily="monospace" fontWeight="bold">UPPER LEVEL</text>

              {/* FOH (Console Block) */}
              <g transform="translate(160, 162)">
                <path 
                  d="M 12,0 L 68,0 L 73,15 L 7,15 Z" 
                  fill="#171717" 
                  stroke="#404040" 
                  strokeWidth="1"
                />
                <text 
                  x="40" 
                  y="10" 
                  textAnchor="middle" 
                  fill="#737373" 
                  fontSize="6.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                >
                  FOH
                </text>
              </g>

              {/* GRAND VIP (Upper Level Purple Strip) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('grand-vip')}
              >
                <path 
                  d="M 2,192 L 398,192 L 399,224 L 1,224 Z" 
                  fill={selectedTierId === 'grand-vip' ? '#a3e635' : '#4c1d95'} 
                  stroke={selectedTierId === 'grand-vip' ? '#a3e635' : '#a855f7'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'grand-vip' ? 'url(#glow-selected)' : ''}
                />
                
                {/* Visual miniature Sofa boxes representation */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const xPos = 16 + i * 27.5;
                  return (
                    <rect 
                      key={i} 
                      x={xPos} 
                      y="196" 
                      width="15" 
                      height="6" 
                      rx="1" 
                      fill={selectedTierId === 'grand-vip' ? '#172554' : '#c084fc'} 
                      className="opacity-75"
                    />
                  );
                })}

                <text 
                  x="200" 
                  y="215" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'grand-vip' ? '#000' : '#f3e8ff'} 
                  fontSize="10" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  letterSpacing="2"
                  className="pointer-events-none"
                >
                  👑 GRAND VIP (SOFA)
                </text>
              </g>

              {/* CAT 3 (Upper Level Red) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('cat-3')}
              >
                <path 
                  d="M 1,232 L 399,232 L 399,287 L 1,287 Z" 
                  fill={selectedTierId === 'cat-3' ? '#a3e635' : '#7f1d1d'} 
                  stroke={selectedTierId === 'cat-3' ? '#a3e635' : '#ef4444'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'cat-3' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="200" 
                  y="263" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'cat-3' ? '#000' : '#fee2e2'} 
                  fontSize="12" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  letterSpacing="1.5"
                  className="pointer-events-none"
                >
                  🏟️ CAT 3
                </text>
              </g>

              {/* CAT 4 (Upper Level Yellow) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setSelectedTierId('cat-4')}
              >
                <path 
                  d="M 1,295 L 399,295 L 399,350 L 1,350 Z" 
                  fill={selectedTierId === 'cat-4' ? '#a3e635' : '#713f12'} 
                  stroke={selectedTierId === 'cat-4' ? '#a3e635' : '#eab308'} 
                  strokeWidth="2"
                  className="transition-all duration-300 hover:opacity-90"
                  filter={selectedTierId === 'cat-4' ? 'url(#glow-selected)' : ''}
                />
                <text 
                  x="200" 
                  y="327" 
                  textAnchor="middle" 
                  fill={selectedTierId === 'cat-4' ? '#000' : '#fef9c3'} 
                  fontSize="12" 
                  fontFamily="sans-serif" 
                  fontWeight="black"
                  letterSpacing="1.5"
                  className="pointer-events-none"
                >
                  🏟️ CAT 4
                </text>
              </g>

              {/* ACCESS PATHWAY / INFRASTRUCTURE INFO */}
              <g transform="translate(0, 360)">
                <line x1="15" y1="20" x2="385" y2="20" stroke="#262626" strokeWidth="1" />
                <rect x="40" y="10" width="10" height="20" rx="1" fill="#171717" stroke="#404040" />
                <rect x="350" y="10" width="10" height="20" rx="1" fill="#171717" stroke="#404040" />
                <text x="55" y="24" fill="#525252" fontSize="7" fontFamily="monospace" fontWeight="bold">PINTU MASUK KIRI</text>
                <text x="345" y="24" textAnchor="end" fill="#525252" fontSize="7" fontFamily="monospace" fontWeight="bold">PINTU MASUK KANAN</text>
              </g>
            </svg>
          </div>
          
          <div className="grid grid-cols-3 gap-y-2 gap-x-4 mt-4 w-full text-[9px] font-mono text-neutral-400 border-t border-neutral-850 pt-3">
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-fuchsia-600 rounded-sm" /> GRAND VIP</span>
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /> CAT 1</span>
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm" /> ROCK ZONE</span>
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-neutral-600 rounded-sm" /> CAT 2</span>
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-red-600 rounded-sm" /> CAT 3</span>
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-sm" /> CAT 4</span>
          </div>
        </div>

        {/* Right Column: Ticket details & pricing cards selector */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Quick Zone selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`py-2 px-3.5 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                  selectedTierId === tier.id
                    ? 'bg-neutral-800 text-white border-lime-400 shadow-lg scale-[1.01]'
                    : 'bg-neutral-950/40 text-neutral-400 border-neutral-850 hover:border-neutral-800'
                }`}
                id={`pill-tier-${tier.id}`}
              >
                <div className="text-[9px] font-mono text-neutral-500 uppercase truncate font-bold">TIER</div>
                <div className="text-xs font-bold font-sans truncate">{tier.name.split(' (')[0]}</div>
                <div className="text-xs font-black mt-1 font-mono text-lime-400">
                  {tier.hideNormalPrice ? '' : 'EB: '}RM {Number(tier.earlyBirdPrice !== undefined ? tier.earlyBirdPrice : tier.price).toFixed(2)}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Tier Specs Display Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTier.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-850 flex flex-col justify-between gap-6"
            >
              <div>
                {/* Header info badge */}
                <div className="flex items-start justify-between gap-2 border-b border-neutral-850 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">ZON PILIHAN:</span>
                    <h4 className="text-xl font-display font-black text-white mt-0.5">{selectedTier.name}</h4>
                    <div className="flex gap-1.5 mt-1.5">
                      <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-800 text-neutral-400 border border-neutral-700/50 rounded uppercase font-bold">
                        {selectedTier.level}
                      </span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded uppercase font-bold">
                        {selectedTier.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 font-bold block">HARGA TIKET (TERMASUK CUKAI):</span>
                    <div className="text-lg font-mono font-black text-lime-400">
                      {selectedTier.hideNormalPrice ? '' : 'EB: '}RM {Number(selectedTier.earlyBirdPrice !== undefined ? selectedTier.earlyBirdPrice : selectedTier.price).toFixed(2)}
                    </div>
                    {!selectedTier.hideNormalPrice && (
                      <div className="text-[10px] font-mono text-neutral-500 font-bold mt-0.5">
                        NP: RM {Number(selectedTier.normalPrice !== undefined ? selectedTier.normalPrice : selectedTier.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Perks Checklist */}
                <h5 className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-lime-400" /> KEISTIMEWAAN TIKET:
                </h5>
                
                <ul className="space-y-2 text-xs md:text-sm text-neutral-300 font-sans">
                  {selectedTier.perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-action button */}
              <div className="pt-2">
                <a
                  href={CONCERT_DETAILS.ticketLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-center text-sm tracking-widest uppercase rounded-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] italic shadow-lg shadow-lime-400/20"
                  id={`btn-purchase-tier-${selectedTier.id}`}
                >
                  <Ticket className="w-4.5 h-4.5" /> BELI {selectedTier.name.split(' (')[0]} SEKARANG 🎫
                </a>
                <span className="text-[9px] text-neutral-500 text-center block mt-2 font-mono">
                  *Pautan rasmi UberTickets dengan Kod Akses Marrazi aktif.{!selectedTier.hideNormalPrice && ' EB = Early Bird | NP = Normal Price.'} Harga tiket sudah termasuk cukai.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
