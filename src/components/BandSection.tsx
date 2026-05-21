import React, { useState } from 'react';
import { Sparkles, Calendar, User, Music, Headphones, Flame, Play, Disc, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BANDS } from '../data';
import { Band } from '../types';

interface BandSectionProps {
  bands?: Band[];
}

export default function BandSection({ bands = BANDS }: BandSectionProps) {
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const currentAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const timeoutRef = React.useRef<any | null>(null);

  React.useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Custom synth sequencer or real MP3 player to play a classic rock intro lick for each band!
  const playRiff = (bandId: string, songTitle: string) => {
    const songId = `${bandId}-${songTitle}`;
    
    // Toggle play/pause if clicking the currently playing song
    if (playingSongId === songId) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setPlayingSongId(null);
      return;
    }

    // Stop and clear previous playback
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPlayingSongId(songId);

    // Find the song configuration
    const bandData = bands.find(b => b.id === bandId);
    const songData = bandData?.famousSongs.find(s => s.title === songTitle);

    // If there is an MP3 file link custom-defined, play the real MP3!
    if (songData?.mp3Url && songData.mp3Url.trim() !== '') {
      try {
        const audio = new Audio(songData.mp3Url.trim());
        currentAudioRef.current = audio;
        
        audio.play().catch(err => {
          console.error('Failed to play custom MP3 URL:', err);
          // Fallback to synth if user supplied an invalid or blockable URL
          playSynthFallback(bandId);
        });

        audio.onended = () => {
          if (currentAudioRef.current === audio) {
            setPlayingSongId(null);
          }
        };

        audio.onerror = () => {
          console.error('Audio playback error on custom MP3 URL');
          if (currentAudioRef.current === audio) {
            setPlayingSongId(null);
          }
        };
      } catch (err) {
        console.error('Failed to initialize Audio element:', err);
        playSynthFallback(bandId);
      }
    } else {
      playSynthFallback(bandId);
    }
  };

  const playSynthFallback = (bandId: string) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const playFreq = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const mainGain = ctx.createGain();
        const distortion = ctx.createWaveShaper();
        
        // Simple overdrive wave
        const makeDistortionCurve = (amount: number) => {
          const k = amount;
          const n_samples = 44100;
          const curve = new Float32Array(n_samples);
          const deg = Math.PI / 180;
          for (let i = 0; i < n_samples; ++i) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
          }
          return curve;
        };
        
        distortion.curve = makeDistortionCurve(50);
        distortion.oversample = '4x';
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        
        // Slightly detune to sound fuller
        osc.detune.setValueAtTime(-5, ctx.currentTime + start);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime + start);
        
        // Envelope
        mainGain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        mainGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + start + 0.05);
        mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration - 0.05);
        
        osc.connect(distortion);
        distortion.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play customized 4-note melodic rock hooks!
      if (bandId === 'search') {
        // "Isabella" style: Am -> G -> F (E4 -> G4 -> A4 -> E4)
        playFreq(329.63, 0.0, 0.4); // E4
        playFreq(392.00, 0.4, 0.4); // G4
        playFreq(440.00, 0.8, 0.4); // A4
        playFreq(329.63, 1.2, 0.8); // E4
      } else if (bandId === 'wings') {
        // "Sejati" style: (A4 -> B4 -> C5 -> B4 -> A4)
        playFreq(440.00, 0.0, 0.35); // A4
        playFreq(493.88, 0.35, 0.35); // B4
        playFreq(523.25, 0.7, 0.45); // C5
        playFreq(493.88, 1.15, 0.35); // B4
        playFreq(440.00, 1.5, 0.75); // A4
      } else {
        // "Semangat Yang Hilang": heavy low riffs (D3 -> E3 -> F3 -> D3)
        playFreq(146.83, 0.0, 0.35); // D3
        playFreq(164.81, 0.35, 0.35); // E3
        playFreq(174.61, 0.7, 0.45); // F3
        playFreq(146.83, 1.15, 0.8);  // D3
      }
      
    } catch (e) {
      console.error('Audio synthesizer interrupted', e);
    }

    // Automatically reset playing icon visual after 2.3 seconds
    timeoutRef.current = setTimeout(() => {
      setPlayingSongId(null);
      timeoutRef.current = null;
    }, 2300);
  };

  return (
    <div id="bands-section" className="space-y-8">
      {/* Intro info heading */}
      <div className="text-center">
        <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-[0.2em] bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded-full inline-flex items-center gap-1.5 uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-lime-400" /> BARISAN PEJUANG SENI / LINEUP
        </span>
        <h3 className="text-4xl font-display font-black text-white tracking-tighter uppercase italic mt-3">
          Tiga Gergasi Rock Kapak
        </h3>
        <p className="text-xs text-neutral-400 max-w-xl mx-auto mt-1 leading-relaxed font-sans first-letter:uppercase">
          Saksikan gandingan paling bersejarah dekad ini di mana Search, Wings, dan XPDC berkongsi panggung yang sama untuk menunaikan impian peminat sejati.
        </p>
      </div>

      {/* Main Band Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {bands.map((band) => {
          return (
            <motion.div
              key={band.id}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between p-6 bg-neutral-900/95 border border-neutral-850 rounded-2xl transform transition-all duration-300 overflow-hidden shadow-lg"
              id={`card-band-${band.id}`}
            >
              {/* Dynamic decorative backdrop radial overlay */}
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${band.accentColor}, transparent 65%)`
                }}
              />
              
              {/* Top Section */}
              <div className="relative z-10 space-y-4">
                {/* Band Photo */}
                {band.image && (
                  <div className="space-y-1.5">
                    <div className="w-full aspect-[5/7] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/80 relative group/photo shadow-inner">
                      <img 
                        src={band.image} 
                        alt={band.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105 grayscale-0 sm:grayscale sm:group-hover:grayscale-0 contrast-[1.05] brightness-100 sm:brightness-[0.95] sm:group-hover:brightness-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    {band.photoDescription && (
                      <p className="text-[10px] text-neutral-400 font-mono italic px-1 text-center bg-neutral-950/30 py-1 rounded">
                        📸 {band.photoDescription}
                      </p>
                    )}
                  </div>
                )}

                {/* Logo & ID label */}
                <div className="flex items-center justify-between">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-black border text-lg transition-all"
                    style={{ 
                      borderColor: `${band.accentColor}40`,
                      backgroundColor: `${band.accentColor}12`,
                      color: band.accentColor,
                      textShadow: `0 0 10px ${band.accentColor}20`
                    }}
                  >
                    {band.logo}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 uppercase">
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ backgroundColor: band.accentColor }}
                    />
                    AKTIF KONSERT
                  </div>
                </div>

                {/* Name & Theme slogan */}
                <div>
                  <h4 className="text-2xl font-black text-white tracking-tight font-sans transition-all duration-200">
                    {band.name}
                  </h4>
                  <p 
                    className="text-xs font-semibold italic mt-1 font-mono uppercase"
                    style={{ color: band.accentColor }}
                  >
                    "{band.slogan}"
                  </p>
                </div>

                {/* Narrative description */}
                <p className="text-neutral-350 text-xs font-sans leading-relaxed">
                  {band.description}
                </p>

                {/* Metadata badges specs grid */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-4">
                  <div className="flex items-center gap-1 font-bold">
                    <Calendar className="w-3 h-3 text-neutral-500 shrink-0" />
                    <span className="truncate">Sejak: {band.established}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <User className="w-3 h-3 text-neutral-500 shrink-0" />
                    <span className="truncate">Vokal: {band.vocalist.split(' / ')[0]}</span>
                  </div>
                </div>

                {/* Live Member specifications lists */}
                <div className="space-y-1 bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">BARISAN PAHLAWAN KONSERT:</span>
                    <span className="text-[8px] font-mono text-neutral-400 bg-neutral-800 px-1 rounded">
                      {band.memberNames.length} nama
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {band.memberNames.map((mem, idx) => (
                      <span key={idx} className="text-[9px] font-sans px-1.5 py-0.5 bg-neutral-900 border border-neutral-850 rounded text-neutral-400">
                        {mem.split(' (')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Songs Trigger Panel */}
              <div className="relative z-10 mt-6 pt-5 border-t border-neutral-800/80">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-2.5 flex items-center gap-1">
                  <Music className="w-3 h-3 text-neutral-500" /> LAGU NOSTALGIA PILIHAN:
                </span>
                
                <div className="space-y-1.5">
                  {band.famousSongs.map((song, idx) => {
                    const isMelodyPlaying = playingSongId === `${band.id}-${song.title}`;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => playRiff(band.id, song.title)}
                        className={`w-full p-2 text-left rounded-lg bg-neutral-950/60 hover:bg-neutral-950 text-xs font-sans flex items-center justify-between border cursor-pointer group transition-all duration-200 ${
                          isMelodyPlaying ? 'border-lime-400 shadow shadow-lime-400/10' : 'border-neutral-850 hover:border-neutral-800'
                        }`}
                        id={`btn-song-${band.id}-${idx}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 flex items-center justify-center rounded-md ${
                            isMelodyPlaying ? 'bg-lime-400 text-black' : 'bg-neutral-900 text-neutral-500'
                          }`}>
                            {isMelodyPlaying ? (
                              <Disc className="w-3.5 h-3.5 animate-spin text-black" />
                            ) : (
                              <Play className="w-3 h-3 text-neutral-400 group-hover:text-white" />
                            )}
                          </div>
                          
                          <span className={`font-semibold ${isMelodyPlaying ? 'text-lime-400' : 'text-neutral-300'}`}>
                            {song.title}
                          </span>
                        </div>

                        <span className="text-[9px] font-mono text-neutral-500 group-hover:text-neutral-400 font-bold">
                          {song.year}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
