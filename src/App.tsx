import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BandSection from './components/BandSection';
import SeatingPlan from './components/SeatingPlan';
import Footer from './components/Footer';
import { CONCERT_DETAILS } from './data';
import { 
  Flame, 
  Calendar, 
  MapPin, 
  Ticket, 
  Volume2, 
  Music, 
  Navigation, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BANDS, TICKET_TIERS } from './data';
import AdminPanel from './components/AdminPanel';
import { Band, TicketTier } from './types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export default function App() {
  const [heroPhoto, setHeroPhoto] = useState<string>(() => {
    return localStorage.getItem('3veto_hero_photo') || "https://arleta.site/interactivelink/3025/3veto.jpeg";
  });
  const [bands, setBands] = useState<Band[]>(() => {
    const saved = localStorage.getItem('3veto_bands');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading bands from local storage:', e);
      }
    }
    return BANDS;
  });
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>(() => {
    const saved = localStorage.getItem('3veto_ticket_tiers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading ticket tiers from local storage:', e);
      }
    }
    return TICKET_TIERS;
  });

  // Listen to Firestore real-time settings configuration
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'config'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.heroPhoto) setHeroPhoto(data.heroPhoto);
          if (data.bands) setBands(data.bands);
          if (data.ticketTiers) setTicketTiers(data.ticketTiers);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'settings/config');
      }
    );
    return unsub;
  }, []);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Dynamic prices min/max calculation for decimal formatted sticky bar
  const getMinMaxPrices = () => {
    if (ticketTiers.length === 0) return { min: 0, max: 0 };
    const allPrices: number[] = [];
    ticketTiers.forEach(t => {
      const basePrice = Number(t.price);
      const ebPrice = t.earlyBirdPrice !== undefined && t.earlyBirdPrice !== null ? Number(t.earlyBirdPrice) : basePrice;

      if (!isNaN(ebPrice) && ebPrice > 0) {
        allPrices.push(ebPrice);
      } else if (!isNaN(basePrice) && basePrice > 0) {
        allPrices.push(basePrice);
      }
    });

    if (allPrices.length === 0) return { min: 0, max: 0 };
    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices)
    };
  };
  const { min: minPrice, max: maxPrice } = getMinMaxPrices();

  // Countdown timer calculation to 1 August 2026 (20:30:00)
  useEffect(() => {
    const targetDate = new Date('2026-08-01T20:30:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // Monitor Scroll for Sticky Buy Ticket bar representation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-lime-400 selection:text-black font-sans relative overflow-x-hidden w-full">
      {/* Background Stylized Text Decoration */}
      <div className="absolute top-12 left-6 text-[180px] md:text-[280px] font-black opacity-[0.03] leading-none select-none tracking-tighter font-display italic pointer-events-none z-0">
        LIVE<br />TOUR<br />2026
      </div>

      {/* 1. Header component */}
      <Header />

      {/* 2. Hero Section utilizing the majestic custom image background */}
      <section 
        className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 py-20 sm:px-6 lg:px-8 text-center bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,1)), url(${heroPhoto})`,
        }}
        id="hero-section"
      >
        {/* Dynamic embers cinematic particle simulation overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
        
        {/* Ambient colored glowing highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[150px] bg-lime-400/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Decorative Graphic grid Lines (Matching theme aesthetic) */}
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none opacity-10 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-l from-lime-400/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-around">
            <div className="h-[1px] w-full bg-white/20" />
            <div className="h-[1px] w-full bg-white/20" />
            <div className="h-[1px] w-full bg-white/20" />
            <div className="h-[1px] w-full bg-white/20" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10 w-full">
          
          {/* Slogan pill credits */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 px-2"
          >
            <span className="px-3 sm:px-4 py-1.5 text-[8px] sm:text-[10px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.3em] bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded-full flex items-center justify-center gap-1 sm:gap-1.5 uppercase max-w-full text-center">
              <Flame className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-lime-400 animate-pulse shrink-0" /> TIGA JALANAN • TIGA KUASA • SATU TAKDIR
            </span>
          </motion.div>

          {/* Epic Main Typography Header */}
          <div className="space-y-3 px-2">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-6xl sm:text-8xl md:text-9xl font-display leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-lime-400 font-extrabold italic"
            >
              3VETO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-[9px] sm:text-xs md:text-base font-black tracking-[0.15em] sm:tracking-[0.4em] uppercase font-mono text-lime-400 leading-relaxed max-w-full"
            >
              WINGS • SEARCH • XPDC — <span className="text-white">LIVE AT MEGASTAR ARENA</span>
            </motion.p>
          </div>

          {/* Event description summary */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed opacity-90"
          >
            Saksikan legenda agung rock kapak tanah air bergabung dalam satu panggung melakar sejarah pelayaran 
            teragung. Alami malam muzik penuh magis, kepuasan emosi lirik cinta raungan sayu, dan riffs gitar distorsi berat meletuskan dewan!
          </motion.p>

          {/* Interactive Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-neutral-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 inline-grid grid-cols-4 gap-4 md:gap-6 w-full max-w-lg mx-auto shadow-2xl"
          >
            {[
              { label: 'HARI', value: timeLeft.days },
              { label: 'JAM', value: timeLeft.hours },
              { label: 'MINIT', value: timeLeft.minutes },
              { label: 'SAAT', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-black text-lime-400 tracking-tighter italic">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest font-bold">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Quick core specs (Date, Venue) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-neutral-300 bg-neutral-900/80 py-3.5 px-5 rounded-xl border border-neutral-800 w-full max-w-[92vw] sm:max-w-none sm:w-max mx-auto shadow-lg"
          >
            <div className="flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-neutral-800 pb-2 sm:pb-0 sm:pr-6 font-bold">
              <Calendar className="w-4 h-4 text-lime-400" />
              <span>{CONCERT_DETAILS.date} • {CONCERT_DETAILS.time}</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span>{CONCERT_DETAILS.venue}</span>
            </div>
          </motion.div>

          {/* Major Hero Action Trigger Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a
              href={CONCERT_DETAILS.ticketLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-lime-400 hover:bg-lime-300 text-black font-display font-black tracking-wider uppercase rounded-xl shadow-xl shadow-lime-400/20 transition-all hover:scale-[1.03] text-xs inline-flex items-center justify-center gap-3 italic"
              id="btn-hero-major-buy"
            >
              <Ticket className="w-4.5 h-4.5" /> BELI TIKET SEKARANG 🎫
            </a>

            <a
              href="#seating-section"
              className="w-full sm:w-auto px-8 py-5 bg-transparent hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-mono rounded-xl text-xs transition-all inline-block uppercase font-bold tracking-wider"
              id="btn-hero-secondary-map"
            >
              PETA DEWAN / ZON HARGA
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Navigation Shortcuts Jump Anchor Bar */}
      <nav className="sticky top-0 z-40 bg-neutral-950/95 border-b border-neutral-900 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 sm:gap-10 overflow-x-auto whitespace-nowrap scrollbar-none text-[11px] font-mono tracking-widest font-bold text-neutral-400">
          <a href="#bands-section" className="hover:text-lime-400 transition-colors">🎸 LINEUP LEGEND</a>
          <a href="#seating-section" className="hover:text-lime-400 transition-colors">🏟️ PELAN DEWAN</a>
        </div>
      </nav>

      {/* 4. Core Interactive Sections Layout Container */}
      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-16 pb-4 space-y-6 relative">
        
        {/* Decorative ambient visual background icons */}
        <div className="absolute top-[8%] left-[2%] opacity-[0.015] pointer-events-none transform -rotate-12">
          <Music className="w-96 h-96 text-white" />
        </div>
        <div className="absolute bottom-[20%] right-[3%] opacity-[0.015] pointer-events-none transform rotate-12">
          <Volume2 className="w-[450px] h-[450px] text-white" />
        </div>

        {/* SECTION A: Bands Lineup Showcase */}
        <section className="scroll-mt-24">
          <BandSection bands={bands} />
        </section>

        {/* SECTION B: SeatingPlan & Ticketing details */}
        <section className="scroll-mt-24">
          <SeatingPlan ticketTiers={ticketTiers} />
        </section>

      </main>

      {/* 5. Footer branding, info and rules */}
      <Footer />

      {/* 6. Sticky Smart Booking Action Bar (Saves conversions!) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-neutral-950/95 border-t border-lime-400/30 py-4 px-4 backdrop-blur-md shadow-2xl flex items-center justify-between gap-4 max-w-4xl mx-auto sm:rounded-t-2xl sm:bottom-4 sm:border sm:px-6"
          >
            <div className="hidden sm:flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-lime-400 rounded-full animate-ping" />
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wider font-bold">KONSERT SENSASI 3 VETO:</span>
                <span className="text-xs font-bold font-sans text-white block">WINGS • XPDC • SEARCH — Megastar Arena, KL</span>
              </div>
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
              <div className="flex justify-between sm:justify-end items-center gap-3">
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">HARGA TIKET:</span>
                <span className="text-sm font-bold font-mono text-lime-400 sm:text-base whitespace-nowrap">RM {minPrice.toFixed(2)} - RM {maxPrice.toFixed(2)}</span>
              </div>
              
              <a
                href={CONCERT_DETAILS.ticketLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-6 py-2 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-xs tracking-wider uppercase rounded-lg shadow-lg transition-colors"
                id="btn-sticky-ticker-buy"
              >
                BELI TIKET 🎫
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Admin Panel for managing photos, descriptions and band details */}
      <AdminPanel 
        heroPhoto={heroPhoto} 
        setHeroPhoto={setHeroPhoto} 
        bands={bands} 
        setBands={setBands} 
        ticketTiers={ticketTiers}
        setTicketTiers={setTicketTiers}
      />
    </div>
  );
}

