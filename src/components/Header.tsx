import React from 'react';
import { Anchor, ShieldAlert, Award, Calendar, ExternalLink } from 'lucide-react';
import { CONCERT_DETAILS } from '../data';

export default function Header() {
  return (
    <header className="relative z-10 w-full bg-neutral-950/80 border-b border-neutral-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* LOGO & CLAN */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-lime-400 flex items-center justify-center shadow-lg shadow-lime-400/20">
            <Anchor className="w-4.5 h-4.5 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-widest font-mono">KONSERT 3VETO</h1>
            <p className="text-[9px] text-lime-400 font-mono font-bold tracking-widest -mt-0.5">WINGS • XPDC • SEARCH</p>
          </div>
        </div>

        {/* ORGANIZER CREDITS BADGES (From Poster) */}
        <div className="flex items-center gap-3 text-[9px] font-mono text-neutral-400 overflow-x-auto max-w-full whitespace-nowrap scrollbar-none">
          <div className="flex items-center gap-1.5 border-r border-neutral-800 pr-3">
            <span className="text-neutral-500">PENGANJUR:</span>
            <span className="text-white font-bold uppercase">Bintang Batu Event</span>
            <span className="text-neutral-600">•</span>
            <span className="text-white font-bold uppercase">Seri Simfoni</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">RAKAN STRATEGIK:</span>
            <span className="text-white font-semibold uppercase">Rampage Studioworks</span>
          </div>
        </div>

        {/* TOP BOOKING FAST ACTION BUTTON */}
        <a
          href={CONCERT_DETAILS.ticketLink}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-[10px] tracking-wider uppercase rounded-lg shadow-md hover:scale-[1.02] flex items-center gap-1.5 transition-all italic"
          id="btn-header-fast-buy"
        >
          TIKET RASMI <ExternalLink className="w-3 h-3 text-black" />
        </a>
      </div>
    </header>
  );
}
