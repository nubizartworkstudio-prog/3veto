import React, { useState } from 'react';
import { CONCERT_DETAILS } from '../data';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  HelpCircle, 
  FileText, 
  ArrowUp, 
  X, 
  ShieldAlert, 
  CreditCard, 
  RefreshCw, 
  ShieldCheck, 
  Ban, 
  AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'peringatan' | 'pembayaran' | 'tiket' | 'refund' | 'protect' | 'reseller' | 'liabiliti';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('peringatan');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs: { id: TabType; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'peringatan', label: 'Peringatan Penting', icon: ShieldAlert },
    { id: 'pembayaran', label: 'Terma & Pembayaran', icon: CreditCard },
    { id: 'tiket', label: 'Pendaftaran & Tiket', icon: Ticket },
    { id: 'refund', label: 'Refund & Pertukaran', icon: RefreshCw },
    { id: 'protect', label: 'Refund Protect', icon: ShieldCheck },
    { id: 'reseller', label: 'Penjualan Semula', icon: Ban },
    { id: 'liabiliti', label: 'Liabiliti & Peraturan', icon: AlertTriangle },
  ];

  return (
    <footer className="relative z-10 w-full bg-neutral-950 border-t border-neutral-850 pt-12 pb-36 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-850">
          
          {/* Slogan details column */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white font-display font-black text-sm tracking-widest">KONSERT 3 VETO</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              Satu panggung, tiga pahlawan legenda rock, dan satu destinasi agung. Gabungan Wings, XPDC, dan Search dalam satu pelayaran suci 
              menyusuri takdir rock kapak terbesar alaf ini.
            </p>
            <div className="text-[10px] text-lime-400 font-mono italic font-bold">
              "Tiga Perjalanan. Tiga Kuasa. Satu Takdir."
            </div>
          </div>

          {/* Quick specs columns */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <h5 className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">INFO PELAYARAN KONSERT:</h5>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Hari Sabtu, 1 Ogos 2026 | 8:30 Malam</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Megastar Arena, Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>Agen Tiket: UberTickets Malaysia</span>
              </li>
            </ul>
          </div>

          {/* Ticketing policies column */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <h5 className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">POLISI PENONTON:</h5>
            <ul className="space-y-2 text-[11px] text-neutral-400">
              <li>• Had umur minimum masuk adalah 18 tahun dan ke atas.</li>
              <li>• Sila bawa Tiket Asal (PDF) & MyKad untuk tebus pergelangan tangan.</li>
              <li>• Semua jualan tiket adalah muktamad dan tiada refund/pembatalan.</li>
            </ul>
            <button
              onClick={() => {
                setActiveTab('peringatan');
                setIsModalOpen(true);
              }}
              className="mt-2 text-xs font-bold text-lime-400 hover:text-lime-300 underline inline-flex items-center gap-1 cursor-pointer transition-colors"
              id="btn-show-full-policy"
            >
              <FileText className="w-3.5 h-3.5" /> Lihat Terma & Polisi Penuh
            </button>
          </div>
        </div>

        {/* Bottom Credits & Legalities */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-[10px] font-mono text-neutral-500 font-bold">
              © {new Date().getFullYear()} Konsert 3 Veto. Hak Cipta Terpelihara.
            </p>
            <p className="text-[9px] text-neutral-600 font-sans">
              Segala imej, logo band (Search, Wings, XPDC), dan pautan tiket dimiliki sepenuhnya oleh penganjur dan artis yang berkaitan.
            </p>
          </div>

          {/* Back to top scroll button */}
          <button
            onClick={scrollToTop}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
            title="Kembali ke atas"
            id="btn-scroll-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULL POLICY DIALOG MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 sm:p-6" id="policy-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              id="policy-modal-backdrop"
            />
            
            {/* Dialog Panel Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-5xl h-[85vh] md:h-[75vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              id="policy-modal-card"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-neutral-950 border-b border-neutral-850 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-black text-white italic tracking-wide uppercase flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-lime-400" /> TERMA & POLISI ACARA UBERTIKETS
                  </h3>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase mt-0.5">
                    Harap maklum & baca dengan teliti terma kemasukan Konsert 3 Veto
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Tutup terma"
                  id="btn-close-policy-top"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body wrapper */}
              <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-neutral-900/60">
                
                {/* Tabs Sidebar (Left on desktop, top horizontals on mobile) */}
                <div className="w-full md:w-64 bg-neutral-950/40 border-r border-b md:border-b-0 border-neutral-850/80 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible md:overflow-y-auto whitespace-nowrap md:whitespace-normal shrink-0 scrollbar-none">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2.5 px-3 rounded-lg text-xs font-bold font-sans text-left flex items-center gap-2.5 transition-all cursor-pointer inline-flex md:w-full shrink-0 ${
                          isActive 
                            ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20 shadow-md' 
                            : 'text-neutral-450 hover:text-white border border-transparent hover:bg-neutral-850/30'
                        }`}
                        id={`btn-tab-${tab.id}`}
                      >
                        <TabIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-lime-400' : 'text-neutral-500'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Content Panel (Right / Bottom) */}
                <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto text-sm text-neutral-350 leading-relaxed font-sans">
                  
                  {activeTab === 'peringatan' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-lime-400 font-display font-bold uppercase tracking-wider text-base">
                        <ShieldAlert className="w-5 h-5 text-lime-400" /> PERINGATAN WAJIB
                      </div>
                      <div className="bg-lime-400/5 border border-lime-400/20 p-5 rounded-xl text-neutral-300 space-y-3">
                        <p className="font-semibold text-white">
                          • Sila pastikan anda membawa tiket asal (PDF) yang telah dibeli serta kad pengenalan yang sah (MyKad atau ID yang dikeluarkan oleh kerajaan) untuk penebusan gelang tangan.
                        </p>
                        <p className="text-red-400 font-bold uppercase tracking-wider">
                          • Screenshot tiket sama sekali tidak akan diterima untuk tujuan penebusan gelang tangan.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'pembayaran' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <CreditCard className="w-5 h-5 text-lime-400" /> TERMA & KAEDAH PEMBAYARAN
                      </div>
                      <ul className="space-y-4 text-neutral-300">
                        <li className="flex items-start gap-2.5">
                          <span className="text-lime-400 font-mono font-bold shrink-0 mt-0.5">•</span>
                          <span>
                            Laman ini menerima pembayaran menggunakan Kad Kredit atau Debit <strong>VISA & MASTERCARD, FPX, Touch 'N Go, GrabPay, Boost, MCash dan Shopback</strong>.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-lime-400 font-mono font-bold shrink-0 mt-0.5">•</span>
                          <span>
                            Untuk transaksi menggunakan kad, sila pastikan kad anda telah diaktifkan untuk transaksi atas talian dan antarabangsa sebelum melakukan transaksi pembelian.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-lime-400 font-mono font-bold shrink-0 mt-0.5">•</span>
                          <span>
                            Sekiranya pembayaran anda ditolak atau tidak disokong, sila hubungi pihak bank pengeluar kad anda untuk membenarkan transaksi tersebut dilakukan.
                          </span>
                        </li>
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'tiket' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <Ticket className="w-5 h-5 text-lime-400" /> PENDAFTARAN AKAUN & PEMBELIAN TIKET
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3.5 text-neutral-300 text-xs md:text-sm">
                        <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-850">
                          <p className="font-semibold text-white mb-1">Pendaftaran Maklumat:</p>
                          Pelanggan perlu mendaftar akaun UberTickets untuk membuat pembelian. Maklumat yang diberikan hendaklah lengkap, tepat dan terkini termasuk nama penuh, alamat e-mel, nombor telefon dan alamat surat-menyurat. Pelanggan bertanggungjawab sepenuhnya terhadap kerahsiaan akaun dan kata laluan mereka.
                        </div>

                        <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-850">
                          <p className="font-semibold text-white mb-1">Ralat Pembayaran & Sambungan Internet:</p>
                          Sekiranya anda tidak menerima e-mel pengesahan selepas atau semasa memasukkan maklumat pembayaran, atau mengalami sebarang ralat atau gangguan perkhidmatan, anda bertanggungjawab sepenuhnya untuk menyemak status melalui akaun UberTickets anda atau hubungi WhatsApp Khidmat Pelanggan kami segera. UberTickets tidak bertanggungjawab atas sebarang kerugian atau ketiadaan e-mel akibat gangguan sambungan internet penonton.
                        </div>

                        <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-850">
                          <p className="font-semibold text-white mb-1">Tiket Serta Wristband:</p>
                          <ul className="space-y-1.5 list-disc pl-4 text-neutral-450 text-xs text-neutral-300">
                            <li>Setiap tiket hanya sah untuk seorang sahaja. Maksimum 10 tiket bagi setiap transaksi akaun.</li>
                            <li>Semua tiket dikeluarkan secara elektronik (e-tiket). Simpan pengesahan tempahan anda dengan selamat.</li>
                            <li>Untuk tebusan pergelangan tangan (wristband), anda wajib menunjukkan e-tiket sah di kaunter. Ia hanya boleh diambil oleh pemegang atau pembeli tiket asal.</li>
                            <li>Pemegang bertanggungjawab penuh terhadap wristband. Gelang tangan yang hilang, rosak, atau dicuri tidak akan diganti atau dibayar balik.</li>
                          </ul>
                        </div>

                        <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-850">
                          <p className="font-semibold text-white mb-1">Kawalan & Larangan Keselamatan Tiket:</p>
                          <ul className="space-y-1.5 list-disc pl-4 text-neutral-400 text-xs text-neutral-300">
                            <li>Jangan memuat naik gambar atau butiran tiket anda di media sosial bagi mencegah pemalsuan oleh pihak ketiga. Kami tidak bertanggungjawab jika kemasukan anda ditolak kerana kod tiket telah ditebus.</li>
                            <li>Isu berkaitan kesahihan tiket atau tempat diletakkan hendaklah diselesaikan di Kaunter Tiket atau Box Office acara secara fizikal.</li>
                            <li>Akaun yang didapati menyalahi undang-undang atau menyalahgunakan perkhidmatan akan dilaporkan secara rasmi kepada pihak berkuasa.</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'refund' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <RefreshCw className="w-5 h-5 text-lime-400" /> PEMBAYARAN BALIK, PERTUKARAN & PENGGANTIAN
                      </div>
                      
                      <div className="space-y-4 text-neutral-300">
                        <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-850">
                          <p className="font-bold text-white mb-1">Hak Penganjur:</p>
                          Penganjur berhak untuk menangguhkan, membatalkan atau mengubah sebahagian atau keseluruhan acara pada bila-bila masa tanpa menanggung sebarang liabiliti terhadap kerugian atau kesulitan yang dialami. Sila sentiasa peka terhadap sebarang pengumuman rasmi daripada penganjur.
                        </div>

                        <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-850">
                          <p className="font-bold text-white mb-1">Jualan Muktamad:</p>
                          Semua jualan tiket adalah muktamad dan tidak akan dikembalikan kecuali sekiranya acara dibatalkan sepenuhnya oleh penganjur/pelaksana acara. Tiada bayaran balik atau pampasan diberikan kepada mereka yang lewat hadir ke acara.
                        </div>

                        <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-850">
                          <p className="font-bold text-white mb-1">Proses Bayaran Balik:</p>
                          Sekiranya bayaran balik diluluskan akibat pembatalan penuh penganjur, jumlah akan dipulangkan SELEPAS ditolak caj pemprosesan (jika berkenaan) terus ke akaun asal yang digunakan semasa pembelian. Proses ini mengambil masa sehingga <strong>30 HARI BEKERJA</strong> dari tarikh inisiatif bayaran balik.
                        </div>

                        <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-850">
                          <p className="font-bold text-white mb-1">Tanggungjawab Khidmat Tiket:</p>
                          Polisi bayaran balik ditentukan sepenuhnya oleh penganjur/pelaksana acara. Pihak UberTickets tidak bertanggungjawab sekiranya penganjur gagal mematuhi syarat kontrak bersama pelanggan.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'protect' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <ShieldCheck className="w-5 h-5 text-lime-400" /> REFUND PROTECT
                      </div>
                      
                      <div className="bg-neutral-950/30 p-5 rounded-xl border border-neutral-850 space-y-3.5 text-neutral-300">
                        <p className="font-bold text-white">Refund Protect Tambahan:</p>
                        <p>
                          Refund Protect tersedia sebagai pilihan tambahan semasa proses pembelian tiket. Dengan perlindungan ini, anda boleh memohon bayaran balik sekiranya berlaku situasi tak dijangka, tertakluk kepada terma dan syarat yang ditetapkan oleh pihak Refund Protect.
                        </p>
                        <hr className="border-neutral-800" />
                        <p className="font-semibold text-amber-450 text-xs">
                          *Makluman Penting: Segala permohonan, proses, dan keputusan berkaitan bayaran balik ini dikendalikan sepenuhnya oleh pihak Refund Protect dan BUKAN UberTickets. Pihak UberTickets tidak terlibat secara langsung dalam proses semakan atau kelulusan permohonan tersebut.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reseller' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <Ban className="w-5 h-5 text-lime-400" /> LARANGAN PENJUALAN SEMULA (RESELLER)
                      </div>
                      
                      <div className="bg-red-950/10 border border-red-900/30 p-5 rounded-xl space-y-3 text-neutral-300">
                        <p className="font-bold text-white">Polisi Tegas Terhadap Scalping:</p>
                        <p>
                          Pembelian tiket melalui penjual tiket yang tidak sah atau aktiviti scalping (ulat tiket) adalah dilarang sama sekali.
                        </p>
                        <p className="font-semibold text-red-450 text-xs">
                          Pihak penganjur acara berhak membatalkan tiket tersebut serta-merta tanpa sebarang pampasan serta menolak kemasukan pemegang tiket tersebut ke acara tanpa kompromi.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'liabiliti' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-wider text-base">
                        <AlertTriangle className="w-5 h-5 text-lime-400" /> LIABILITI & PERATURAN ARENA
                      </div>
                      
                      <ul className="space-y-3 text-xs md:text-sm text-neutral-300">
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">1.</span>
                          <span><strong>Had Umur:</strong> Had umur minimum untuk kemasukan ke konsert ialah 18 tahun dan ke atas.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">2.</span>
                          <span><strong>Risiko Kemalangan:</strong> Pemegang tiket bersetuju menanggung sepenuhnya segala risiko dan bahaya sebelum, semasa atau selepas acara berlangsung di sekitar kawasan panggung.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">3.</span>
                          <span><strong>Saringan Beg & Kamari:</strong> Peralatan kamera & rakaman profesional tidak dibenarkan tanpa pas media bertulis. Beg yang melebihi saiz A4 dilarang sama sekali. Saringan beg ketat dijalankan di semua laluan masuk.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">4.</span>
                          <span><strong>Hak Intelek Rakaman:</strong> Sebarang siaran persembahan adalah hak intelek penganjur. Sebaran komersial tanpa kebenaran akan dikenakan tindakan undang-undang serius.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">5.</span>
                          <span><strong>Barangan Terlarang:</strong> Pemegang tiket bersetuju diperiksa bagi senjata tajam, bahan larangan, peranti rakaman haram, makanan & minuman dari luar.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">6.</span>
                          <span><strong>Tindakan Pengusiran:</strong> Penganjur berhak menolak kemasukan atau mengusir mana-mana individu yang mengganggu ketenteraman, keselamatan, atau kelakuan kesat terhadap kru/kakitangan tanpa sebarang bayaran balik tiket.</span>
                        </li>
                        <li className="flex items-start gap-2 bg-neutral-950/20 p-3 rounded-lg border border-neutral-850/60">
                          <span className="text-lime-400 font-bold font-mono">7.</span>
                          <span><strong>Senarai Hitam:</strong> Pembeli yang melanggar terma akan disenarai hitam secara rasmi daripada sebarang pembelian acara masa depan.</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}

                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4.5 bg-neutral-950 border-t border-neutral-850 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-mono">
                  TERMA ACARA KEMASUKAN • UBERTIKETS MALAYSIA
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-lime-400 hover:bg-lime-350 text-black font-display font-black text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-colors shadow-md shadow-lime-400/10"
                  id="btn-close-policy-bottom"
                >
                  Faham & Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

