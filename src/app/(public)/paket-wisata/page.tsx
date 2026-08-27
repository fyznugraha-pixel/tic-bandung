import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { ChevronRight, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'Paket Wisata | TIC Kota Bandung',
  description: 'Pilihan paket wisata resmi dari asosiasi ASTINDO dan ASITA.',
};

export default function PaketWisataPage() {
  return (
    <main className="w-full bg-[#fcf9f5] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Breadcrumb & Header */}
        <div className="mb-16">
          <nav className="flex text-[#4f4635] text-sm mb-6 items-center gap-2 font-medium">
            <Link className="hover:text-[#7a5900] transition-colors" href="/">Home</Link>
            <ChevronRight className="w-4 h-4 text-[#4f4635]" />
            <span className="text-[#1b1c1a]">Paket Wisata</span>
          </nav>
          <h1 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-[#1b1c1a] mb-6 tracking-tight`}>
            Paket Wisata Bandung Raya
          </h1>
          <div className="w-20 h-1 bg-[#C9971E] mb-6"></div>
          <p className="text-lg text-[#4f4635] max-w-2xl">
            Nikmati kemudahan menjelajahi Kota Bandung dan sekitarnya dengan pilihan paket wisata terpercaya dan bersertifikat dari asosiasi resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* ASITA Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full group hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-3">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className={`${montserrat.className} text-2xl font-bold text-slate-900`}>ASITA Jabar</h2>
                <span className="text-sm font-semibold text-blue-600">Association of The Indonesian Tours and Travel Agencies</span>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
              Temukan beragam paket perjalanan wisata menarik yang diselenggarakan oleh agen perjalanan terpercaya di bawah naungan ASITA Jawa Barat. Mulai dari city tour, wisata alam, hingga wisata edukasi.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-slate-400"/> Destinasi Cakupan:</h3>
              <ul className="text-sm text-slate-600 space-y-2 font-medium">
                <li>• Kota Bandung (Heritage & City Tour)</li>
                <li>• Bandung Utara (Lembang & Tangkuban Perahu)</li>
                <li>• Bandung Selatan (Ciwidey & Pangalengan)</li>
              </ul>
            </div>

            <Link 
              href="https://asita.or.id/" 
              target="_blank"
              className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Lihat Katalog Paket ASITA
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>

          {/* ASTINDO Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full group hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center p-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h2 className={`${montserrat.className} text-2xl font-bold text-slate-900`}>ASTINDO</h2>
                <span className="text-sm font-semibold text-emerald-600">Asosiasi Travel Agent Indonesia</span>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
              Pilihan paket tur eksklusif, perjalanan korporat, hingga MICE (Meeting, Incentive, Convention, Exhibition) dari travel agent profesional tersertifikasi ASTINDO.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-slate-400"/> Spesialisasi Layanan:</h3>
              <ul className="text-sm text-slate-600 space-y-2 font-medium">
                <li>• Paket Wisata Keluarga Premium</li>
                <li>• Perjalanan Bisnis & Corporate Gathering</li>
                <li>• Customized Tour Packages</li>
              </ul>
            </div>

            <Link 
              href="https://astindo.or.id/" 
              target="_blank"
              className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Lihat Katalog Paket ASTINDO
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
