import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Save, X, RefreshCw, Plus, Trash2, Image, FileText, Users, Award, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Band, TicketTier } from '../types';
import { BANDS, TICKET_TIERS } from '../data';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AdminPanelProps {
  heroPhoto: string;
  setHeroPhoto: (url: string) => void;
  bands: Band[];
  setBands: (bands: Band[]) => void;
  ticketTiers: TicketTier[];
  setTicketTiers: (tiers: TicketTier[]) => void;
}

export default function AdminPanel({ 
  heroPhoto, 
  setHeroPhoto, 
  bands, 
  setBands,
  ticketTiers,
  setTicketTiers
}: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Administrative edits state
  const [tempHero, setTempHero] = useState(heroPhoto);
  const [tempBands, setTempBands] = useState<Band[]>([]);
  const [tempTicketTiers, setTempTicketTiers] = useState<TicketTier[]>([]);
  const [activeBandId, setActiveBandId] = useState<string>('search');
  const [newMemberName, setNewMemberName] = useState('');

  // Subscribe to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // Synchronize when panel opens or props change
  useEffect(() => {
    if (isOpen) {
      setTempHero(heroPhoto);
      setTempBands(JSON.parse(JSON.stringify(bands))); // Deep copy
      setTempTicketTiers(JSON.parse(JSON.stringify(ticketTiers))); // Deep copy
    }
  }, [isOpen, heroPhoto, bands, ticketTiers]);

  // If signed in as the matching admin, unlock the board instantly
  useEffect(() => {
    if (currentUser?.email === 'nubiz.artwork.studio@gmail.com') {
      setIsUnlocked(true);
    }
  }, [currentUser]);

  // Handle email/password login
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setPasswordError('Sila masukkan emel dan kata laluan.');
      return;
    }
    
    setIsLoading(true);
    setPasswordError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsUnlocked(true);
    } catch (error: any) {
      console.error("Login failed:", error);
      setPasswordError('Log masuk gagal. Sila semak emel dan kata laluan anda.');
      setIsUnlocked(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Restore session state on mount
  useEffect(() => {
    if (sessionStorage.getItem('3veto_admin_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      alert('Pendaftaran Google gagal: ' + err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Google Sign-Out failed:', err);
    }
  };

  const handleSave = async () => {
    // 1. Save Hero background
    setHeroPhoto(tempHero);
    localStorage.setItem('3veto_hero_photo', tempHero);

    // 2. Save Bands configuration
    setBands(tempBands);
    localStorage.setItem('3veto_bands', JSON.stringify(tempBands));

    // 3. Save Ticket Tiers configuration
    setTicketTiers(tempTicketTiers);
    localStorage.setItem('3veto_ticket_tiers', JSON.stringify(tempTicketTiers));

    // 4. Save to Firestore if Admin
    if (currentUser?.email === 'nubiz.artwork.studio@gmail.com') {
      const targetPath = 'settings/config';
      try {
        await setDoc(doc(db, 'settings', 'config'), {
          heroPhoto: tempHero,
          bands: tempBands,
          ticketTiers: tempTicketTiers
        });
        alert('Konfigurasi berjaya dikemaskini sepenuhnya pada Awan Firestore & Tempatan! ☁️✅');
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.WRITE, targetPath);
        } catch (typedErr: any) {
          alert('Gagal simpan ke Awan: ' + typedErr.message);
        }
      }
    } else {
      alert('Konfigurasi disimpan secara Tempatan sahaja. Sila log masuk dengan Google Admin untuk penyegerakan real-time Firestore ⚠️');
    }

    setIsOpen(false);
  };

  const handleReset = async () => {
    if (window.confirm('Adakah anda pasti mahu set semula semua foto hero, butiran kumpulan, dan harga tiket ke tetapan asal kilang?')) {
      const defaultHero = "https://arleta.site/interactivelink/3025/3veto.jpeg";
      setTempHero(defaultHero);
      setHeroPhoto(defaultHero);
      localStorage.removeItem('3veto_hero_photo');

      setTempBands(JSON.parse(JSON.stringify(BANDS)));
      setBands(BANDS);
      localStorage.removeItem('3veto_bands');

      setTempTicketTiers(JSON.parse(JSON.stringify(TICKET_TIERS)));
      setTicketTiers(TICKET_TIERS);
      localStorage.removeItem('3veto_ticket_tiers');

      if (currentUser?.email === 'nubiz.artwork.studio@gmail.com') {
        const targetPath = 'settings/config';
        try {
          await setDoc(doc(db, 'settings', 'config'), {
            heroPhoto: defaultHero,
            bands: BANDS,
            ticketTiers: TICKET_TIERS
          });
          alert('Semua tetapan telah diset semula ke konfigurasi asal pada Awan & Tempatan! ☁️🔄');
        } catch (err) {
          try {
            handleFirestoreError(err, OperationType.WRITE, targetPath);
          } catch (typedErr: any) {
            alert('Gagal set semula di Awan: ' + typedErr.message);
          }
        }
      } else {
        alert('Semua tetapan telah diset semula ke konfigurasi asal secara Tempatan.');
      }
    }
  };

  // Find currently active band being edited
  const activeBand = tempBands.find(b => b.id === activeBandId);

  const updateActiveBandField = (field: keyof Band, value: any) => {
    if (!activeBand) return;
    setTempBands(prev => prev.map(band => {
      if (band.id === activeBandId) {
        return { ...band, [field]: value };
      }
      return band;
    }));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBand || !newMemberName.trim()) return;

    const updatedMembers = [...activeBand.memberNames, newMemberName.trim()];
    updateActiveBandField('memberNames', updatedMembers);
    
    // Automatically increment totalMembers if it matched or is less than the names array
    const currentTotal = activeBand.totalMembers || activeBand.memberNames.length;
    if (updatedMembers.length > currentTotal) {
      updateActiveBandField('totalMembers', updatedMembers.length);
    }

    setNewMemberName('');
  };

  const handleRemoveMember = (indexToRemove: number) => {
    if (!activeBand) return;
    const updatedMembers = activeBand.memberNames.filter((_, idx) => idx !== indexToRemove);
    updateActiveBandField('memberNames', updatedMembers);

    // Automatically decrement totalMembers if it is higher than the remaining names
    const currentTotal = activeBand.totalMembers || activeBand.memberNames.length;
    if (currentTotal > updatedMembers.length) {
      updateActiveBandField('totalMembers', Math.max(0, updatedMembers.length));
    }
  };

  return (
    <>
      {/* Floating Discrete Admin Button at bottom corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-lime-400 border border-neutral-800 hover:border-lime-500/50 rounded-full transition-all duration-300 shadow-xl flex items-center gap-1.5 focus:outline-none cursor-pointer"
        id="btn-admin-access-open"
        title="Admin Access Panel"
      >
        <Lock className="w-4.5 h-4.5" />
        <span className="text-[10px] font-mono font-bold tracking-wider hidden sm:inline">URUS / ADMIN</span>
      </button>

      {/* Admin Panel Overlay Drawer/Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
              id="admin-module-container"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-1 px-2 text-[8px] font-mono font-black bg-lime-400/10 text-lime-400 border border-lime-400/25 rounded uppercase">
                    ROOT SHELL
                  </span>
                  <h3 className="text-lg font-display font-black text-white italic tracking-tight uppercase">
                    Sistem Pengurusan Konsert (Admin)
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  id="btn-admin-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Security Barrier: Password Input */}
              {!isUnlocked ? (
                <div className="flex-grow p-4 sm:p-8 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
                  <div className="w-16 h-16 bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/20 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-lime-400 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-display font-black text-xl italic uppercase">Gated Administrator Portal</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Sila masukkan emel dan kata laluan Google untuk mendapatkan akses keselamatan Firebase Penuh. Pengesahan Google Popup juga disediakan di bawah.
                    </p>
                  </div>

                  <form onSubmit={handleUnlock} className="w-full space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Emel Pentadbir (Admin)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3.5 pl-4 pr-12 bg-neutral-950 border border-neutral-800 rounded-xl text-sm font-mono text-center tracking-widest text-lime-400 focus:outline-none focus:border-lime-500 transition-colors placeholder:text-neutral-700 font-bold"
                        autoFocus
                        id="input-admin-email"
                      />
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Kata Laluan"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3.5 pl-4 pr-12 bg-neutral-950 border border-neutral-800 rounded-xl text-sm font-mono text-center tracking-widest text-lime-400 focus:outline-none focus:border-lime-500 transition-colors placeholder:text-neutral-700 font-bold"
                        id="input-admin-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {passwordError && (
                      <p className="text-xs font-mono text-red-400 font-bold animate-shake bg-red-950/20 py-1 rounded border border-red-500/10">
                        ⚠️ {passwordError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      id="btn-admin-unlock-submit"
                    >
                      {isLoading ? 'MENGESAHKAN...' : 'SAHKAN AKSES SECURE'}
                    </button>
                  </form>

                  <div className="relative flex py-2 items-center w-full">
                    <div className="flex-grow border-t border-neutral-800"></div>
                    <span className="flex-shrink mx-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Atau</span>
                    <div className="flex-grow border-t border-neutral-800"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-sans text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01]"
                    id="btn-admin-google-signin"
                  >
                    <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Masuk Sebagai Admin Google
                  </button>
                </div>
              ) : (
                /* Unlocked Admin Workspace Layout */
                <>
                  {/* Google Status Header Info */}
                  <div className="px-6 md:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs bg-neutral-950/60 border-b border-neutral-800">
                    <div className="flex items-center gap-2 py-1">
                      <span className={`w-2 h-2 rounded-full ${currentUser?.email === 'nubiz.artwork.studio@gmail.com' ? 'bg-lime-400 animate-pulse' : 'bg-yellow-500 animate-pulse'}`} />
                      <span className="text-neutral-400 font-mono text-[10px]">
                        Penyegar Awan: {currentUser ? (
                          <>Disambung sebagai <span className={currentUser.email === 'nubiz.artwork.studio@gmail.com' ? "text-lime-400 font-bold" : "text-yellow-500 font-bold"}>{currentUser.email}</span>{currentUser.email === 'nubiz.artwork.studio@gmail.com' ? ' (Admin)' : ' (Bukan Admin)'}</>
                        ) : (
                          <span className="text-yellow-500 font-bold">Mod Tempatan Sahaja (Log Masuk Diperlukan Untuk Segerak Firestore)</span>
                        )}
                      </span>
                    </div>
                    {currentUser ? (
                      <button 
                        onClick={handleSignOut}
                        type="button"
                        className="py-1 px-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 text-[10px] font-mono font-bold uppercase rounded border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                      >
                        Keluar Akaun
                      </button>
                    ) : (
                      <button 
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="py-1 px-3 bg-lime-400 hover:bg-lime-300 text-black text-[10px] font-mono font-bold uppercase rounded transition-colors cursor-pointer font-black"
                      >
                        Log Masuk Google Admin 🔑
                      </button>
                    )}
                  </div>
                  <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
                    {/* General Settings Section (Hero Photo URL) */}
                    <div className="bg-neutral-950/50 p-5 rounded-2xl border border-neutral-850 space-y-4">
                      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                        <Image className="w-4 h-4 text-lime-400" />
                        <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
                          Konfigurasi Halaman Utama (Hero Page)
                        </h4>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-mono text-neutral-400 font-bold block">
                          URL GAMBAR BACKGROUND HERO (HERO PHOTO):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tempHero}
                            onChange={(e) => setTempHero(e.target.value)}
                            className="flex-grow p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 focus:outline-none focus:border-neutral-700"
                            placeholder="Sila masukkan URL imej hero..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const promptVal = prompt('Tampal URL Hero Baru:', tempHero);
                              if (promptVal) setTempHero(promptVal);
                            }}
                            className="px-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] font-mono font-bold text-neutral-300 hover:bg-neutral-800"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-mono">
                          *Sila pastikan URL imej adalah sah dan menyokong protokol HTTPS. Pratonton langsung akan dimuatkan di latar belakang.
                        </p>
                      </div>
                    </div>

                    {/* Band Showcase Customizer (Search, Wings, XPDC) */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-lime-400" />
                          <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase font-bold">
                            Konfigurasi Tiga Gergasi Rock (Band Section)
                          </h4>
                        </div>

                        {/* Quick Band Selector Tab */}
                        <div className="flex flex-wrap gap-1 sm:justify-end w-full sm:w-auto">
                          {tempBands.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => {
                                setActiveBandId(b.id);
                                setNewMemberName('');
                              }}
                              className={`px-3 py-1 text-[10px] font-mono font-black rounded uppercase border transition-all ${
                                activeBandId === b.id
                                  ? 'bg-neutral-800 text-white border-lime-400'
                                  : 'bg-neutral-950 border-neutral-850 text-neutral-500 hover:text-neutral-300'
                              }`}
                            >
                              {b.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {activeBand ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950/60 p-4 sm:p-6 rounded-2xl border border-neutral-850">
                          {/* Image and Captain block */}
                          <div className="md:col-span-5 space-y-4">
                            <h5 className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wider mb-2">
                              Visual & Deskripsi Foto
                            </h5>

                            {/* Image field */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase block">
                                URL FOTO KUMPULAN ({activeBand.name}):
                              </label>
                              <input
                                type="text"
                                value={activeBand.image || ''}
                                onChange={(e) => updateActiveBandField('image', e.target.value)}
                                className="w-full p-2.5 bg-neutral-950 border border-neutral-805 text-xs font-mono text-neutral-300 rounded-lg focus:outline-none focus:border-neutral-700"
                                placeholder="Tampal URL gambar di sini..."
                              />
                            </div>

                            {/* Image Preview Window */}
                            {activeBand.image && (
                              <div className="w-full aspect-video rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 relative">
                                <img
                                  src={activeBand.image}
                                  alt={activeBand.name}
                                  className="w-full h-full object-cover contrast-105"
                                  referrerPolicy="referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                              </div>
                            )}

                            {/* Photo subtitle description aka photoDescription */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase block">
                                KAPSyen / DESKRIPSI MAKLUMAT FOTO:
                              </label>
                              <textarea
                                value={activeBand.photoDescription || ''}
                                onChange={(e) => updateActiveBandField('photoDescription', e.target.value)}
                                rows={2}
                                className="w-full p-2.5 bg-neutral-950 border border-neutral-805 text-xs font-sans text-neutral-300 rounded-lg focus:outline-none focus:border-neutral-700 resize-none font-medium"
                                placeholder="Contoh: Sesi latihan studio penjelajahan legenda..."
                              />
                            </div>
                          </div>

                          {/* Member and total statistics customization */}
                          <div className="md:col-span-7 space-y-5">
                            <h5 className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                              <span>Barisan Ahli Kumpulan & Perangkaan</span>
                              <span className="text-[9px] text-lime-400 font-mono">Dynamic Node</span>
                            </h5>



                            {/* Member Names list customizer */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                                  SENARAI NAMA AHLI AKTIF ({activeBand.memberNames.length}):
                                </span>
                                <span className="text-[8px] font-mono text-neutral-500">
                                  Urus Pahlawan Konsert
                                </span>
                              </div>

                              {/* Form to append a new member name */}
                              <form onSubmit={handleAddMember} className="flex flex-col sm:flex-row gap-2">
                                <input
                                  type="text"
                                  value={newMemberName}
                                  onChange={(e) => setNewMemberName(e.target.value)}
                                  className="flex-grow p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-sans text-neutral-300 focus:outline-none focus:border-neutral-700 min-w-0"
                                  placeholder="Nama pemain (cbe: Kid (Guitar Utama))"
                                />
                                <button
                                  type="submit"
                                  className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                                >
                                  <Plus className="w-4 h-4 shrink-0" /> TAMBAH
                                </button>
                              </form>

                              {/* Interactive list with Delete indices triggers */}
                              <div className="space-y-1.5 max-h-[160px] overflow-y-auto border border-neutral-850 bg-neutral-950 p-2.5 rounded-xl">
                                {activeBand.memberNames.length === 0 ? (
                                  <div className="text-center py-6 text-neutral-600 text-[10px] font-mono font-bold uppercase">
                                    Tiada ahli ditemui. Sila tambah di atas.
                                  </div>
                                ) : (
                                  activeBand.memberNames.map((member, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between gap-3 p-1.5 px-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-800 rounded-md transition-all focus-within:border-lime-500/50 group"
                                    >
                                      <input
                                        type="text"
                                        value={member}
                                        onChange={(e) => {
                                          const updated = [...activeBand.memberNames];
                                          updated[index] = e.target.value;
                                          updateActiveBandField('memberNames', updated);
                                        }}
                                        className="flex-grow bg-transparent text-xs font-sans text-neutral-300 focus:outline-none focus:text-lime-400 border-none p-0"
                                        placeholder="Nama ahli"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveMember(index)}
                                        className="text-neutral-500 hover:text-red-400 p-1 opacity-80 hover:opacity-100 transition-colors shrink-0 cursor-pointer"
                                        title="Buang ahli"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>

                            {/* DEMO RIFF PILIHAN CUSTOMIZER */}
                            <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                                  DEMO RIFF PILIHAN ({activeBand.famousSongs?.length || 0}):
                                </span>
                                <span className="text-[8px] font-mono text-neutral-500">
                                  Kemaskini Demo Lagu Kumpulan
                                </span>
                              </div>

                              <div className="space-y-2.5 max-h-[220px] overflow-y-auto border border-neutral-850 bg-neutral-950 p-2.5 rounded-xl">
                                {(!activeBand.famousSongs || activeBand.famousSongs.length === 0) ? (
                                  <div className="text-center py-6 text-neutral-600 text-[10px] font-mono font-bold uppercase">
                                    Tiada lagu demo ditemui.
                                  </div>
                                ) : (
                                  activeBand.famousSongs.map((song, songIdx) => (
                                    <div key={songIdx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-neutral-900 border border-neutral-850 hover:border-neutral-800 p-2.5 rounded-lg transition-all focus-within:border-lime-500/30">
                                      <div className="md:col-span-8 flex flex-col gap-1">
                                        <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase">Tajuk Lagu {songIdx + 1}:</span>
                                        <input
                                          type="text"
                                          value={song.title}
                                          onChange={(e) => {
                                            const updatedSongs = [...activeBand.famousSongs];
                                            updatedSongs[songIdx] = { ...updatedSongs[songIdx], title: e.target.value };
                                            updateActiveBandField('famousSongs', updatedSongs);
                                          }}
                                          className="w-full bg-transparent text-xs font-sans text-neutral-300 focus:outline-none focus:text-lime-400 border-b border-neutral-800 focus:border-neutral-700 pb-0.5"
                                          placeholder="Masukkan tajuk lagu demo"
                                        />
                                      </div>
                                      <div className="md:col-span-4 flex flex-col gap-1">
                                        <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase">Tahun Keluaran:</span>
                                        <input
                                          type="text"
                                          value={song.year}
                                          onChange={(e) => {
                                            const updatedSongs = [...activeBand.famousSongs];
                                            updatedSongs[songIdx] = { ...updatedSongs[songIdx], year: e.target.value };
                                            updateActiveBandField('famousSongs', updatedSongs);
                                          }}
                                          className="w-full bg-transparent text-xs font-mono text-neutral-300 focus:outline-none focus:text-lime-400 border-b border-neutral-800 focus:border-neutral-700 pb-0.5"
                                          placeholder="Tahun"
                                        />
                                      </div>
                                      <div className="md:col-span-12 flex flex-col gap-1 pt-1.5 border-t border-neutral-850/60">
                                        <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase">Pautan Fail MP3 (URL):</span>
                                        <input
                                          type="text"
                                          value={song.mp3Url || ''}
                                          onChange={(e) => {
                                            const updatedSongs = [...activeBand.famousSongs];
                                            updatedSongs[songIdx] = { ...updatedSongs[songIdx], mp3Url: e.target.value };
                                            updateActiveBandField('famousSongs', updatedSongs);
                                          }}
                                          className="w-full bg-transparent text-[11px] font-mono text-lime-400 focus:outline-none placeholder:text-neutral-700 border-b border-neutral-800 focus:border-neutral-700 pb-0.5"
                                          placeholder="https://fail-audio.com/lagu-demo.mp3"
                                        />
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Ticket Price & Zone Category Customizer */}
                    <div className="space-y-4 bg-neutral-950/40 p-5 rounded-2xl border border-neutral-850">
                      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                        <Award className="w-4 h-4 text-lime-400" />
                        <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
                          Ubah Kategori & Harga Tiket (Zon Konsert)
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tempTicketTiers.map((tier, idx) => (
                          <div 
                            key={tier.id} 
                            className="bg-neutral-900 border border-neutral-850 hover:border-neutral-800 p-4 rounded-xl space-y-3 transition-colors flex flex-col justify-between"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-3 h-3 rounded bg-gradient-to-br ${tier.color} shrink-0`} />
                              <div>
                                <h5 className="text-xs font-mono font-bold text-white tracking-widest uppercase truncate max-w-[240px]">
                                  {tier.name.split(' (')[0]}
                                </h5>
                                <p className="text-[10px] text-neutral-500 font-sans mt-0.5">
                                  {tier.level} • {tier.type}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                                  EARLY BIRD (RM):
                                </label>
                                <input
                                  type="number"
                                  value={tier.earlyBirdPrice !== undefined ? tier.earlyBirdPrice : tier.price}
                                  onChange={(e) => {
                                    const valStr = e.target.value;
                                    const val = valStr === '' ? 0 : Math.max(0, parseFloat(valStr) || 0);
                                    setTempTicketTiers(prev => prev.map((t, tIdx) => {
                                      if (tIdx === idx) {
                                        return { ...t, earlyBirdPrice: val, price: val };
                                      }
                                      return t;
                                    }));
                                  }}
                                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-lime-400 focus:outline-none focus:border-neutral-700"
                                  min="0"
                                  step="0.01"
                                />
                              </div>

                              <div>
                                <label className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                                  NORMAL (RM):
                                </label>
                                <input
                                  type="number"
                                  value={tier.normalPrice !== undefined ? tier.normalPrice : tier.price}
                                  onChange={(e) => {
                                    const valStr = e.target.value;
                                    const val = valStr === '' ? 0 : Math.max(0, parseFloat(valStr) || 0);
                                    setTempTicketTiers(prev => prev.map((t, tIdx) => {
                                      if (tIdx === idx) {
                                        return { ...t, normalPrice: val };
                                      }
                                      return t;
                                    }));
                                  }}
                                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 focus:outline-none focus:border-neutral-700"
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        *Sebarang perubahan harga tiket akan dikemaskini secara langsung pada peta dewan pendaratan jualan serta panel butiran tiket.
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar Footer Controls */}
                  <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleReset}
                      type="button"
                      className="w-full sm:w-auto px-5 py-3 hover:bg-red-500/10 text-red-400 border border-red-500/15 hover:border-red-500/30 font-mono text-xs font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id="btn-admin-factory-reset"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Set Semula Ke Asal
                    </button>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="w-1/2 sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800 font-sans text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                      
                      <button
                        onClick={handleSave}
                        type="button"
                        className="w-1/2 sm:w-auto px-7 py-3 bg-lime-400 hover:bg-lime-300 text-black font-display font-black text-xs tracking-wider uppercase rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
                        id="btn-admin-save-all"
                      >
                        <Save className="w-4 h-4" /> SIMPAN PINDAAN 💾
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
