import Link from 'next/link';
import { Search, Map, Utensils, Sun, Landmark, Calendar, MapPin, Bus, Star, Compass, Download, Heart } from 'lucide-react';
import HeroSlider from '@/components/home/HeroSlider';

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSlider />

      {/* NEW: SEJARAH KOTA BANDUNG */}
      <section className="w-full bg-white py-24 px-4 md:px-8 lg:px-12 relative z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <span className="text-[#C9971E] font-bold tracking-widest uppercase text-sm mb-4 block">Jejak Masa Lalu</span>
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight`}>
              Sejarah Singkat <br/> <span className="text-[#3D7A5E]">Parijs van Java</span>
            </h2>
            <div className="w-20 h-1 bg-[#C9971E] mb-8"></div>
            <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
              <p>
                Asal-usul nama <strong>Bandung</strong> memiliki dua akar sejarah yang memikat. Secara geologis, nama ini berasal dari kata <em>"Bendung"</em>, merujuk pada terbendungnya Sungai Citarum oleh lava letusan Gunung Tangkuban Perahu purba, yang kemudian membentuk telaga raksasa "Danau Bandung Purba". Sedangkan dalam tradisi lisan, nama ini merujuk pada <em>"Perahu Bandung"</em>, yaitu dua perahu yang diikat berdampingan yang digunakan Bupati R.A. Wiranatakusumah II menyusuri Sungai Citarum saat mencari lokasi ibu kota yang baru.
              </p>
              <p>
                Jejak awal kota ini secara resmi terukir pada tanggal <strong>25 September 1810</strong>. Kala itu, Gubernur Jenderal Herman Willem Daendels mengeluarkan surat keputusan untuk memindahkan pusat pemerintahan Kabupaten Bandung dari Krapyak (Dayeuhkolot) ke kawasan hutan yang dilewati oleh proyek ambisiusnya, Jalan Raya Pos <em>(De Grote Postweg)</em>. Tanggal inilah yang hingga kini dirayakan sebagai hari jadi Kota Bandung.
              </p>
              <p>
                Berkat hawanya yang sejuk bak pegunungan Eropa dan tata kota yang menawan, pada awal abad ke-20, Bandung menjelma menjadi tempat berkumpulnya para menak dan sosialita Eropa. Keindahan deretan bangunan berarsitektur Art Deco yang menghiasi jalan-jalan utamanya membuahkan julukan abadi bagi kota ini: <strong>"Parijs van Java"</strong>.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            
            {/* Image Collage */}
            <div className="relative h-[500px] w-full grid grid-cols-2 gap-4">
              
              {/* Main Image (Left) */}
              <div className="rounded-2xl overflow-hidden shadow-xl group">
                <img 
                  src="/sejarah kota bandung/collectie_tropenmuseum_verkeersdrukte_op_de_groote_postweg_oost_in_de_binnenstad_van_bandoeng_tmnr_10014702.webp" 
                  alt="De Groote Postweg Bandung" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#3D7A5E]/10 mix-blend-multiply pointer-events-none"></div>
              </div>

              {/* Stacked Images (Right) */}
              <div className="flex flex-col gap-4">
                <div className="h-1/2 rounded-2xl overflow-hidden shadow-lg group relative">
                  <img 
                    src="/sejarah kota bandung/bandung-masa-kolonial-tropenmuseum-wikimedia_ratio-16x9.webp" 
                    alt="Bandung Masa Kolonial" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#3D7A5E]/10 mix-blend-multiply pointer-events-none"></div>
                </div>
                <div className="h-1/2 rounded-2xl overflow-hidden shadow-lg group relative">
                  <img 
                    src="/sejarah kota bandung/gedung-merdeka.webp" 
                    alt="Gedung Merdeka" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#3D7A5E]/10 mix-blend-multiply pointer-events-none"></div>
                </div>
              </div>

            </div>

            {/* Decorative blocks */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#f5be45] rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-[#3D7A5E] rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* 4. "KENAPA BANDUNG" STAT STRIP (Image Background Version) */}
      <section className="w-full relative py-32 mb-24 overflow-hidden z-20">
        <div className="absolute inset-0 z-0">
          <img alt="Background Asia Afrika Bandung" className="w-full h-full object-cover object-bottom brightness-50" src="/ASET VISUAL/jalan-asia-afrika.jpg" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-md`}>Kenapa Kota Bandung?</h2>
          <div className="w-20 h-1 bg-[#f5be45] mx-auto mb-16 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-center border border-white/20 shadow-lg">
              <span className="text-5xl font-bold text-[#f5be45] block mb-4 drop-shadow">500+</span>
              <span className="text-sm font-bold uppercase tracking-widest text-white">Destinasi Wisata</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-center border border-white/20 shadow-lg">
              <span className="text-5xl font-bold text-[#f5be45] block mb-4 drop-shadow">20°C</span>
              <span className="text-sm font-bold uppercase tracking-widest text-white">Suhu Rata-rata</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-center border border-white/20 shadow-lg">
              <span className="text-5xl font-bold text-[#f5be45] block mb-4 drop-shadow">1.2K</span>
              <span className="text-sm font-bold uppercase tracking-widest text-white">Spot Kuliner</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-center border border-white/20 shadow-lg">
              <span className="text-5xl font-bold text-[#f5be45] block mb-4 drop-shadow">#1</span>
              <span className="text-sm font-bold uppercase tracking-widest text-white">Kota Kreatif UNESCO</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DESTINASI POPULER */}
      <section className="w-full pb-24 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6`}>Destinasi Populer</h2>
        <div className="w-20 h-1 bg-[#C9971E] mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
          <Link className="group relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-2 block shadow-md" href="/destinasi/gedung-sate">
            <img alt="Gedung Sate" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Museum/Museum Gedung Sate/museum-gedung-sate.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Ikon Kota</span>
              <h3 className="text-3xl font-bold text-white">Gedung Sate</h3>
            </div>
          </Link>
          <Link className="group relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-1 block shadow-md" href="/destinasi/alun-alun-bandung">
            <img alt="Alun-Alun Bandung" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Park Destination/Alun alun bandung/01jy5vx3njvq5xwdtxcwrjmaag.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Alam</span>
              <h3 className="text-2xl font-bold text-white">Alun-Alun Bandung</h3>
            </div>
          </Link>
          <Link className="group relative rounded-2xl overflow-hidden md:col-span-1 md:row-span-1 block shadow-md" href="/destinasi/jalan-braga">
            <img alt="Jalan Braga" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Walking Tour/Jalan Braga/FB_IMG_1537243916962.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Warisan</span>
              <h3 className="text-xl font-bold text-white">Jalan Braga</h3>
            </div>
          </Link>
          <Link className="group relative rounded-2xl overflow-hidden md:col-span-1 md:row-span-1 block bg-amber-100 flex flex-col justify-center items-center text-center p-6 hover:bg-amber-200 transition-colors shadow-md" href="/kategori">
            <Compass className="text-amber-700 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-amber-900 mb-2">Lihat 50+ Destinasi Lainnya</h3>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Eksplor Sekarang</span>
          </Link>
        </div>
      </section>

      {/* 7. KULINER PILIHAN */}
      <section className="w-full bg-white py-24 border-y border-slate-200">
        <div className="max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto overflow-hidden">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-slate-900 mb-4`}>Kuliner Pilihan</h2>
              <div className="w-20 h-1 bg-[#C9971E] mb-4 rounded-full"></div>
              <p className="text-lg text-slate-600">Cicipi ragam rasa autentik Bandung</p>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto hide-scroll pb-8 snap-x">
            {/* Card 1: Sumber Hidangan */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Sumber Hidangan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Bandoengsche melk centrale/caption(1).jpg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.8</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Sumber Hidangan</h3>
              <p className="text-slate-600">Toko roti legendaris sejak 1929 dengan es krim khas Belanda</p>
            </div>
            
            {/* Card 2: Braga Permai */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Braga Permai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Braga permai/2024-03-25-2636904789.jpg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.9</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Braga Permai</h3>
              <p className="text-slate-600">Restoran tertua dari 1918, sedia kue sarapan ala raja Belanda</p>
            </div>

            {/* Card 3: BMC */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Bandoengsche Melk Centrale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Bandoengsche melk centrale/2029256078.jpeg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.7</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Bandoengsche Melk Centrale</h3>
              <p className="text-slate-600">Wisata kuliner susu murni dengan varian rasa legendaris</p>
            </div>
            
            {/* Card 4: Toko Roti Sidodadi */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Toko Roti Sidodadi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Toko roti sidodadi/IMG_20260810_191953.jpg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.9</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Toko Roti Sidodadi</h3>
              <p className="text-slate-600">Toko roti legendaris dengan resep kuno tanpa bahan pengawet.</p>
            </div>
            
            {/* Card 5: Kopi Purnama */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Kopi Purnama" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Kopi purnama (JL alkateri)/1392700_720.jpg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.8</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Kopi Purnama</h3>
              <p className="text-slate-600">Kedai kopi jadul 1930 dengan menu andalan roti selai sarikaya</p>
            </div>
            
            {/* Card 6: Roti Gempol */}
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-5 shadow-md">
                <img alt="Roti Gempol" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Roti Gempol/IMG_20260810_191227.jpg" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-800">4.8</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Roti Gempol</h3>
              <p className="text-slate-600">Tempat sarapan andalan sejak 1958 dengan sajian roti gandum spesial</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. KATA WISATAWAN (Solid style) */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6`}>Kata Wisatawan</h2>
        <div className="w-20 h-1 bg-[#C9971E] mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex text-amber-500 mb-6 gap-1">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <p className="text-slate-700 text-lg italic mb-8">"Suasana jalan Braga di malam hari sangat magis. Makanannya luar biasa enak dan harganya terjangkau."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img alt="User" className="w-full h-full object-cover" src="/ASET VISUAL/Wisata Bandung/Museum/Museum geologi/IMG_1971.PNG" />
              </div>
              <div>
                <span className="block font-bold text-slate-900">Budi Santoso</span>
                <span className="block text-sm text-slate-500">Dari Jakarta</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex text-amber-500 mb-6 gap-1">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <p className="text-slate-700 text-lg italic mb-8">"Gedung Merdeka dan Museum Asia Afrika memberikan wawasan sejarah yang luar biasa di tengah kota."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img alt="User" className="w-full h-full object-cover" src="/ASET VISUAL/Wisata Bandung/Museum/Museum geologi/IMG_1970.PNG" />
              </div>
              <div>
                <span className="block font-bold text-slate-900">Sarah Johnson</span>
                <span className="block text-sm text-slate-500">Dari Australia</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex text-amber-500 mb-6 gap-1">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-slate-700 text-lg italic mb-8">"Kuliner malamnya juara! Harus coba batagor dan mie kocok saat berkunjung ke sini."</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img alt="User" className="w-full h-full object-cover" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Braga permai/braga-permai-restaurant.jpg" />
              </div>
              <div>
                <span className="block font-bold text-slate-900">Ahmad Ridwan</span>
                <span className="block text-sm text-slate-500">Dari Surabaya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TRIP PLANNER BANNER */}
      <section className="w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto pb-24">
        <div className="bg-amber-100 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="p-10 md:p-16 md:w-1/2">
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-amber-900 mb-6`}>Rencanakan Perjalanan Anda</h2>
            <div className="w-20 h-1 bg-amber-700 mb-6 rounded-full"></div>
            <p className="text-lg text-amber-800/80 mb-8">Buat itinerary khusus, booking tiket, dan simpan wishlist destinasi Anda dalam satu aplikasi.</p>
            <div className="flex gap-4">
              <button className="bg-amber-900 text-amber-100 px-6 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-amber-800 transition-colors flex items-center gap-3">
                <Download className="w-5 h-5" /> Unduh App
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[400px] w-full flex justify-center items-end bg-amber-200/50">
            <div className="w-64 h-[350px] bg-white rounded-t-3xl border-8 border-slate-100 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="w-full h-40 bg-slate-200">
                 <img alt="App Preview" className="w-full h-full object-cover" src="/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Sumber hidangan (Braga)/Sumber-Hidangan-5-Braga-Bandung.webp" />
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                <div className="mt-auto h-10 bg-amber-100 rounded-xl w-full flex items-center justify-center">
                   <span className="h-2 w-1/2 bg-amber-200 rounded-full"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
