import Link from 'next/link';
import { ChevronRight, Bus, Train, Plane, Bike, CarTaxiFront, ExternalLink, Map } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'Panduan Transportasi | TIC Kota Bandung',
  description: 'Informasi lengkap rute angkutan umum, transportasi online, dan mobilitas di Kota Bandung.',
};

export default function TransportasiPage() {
  return (
    <main className="w-full bg-[#fcf9f5] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="w-full bg-slate-900 relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/ASET VISUAL/jalan-asia-afrika.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight`}>Panduan Mobilitas Bandung</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Dari Bandros yang ikonik hingga Whoosh yang super cepat, temukan cara terbaik mengelilingi Kota Bandung.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 -mt-16 relative z-20">
        
        {/* Quick Nav Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700"><Bus className="w-6 h-6"/></div>
            <h3 className="font-bold text-slate-800">Angkutan Kota & Bus</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700"><Train className="w-6 h-6"/></div>
            <h3 className="font-bold text-slate-800">Kereta & Whoosh</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700"><CarTaxiFront className="w-6 h-6"/></div>
            <h3 className="font-bold text-slate-800">Transportasi Online</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700"><Bike className="w-6 h-6"/></div>
            <h3 className="font-bold text-slate-800">Boseh & Sewa Sepeda</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Section 1: Wisata & Ikonik */}
            <section>
              <h2 className={`${montserrat.className} text-3xl font-bold text-slate-900 mb-2`}>Transportasi Wisata</h2>
              <div className="w-16 h-1 bg-[#C9971E] mb-8"></div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl shrink-0 overflow-hidden">
                    <img src="/ASET VISUAL/Wisata Bandung/Museum/Museum geologi/IMG_1970.PNG" className="w-full h-full object-cover" alt="Bandros" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">BANDROS (Bandung Tour on Bus)</h3>
                    <p className="text-slate-600 text-sm mb-4">Bus wisata ikonik bergaya klasik ini siap mengantar Anda berkeliling ke berbagai rute tematik sejarah dan landmark Kota Bandung. Sangat cocok untuk turis yang baru pertama kali berkunjung.</p>
                    <Link href="https://bandung.go.id" className="text-amber-700 text-sm font-bold flex items-center gap-1 hover:underline"><ExternalLink className="w-4 h-4"/> Cek Jadwal & Rute Resmi</Link>
                  </div>
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center bg-purple-50">
                    <Bike className="w-12 h-12 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">BOSEH (Bike Sharing)</h3>
                    <p className="text-slate-600 text-sm mb-4">Layanan penyewaan sepeda publik yang tersebar di titik-titik strategis kota. Cukup gunakan kartu elektronik untuk menikmati sejuknya Bandung dengan bersepeda.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Publik Transit */}
            <section>
              <h2 className={`${montserrat.className} text-3xl font-bold text-slate-900 mb-2`}>Angkutan Umum Massal</h2>
              <div className="w-16 h-1 bg-[#C9971E] mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Bus className="w-5 h-5 text-amber-600"/> Bus DAMRI & Trans Metro</h3>
                  <p className="text-slate-600 text-sm mb-4">Melayani koridor utama kota mulai dari Cicaheum, Cibiru, hingga Leuwipanjang. Menggunakan sistem pembayaran non-tunai (QRIS/E-Money).</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Bus className="w-5 h-5 text-amber-600"/> Angkot (Angkutan Kota)</h3>
                  <p className="text-slate-600 text-sm mb-4">Urat nadi transportasi warga lokal. Setiap rute dibedakan dari warna dan nomor angkot. Sangat murah dan menjangkau hingga ke pelosok.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Train className="w-5 h-5 text-amber-600"/> Whoosh (Kereta Cepat)</h3>
                  <p className="text-slate-600 text-sm mb-4">Kereta Cepat Jakarta-Bandung. Berhenti di Stasiun Padalarang dan Tegalluar, terkoneksi dengan KA Feeder langsung menuju Stasiun Bandung.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Plane className="w-5 h-5 text-amber-600"/> Pesawat & Travel</h3>
                  <p className="text-slate-600 text-sm mb-4">Konektivitas udara melalui Bandara Husein Sastranegara dan Kertajati, serta ratusan rute armada Travel (Shuttle) antar kota.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Ride Hailing & Tips */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#1b1c1a] rounded-3xl p-8 text-white">
              <h3 className={`${montserrat.className} text-2xl font-bold mb-4`}>Transportasi Online</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">Berbagai layanan *ride-hailing* (Grab, Gojek, Maxim, InDrive) beroperasi 24 jam di Kota Bandung.</p>
              
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-400 mb-1">Titik Jemput Resmi (Pick-up Point)</h4>
                  <p className="text-slate-400 text-xs">Di area tertentu seperti Stasiun Bandung, Bandara, dan Terminal, pastikan Anda menuju titik jemput resmi (*Shelter* khusus ojek/taksi online) agar tidak menyalahi aturan zona merah.</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-400 mb-1">Tips Pemesanan</h4>
                  <p className="text-slate-400 text-xs">Untuk menuju area wisata berbukit seperti Lembang atau Ciwidey, pastikan Anda memesan mobil (bukan motor) demi kenyamanan dan keamanan rute menanjak.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 rounded-3xl p-8 border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2"><Map className="w-5 h-5"/> Peta Rute Angkot</h3>
              <p className="text-amber-800 text-sm mb-4">Bingung mau naik angkot jurusan apa? Unduh panduan PDF rute resmi trayek angkot di seluruh Kota Bandung.</p>
              <button className="w-full bg-amber-900 text-white font-bold py-3 rounded-xl hover:bg-amber-800 transition-colors">
                Unduh Peta Trayek (PDF)
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
