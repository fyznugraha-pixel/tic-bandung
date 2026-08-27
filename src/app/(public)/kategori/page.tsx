import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Kategori Wisata | Pesona Bandung',
  description: 'Jelajahi beragam kategori destinasi wisata di Kota Bandung.',
};

import { createClient } from '@/utils/supabase/server';

export default async function KategoriPage() {
  const supabase = await createClient();
  const { data: stats } = await supabase.from('category_stats_view').select('*');
  
  const getCount = (slug: string, fallback: string) => {
    if (!stats) return fallback;
    const category = stats.find(s => s.slug === slug);
    return category ? `${category.total_published_locations} Lokasi` : fallback;
  };

  return (
    <main className="w-full bg-[#fcf9f5] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="flex text-[#4f4635] text-sm mb-6 items-center gap-2 font-medium">
            <Link className="hover:text-[#7a5900] transition-colors" href="/">Beranda</Link>
            <ChevronRight className="w-4 h-4 text-[#4f4635]" />
            <span className="text-[#1b1c1a]">Kategori Wisata</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-[#1b1c1a] mb-4 tracking-tight">Jelajahi Kategori Wisata Bandung</h1>
          <p className="text-lg text-[#4f4635] max-w-2xl">Temukan beragam pesona Bandung melalui 15 kategori destinasi pilihan. Dari sejarah kolonial hingga inovasi kota kreatif modern.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between bg-[#f6f3f0] p-4 rounded-xl border border-[#d3c5af]">
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#4f4635]" />
            <input className="w-full pl-12 pr-4 py-3 bg-[#fcf9f5] border border-[#d3c5af] rounded-lg focus:border-[#7a5900] focus:ring-1 focus:ring-[#7a5900] outline-none transition-all text-[#1b1c1a] placeholder-[#4f4635]/70" placeholder="Cari kategori..." type="text" />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button className="px-4 py-2 rounded-full border border-[#3D7A5E]/30 bg-[#3D7A5E]/10 text-[#3D7A5E] font-medium text-sm hover:bg-[#3D7A5E]/20 transition-colors">Alam &amp; Taman</button>
            <button className="px-4 py-2 rounded-full border border-[#2C5C8A]/30 bg-[#2C5C8A]/10 text-[#2C5C8A] font-medium text-sm hover:bg-[#2C5C8A]/20 transition-colors">Rekreasi</button>
            <button className="px-4 py-2 rounded-full border border-[#c9971e]/30 bg-[#c9971e]/10 text-[#c9971e] font-medium text-sm hover:bg-[#c9971e]/20 transition-colors">Edukasi &amp; Budaya</button>
            <button className="px-4 py-2 rounded-full border border-[#2C7A7A]/30 bg-[#2C7A7A]/10 text-[#2C7A7A] font-medium text-sm hover:bg-[#2C7A7A]/20 transition-colors">Seni</button>
            <button className="px-4 py-2 rounded-full border border-[#8C5A3C]/30 bg-[#8C5A3C]/10 text-[#8C5A3C] font-medium text-sm hover:bg-[#8C5A3C]/20 transition-colors">Religi</button>
            <button className="px-4 py-2 rounded-full border border-[#D4791E]/30 bg-[#D4791E]/10 text-[#D4791E] font-medium text-sm hover:bg-[#D4791E]/20 transition-colors">Kuliner</button>
            <button className="px-4 py-2 rounded-full border border-[#B5566B]/30 bg-[#B5566B]/10 text-[#B5566B] font-medium text-sm hover:bg-[#B5566B]/20 transition-colors">Belanja</button>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[180px] grid-flow-dense gap-4 mb-16">
          {/* 1. Museum (Gold #C9971E, 2x2) */}
          <Link href="/kategori/museum" className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Museum/Museum Asia Afrika/IMG_1901.PNG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9971E]/90 via-[#C9971E]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider border border-white/30">{getCount('museum', '19 Lokasi')}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight">Museum</h3>
              <p className="text-white/90 text-base max-w-sm hidden md:block">Jelajahi warisan sejarah dan budaya Bandung yang tersimpan apik dalam bangunan berarsitektur klasik.</p>
            </div>
          </Link>
          
          {/* 2. Wisata Art Space (Teal #2C7A7A, 2x2) */}
          <Link href="/kategori/wisata-art-space" className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Art Gallery/NU art Sculpture Park/629ede6839ea4(1).jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C7A7A]/90 via-[#2C7A7A]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider border border-white/30">{getCount('wisata-art-space', '15 Lokasi')}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight">Wisata Art Space</h3>
              <p className="text-white/90 text-base max-w-sm hidden md:block">Wadah kreativitas seniman lokal, menampilkan perpaduan seni tradisional Sunda dan kontemporer.</p>
            </div>
          </Link>

          {/* 3. Wisata Ekonomi Kreatif (Gold #C9971E, 2x1) */}
          <Link href="/kategori/wisata-ekonomi-kreatif" className="md:col-span-2 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Tourist village/The knitwear of Binong jati/IMG_5888.JPG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9971E]/90 via-[#C9971E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('wisata-ekonomi-kreatif', '17 Sektor')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Wisata Ekonomi Kreatif</h3>
            </div>
          </Link>

          {/* 4. Wisata Alam (Green #3D7A5E, 1x2) */}
          <Link href="/kategori/wisata-alam" className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Nature Destination/Curug Dago/img-20240221-171009-091b388151cd1ce340b727799e9b4d41.webp')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D7A5E]/90 via-[#3D7A5E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('wisata-alam', '6 Lokasi')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Wisata Alam</h3>
            </div>
          </Link>

          {/* 5. Wisata Buatan (Blue #2C5C8A, 1x2) */}
          <Link href="/kategori/wisata-buatan" className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Leisure destination/Trans studio Bandung/IMG_1883.PNG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C5C8A]/90 via-[#2C5C8A]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('wisata-buatan', '9 Lokasi')}</span>
              <h3 className="text-3xl font-bold font-display text-white mb-2 leading-tight">Wisata Buatan</h3>
            </div>
          </Link>

          {/* 6. Wisata Taman Kota (Green #3D7A5E, 1x2) */}
          <Link href="/kategori/taman-kota" className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Park Destination/Taman vanda/snapinstaapp-11327309-811935228905308-2078342922-n-1024-c16af20e1f20a26dfde38754cc50d10a.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D7A5E]/90 via-[#3D7A5E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('taman-kota', '20 Lokasi')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Taman Kota</h3>
            </div>
          </Link>

          {/* 7. Kampung Wisata Kreatif (Green #3D7A5E, 1x1) */}
          <Link href="/kategori/kampung-wisata-kreatif" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Tourist village/Creative tourism village Cibaduyut/IMG_5867.JPG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D7A5E]/90 via-[#3D7A5E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">{getCount('kampung-wisata-kreatif', '8 Lokasi')}</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Kampung Kreatif</h3>
            </div>
          </Link>

          {/* 8. Wisata Public Space Area (Blue #2C5C8A, 1x1) */}
          <Link href="/kategori/wisata-public-space-area" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Museum/Museum gedung sate/IMG_1929.PNG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C5C8A]/90 via-[#2C5C8A]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">{getCount('public-space', '5 Lokasi')}</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Public Space</h3>
            </div>
          </Link>

          {/* 9. Walking Tour (Blue #2C5C8A, 1x1) */}
          <Link href="/kategori?cluster=walking-tour" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Nature Destination/Mupu jeruk/images.jpeg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C5C8A]/90 via-[#2C5C8A]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">{getCount('walking-tour', '5 Rute')}</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Walking Tour</h3>
            </div>
          </Link>

          {/* 11. Wisata Atraksi dan Kesenian (Gold #C9971E, 1x1) */}
          <Link href="/kategori?cluster=atraksi" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Museum/Museum wolf schoemaker/IMG_2045.JPG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9971E]/90 via-[#C9971E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">{getCount('atraksi-kesenian', '22 Lokasi')}</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Atraksi Kesenian</h3>
            </div>
          </Link>

          {/* 10. Kuliner Legendaris (Amber #D4791E, 1x2 - Col 1 Tall) */}
          <Link href="/kategori?cluster=kuliner" className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Nature Destination/Senin farm sekemala/Sein-Farm-768x307.png')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#D4791E]/90 via-[#D4791E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('kuliner-legendaris', '50+ Spot')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Kuliner Legendaris</h3>
            </div>
          </Link>

          {/* 15. Wisata Belanja Souvenir (Rose #B5566B, 1x2 - Col 2 Tall) */}
          <Link href="/kategori?cluster=belanja" className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Park Destination/Taman balai kota (Wastukencana)/permainan-untuk-anak.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#B5566B]/90 via-[#B5566B]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider border border-white/30">{getCount('belanja-souvenir', '12 Mall')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Belanja Souvenir</h3>
            </div>
          </Link>

          {/* 12. Wisata Religi dan Ziarah (Terracotta #8C5A3C, 1x1) */}
          <Link href="/kategori/wisata-religi" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Park Destination/Taman Persib ( jl Supratman)/ayobdg_revitalisasi-taman-persib_ncos-1-244815076.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#8C5A3C]/90 via-[#8C5A3C]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">16 Lokasi</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Religi &amp; Ziarah</h3>
            </div>
          </Link>

          {/* 14. Wisata Oleh-Oleh (Rose #B5566B, 1x1) */}
          <Link href="/kategori?cluster=belanja" className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Park Destination/Taman pet park (Cilaki)/pet-park-4.jpg')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#B5566B]/90 via-[#B5566B]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider border border-white/30">{getCount('belanja-souvenir', '35 Sentra')}</span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">Oleh-Oleh</h3>
            </div>
          </Link>

          {/* 13. Wisata Kuliner Malam (Amber #D4791E, 2x1) */}
          <Link href="/kategori?cluster=kuliner" className="md:col-span-2 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer border border-[#d3c5af]/50 shadow-[0_4px_20px_rgba(42,42,40,0.05)] h-full w-full block">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/ASET VISUAL/Wisata Bandung/Leisure destination/Margacinta park/IMG_1844.PNG')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#D4791E]/90 via-[#D4791E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full w-max mb-3 uppercase tracking-widest border border-white/30">{getCount('kuliner-malam', '10 Kawasan')}</span>
              <h3 className="text-2xl font-bold font-display text-white leading-tight">Kuliner Malam</h3>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
