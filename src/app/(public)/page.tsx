import Link from 'next/link';
import { Search, Map, Utensils, Sun, Landmark, Calendar, MapPin, Bus, Star, Compass, Download, Heart, ArrowRight, Camera, ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import HeroSlider from '@/components/home/HeroSlider';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] overflow-hidden">
      <HeroSlider />

      {/* 10. BERITA & ARTIKEL WISATA (Tourism Update) */}
      <section className="w-full pt-32 pb-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[#C9971E] font-bold tracking-widest uppercase text-sm mb-4">Update Terkini</span>
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 tracking-tight`}>Berita & Artikel Wisata</h2>
          <div className="w-24 h-1.5 bg-[#C9971E] rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              category: "Tips Liburan", color: "text-emerald-600 bg-emerald-50",
              title: "Panduan Lengkap Wisata Keluarga di Kota Bandung Akhir Pekan",
              date: "12 Agustus 2026"
            },
            {
              category: "Tourism Update", color: "text-blue-600 bg-blue-50",
              title: "Persiapan Kota Bandung Menyambut Konferensi Internasional 2027",
              date: "10 Agustus 2026"
            },
            {
              category: "Kuliner Lokal", color: "text-[#C9971E] bg-amber-50",
              title: "5 Kafe Legendaris di Jalan Braga yang Wajib Anda Kunjungi",
              date: "8 Agustus 2026"
            }
          ].map((item, i) => (
             <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100/60 group cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
               <div className="h-64 relative overflow-hidden bg-slate-200 flex flex-col items-center justify-center">
                 {/* Placeholder for missing image */}
                 <ImageIcon className="w-12 h-12 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                 
                 <div className="absolute top-4 left-4">
                   <span className={`text-xs font-bold ${item.color} px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm`}>{item.category}</span>
                 </div>
               </div>
               <div className="p-8 flex flex-col flex-grow justify-between">
                 <div>
                   <h3 className={`${montserrat.className} text-xl font-bold text-slate-900 mb-4 group-hover:text-[#C9971E] transition-colors line-clamp-3 leading-snug`}>{item.title}</h3>
                 </div>
                 <div className="flex items-center justify-between mt-4">
                   <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-slate-400" /> {item.date}
                   </span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#C9971E] transition-colors duration-500">
                     <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                   </div>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* REKOMENDASI DESTINASI WISATA */}
      <section className="w-full pb-32 pt-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4">Eksplorasi</span>
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 tracking-tight`}>Rekomendasi Destinasi</h2>
          <div className="w-24 h-1.5 bg-[#3D7A5E] rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[900px] md:h-[650px]">
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-2 block shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/gedung-sate">
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-white/20" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="bg-[#C9971E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">Ikon Kota</span>
              <h3 className={`${montserrat.className} text-4xl font-bold text-white mb-2`}>Gedung Sate</h3>
              <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 max-w-md">Simbol kebanggaan masyarakat Jawa Barat yang menyimpan nilai sejarah panjang sejak era kolonial.</p>
            </div>
          </Link>
          
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-1 block shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/alun-alun-bandung">
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-white/20" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="bg-[#3D7A5E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">Alam & Rekreasi</span>
              <h3 className={`${montserrat.className} text-2xl font-bold text-white`}>Alun-Alun Bandung</h3>
            </div>
          </Link>
          
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-1 md:row-span-1 block shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/jalan-braga">
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-[#2C5C8A]/20 transition-colors duration-700 group-hover:bg-[#2C5C8A]/40 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-white/20" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="bg-[#2C5C8A] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">Warisan Sejarah</span>
              <h3 className={`${montserrat.className} text-xl font-bold text-white`}>Jalan Braga</h3>
            </div>
          </Link>
          
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-1 md:row-span-1 block bg-[#C9971E] flex flex-col justify-center items-center text-center p-8 hover:bg-[#b08316] transition-colors duration-500 shadow-md hover:shadow-xl" href="/kategori">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <Compass className="text-white w-8 h-8 group-hover:rotate-45 transition-transform duration-700" />
            </div>
            <h3 className={`${montserrat.className} text-2xl font-bold text-white mb-3`}>50+ Destinasi</h3>
            <span className="text-sm font-bold text-white/90 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">Jelajahi <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </section>

      {/* 11. GALERI FOTO & GRAFIS */}
      <section className="w-full py-32 bg-white mb-12">
        <div className="max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#2C5C8A] font-bold tracking-widest uppercase text-sm mb-4 block">Pesona Visual</span>
              <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight`}>Galeri Kota</h2>
              <div className="w-24 h-1.5 bg-[#2C5C8A] rounded-full"></div>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-3 text-[#2C5C8A] font-bold hover:text-[#1e4063] transition-colors px-6 py-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-[#2C5C8A]/20">
              Lihat Semua Koleksi <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[700px]">
            <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group shadow-md hover:shadow-2xl transition-shadow duration-500 bg-slate-200 flex items-center justify-center">
               <ImageIcon className="w-16 h-16 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
               <div className="absolute inset-x-4 bottom-4 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                   <Camera className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <span className="text-white/80 text-xs font-bold uppercase tracking-widest block mb-1">Museum</span>
                   <span className="text-white font-bold text-xl leading-none">Museum Geologi</span>
                 </div>
               </div>
            </div>
            
            <div className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group shadow-md hover:shadow-xl transition-shadow duration-500 bg-slate-200 flex items-center justify-center">
               <ImageIcon className="w-10 h-10 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            </div>
            
            <div className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group shadow-md hover:shadow-xl transition-shadow duration-500 bg-slate-200 flex items-center justify-center">
               <ImageIcon className="w-10 h-10 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            </div>
            
            <div className="md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden relative group shadow-md hover:shadow-xl transition-shadow duration-500 bg-slate-200 flex items-center justify-center">
               <ImageIcon className="w-12 h-12 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
               <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex items-center gap-4">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                   <Camera className="text-white w-4 h-4" />
                 </div>
                 <div>
                   <span className="text-white font-bold text-lg leading-none">Malam di Asia Afrika</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
