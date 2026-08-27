import Link from 'next/link';
import { ArrowRight, Bus, Train, Plane, Bike, CarTaxiFront, ExternalLink, Map, Info, ChevronRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'Panduan Transportasi | TIC Kota Bandung',
  description: 'Informasi lengkap rute angkutan umum, transportasi online, dan mobilitas di Kota Bandung.',
};

export default function TransportasiPage() {
  return (
    <main className="w-full bg-[#f8f9fa] min-h-screen pb-32 overflow-hidden selection:bg-blue-100">
      
      {/* Fresh Minimalist Hero */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-12 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-3xl -translate-x-1/2 -z-10"></div>
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">Transportasi</span>
        </nav>
        
        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold rounded-full text-sm mb-6 border border-blue-100">
          Panduan Mobilitas 2026
        </div>
        <h1 className={`${montserrat.className} text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-slate-900 mb-8 tracking-tighter leading-[1.1]`}>
          Jelajahi Bandung <br className="hidden md:block" />
          <span className="text-[#3D7A5E]">
            Tanpa Batas.
          </span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
          Sistem transportasi terintegrasi untuk kenyamanan perjalanan Anda. Dari kereta cepat hingga sepeda santai keliling kota.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Whoosh (Image Card) */}
          <div className="md:col-span-2 bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] group relative">
            <img src="/ASET VISUAL/Whoosh.jpg" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Kereta Cepat Whoosh" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center justify-center w-max px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Kereta Cepat
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Whoosh</h2>
              <p className="text-slate-300 font-medium leading-relaxed max-w-md">
                Jakarta - Bandung dalam 45 menit. Terkoneksi langsung dengan KA Feeder ke pusat kota.
              </p>
              <Link href="https://kcic.co.id" className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-blue-300">
                Jadwal & Tiket <ArrowRight className="w-5 h-5"/>
              </Link>
            </div>
          </div>

          {/* Card 2: Bandros (Image Card) */}
          <div className="md:col-span-2 bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] group relative">
            <img src="/ASET VISUAL/bandros.jpg" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Bandros" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center justify-center w-max px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Ikonik
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Bandros</h2>
              <p className="text-slate-300 font-medium leading-relaxed max-w-md">
                Bus wisata tematik untuk berkeliling landmark bersejarah Kota Bandung.
              </p>
              <Link href="https://uptangkutan-bandung.id/bandros/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-amber-300">
                Jadwal & Rute <ArrowRight className="w-5 h-5"/>
              </Link>
            </div>
          </div>

          {/* Card 3: Transportasi Online (Image Card) */}
          <div className="lg:col-span-1 bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group relative">
            <img src="/ASET VISUAL/transportasi-online.jpg" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Transportasi Online" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="inline-flex items-center justify-center w-max px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                Ride Hailing
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">Transportasi Online</h3>
              <p className="text-slate-300 text-sm leading-relaxed hidden md:block">
                Tersedia 24 jam. Patuhi aturan titik jemput khusus (Shelter) di stasiun.
              </p>
            </div>
          </div>

          {/* Card 4: Boseh (Image Card) */}
          <div className="lg:col-span-1 bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group relative">
            <img src="/ASET VISUAL/boseh.jpg" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Boseh Bike Sharing" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="inline-flex items-center justify-center w-max px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                Sepeda Publik
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Boseh</h3>
              <p className="text-slate-300 text-sm leading-relaxed hidden md:block">
                Sewa sepeda di titik strategis. Cara terseru menikmati kota.
              </p>
              <Link href="https://uptangkutan-bandung.id/boseh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-purple-300 text-sm">
                Info Lengkap <ArrowRight className="w-5 h-5"/>
              </Link>
            </div>
          </div>

          {/* Card 5: DAMRI & Angkot */}
          <div className="md:col-span-2 bg-white rounded-[32px] p-8 md:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Bus className="w-6 h-6"/>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">DAMRI & Angkot</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Trans Metro Bandung</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Bus koridor utama berbasis non-tunai (QRIS/E-Money) antar pusat keramaian.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Angkutan Kota</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Urat nadi mobilitas warga. Menjangkau seluruh pelosok dengan tarif sangat terjangkau.</p>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
