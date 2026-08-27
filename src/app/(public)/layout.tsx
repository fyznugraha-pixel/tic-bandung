import Link from 'next/link';
import { Search, MapPin, Mail, Phone, Globe, Camera, PlayCircle } from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STICKY NAVBAR */}
      <nav className="bg-white border-b border-slate-200 w-full top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-16 h-20 max-w-[1600px] mx-auto">
          <Link className="text-2xl font-bold text-amber-700 tracking-tight font-display" href="/">Pesona Kota Bandung</Link>
          <div className="hidden lg:flex gap-8">
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="/kategori">Destinasi</Link>
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="/kategori?cluster=kuliner">Kuliner</Link>
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="/event">Event</Link>
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="/peta">Peta Interaktif</Link>
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="/kategori/walking-tour">Walking Tour</Link>
            <Link className="text-slate-600 hover:text-amber-700 font-medium transition-colors" href="#">Transportasi</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-sm font-medium hidden md:block">ID/EN</span>
            <Link href="/trip-planner" className="bg-amber-100 text-amber-900 px-5 py-2.5 text-sm font-bold rounded-lg hover:bg-amber-200 transition-colors">
              Rencanakan Trip
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {children}
      </div>

      {/* 12. PARTNER STRIP */}
      <section className="w-full py-12 bg-slate-50 border-y border-slate-200 mt-auto">
        <div className="max-w-[1600px] px-6 md:px-12 lg:px-16 mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-8">DIDUKUNG OLEH MITRA RESMI</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-bold font-display text-slate-800">KEMENPAREKRAF</span>
            <span className="text-2xl font-bold font-display text-slate-800">PEMKOT BANDUNG</span>
            <span className="text-2xl font-bold font-display text-slate-800">PHRI</span>
            <span className="text-2xl font-bold font-display text-slate-800">ASITA</span>
            <span className="text-2xl font-bold font-display text-slate-800">GARUDA INDONESIA</span>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-white border-t border-slate-200 w-full pt-16">
        <div className="w-full pb-12 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-3xl font-bold text-amber-700 font-display block mb-4">Pesona Kota Bandung</span>
            <p className="text-slate-600 text-base mb-6 leading-relaxed">Jelajahi keindahan, budaya, dan kuliner autentik di jantung Kota Bandung.</p>
            <div className="flex gap-4 text-slate-500">
              <Link className="hover:text-amber-700 transition-colors bg-slate-100 p-2 rounded-full" href="#"><Globe className="w-5 h-5" /></Link>
              <Link className="hover:text-amber-700 transition-colors bg-slate-100 p-2 rounded-full" href="#"><Camera className="w-5 h-5" /></Link>
              <Link className="hover:text-amber-700 transition-colors bg-slate-100 p-2 rounded-full" href="#"><PlayCircle className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Eksplor</h4>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="/">Destinasi</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="/kategori?cluster=kuliner">Kuliner</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="/event">Event &amp; Festival</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Layanan</h4>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="/trip-planner">Trip Planner</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="/peta">Peta Interaktif</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="#">Pusat Bantuan</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Informasi</h4>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="#">Tentang Kami</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="#">Kebijakan Privasi</Link>
              <Link className="text-slate-600 hover:text-amber-700 transition-colors text-base" href="#">Syarat &amp; Ketentuan</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Kontak</h4>
              <p className="text-slate-600 text-base flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <span>Jl. Asia Afrika No. 1<br/>Kota Bandung</span>
              </p>
              <p className="text-slate-600 text-base flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                <span>info@pesonabandung.id</span>
              </p>
              <p className="text-slate-600 text-base flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                <span>1500-BDG</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 py-6 text-center bg-slate-50">
          <p className="text-slate-500 text-sm">© 2024 Pemerintah Kota Bandung - Pesona Kota Bandung Official. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
