import Link from 'next/link';
import { ChevronRight, Bed, Map, Coffee } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'Kategori Wisata | TIC Kota Bandung',
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
        <div className="mb-16">
          <nav className="flex text-[#4f4635] text-sm mb-6 items-center gap-2 font-medium">
            <Link className="hover:text-[#7a5900] transition-colors" href="/">Home</Link>
            <ChevronRight className="w-4 h-4 text-[#4f4635]" />
            <span className="text-[#1b1c1a]">Destinasi Wisata</span>
          </nav>
          <h1 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-[#1b1c1a] mb-6 tracking-tight`}>Eksplorasi Kota Bandung</h1>
          <div className="w-20 h-1 bg-[#C9971E] mb-6"></div>
          <p className="text-lg text-[#4f4635] max-w-2xl">Temukan beragam TIC Kota Bandung melalui panduan destinasi pilihan kami yang terbagi dalam tiga pilar utama pengalaman wisata.</p>
        </div>

        {/* CLUSTER 1: Where to Stay & Relax */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2C5C8A]/10 rounded-xl flex items-center justify-center">
              <Bed className="w-6 h-6 text-[#2C5C8A]" />
            </div>
            <div>
              <h2 className={`${montserrat.className} text-3xl font-bold text-slate-900`}>Where to Stay & Relax</h2>
              <p className="text-slate-600">Hotel, Spa, dan Pariwisata Medis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <Link href="/kategori/hotel" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#2C5C8A]/20 transition-colors duration-700 group-hover:bg-[#2C5C8A]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#2C5C8A] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('hotel', '24 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Hotel & Penginapan</h3>
              </div>
            </Link>
            <Link href="/kategori/spa" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#2C5C8A]/20 transition-colors duration-700 group-hover:bg-[#2C5C8A]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#2C5C8A] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('spa', '12 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Relaksasi & Spa</h3>
              </div>
            </Link>
            <Link href="/kategori/medical-tourism" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#2C5C8A]/20 transition-colors duration-700 group-hover:bg-[#2C5C8A]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#2C5C8A] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('medical', '8 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Medical Tourism</h3>
              </div>
            </Link>
          </div>
        </section>

        {/* CLUSTER 2: Things to Do & Explore */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#3D7A5E]/10 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6 text-[#3D7A5E]" />
            </div>
            <div>
              <h2 className={`${montserrat.className} text-3xl font-bold text-slate-900`}>Things to Do & Explore</h2>
              <p className="text-slate-600">Rekreasi, Sejarah, Seni, Religi, Olahraga & Walking Tour</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
            <Link href="/kategori/wisata-buatan" className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('wisata-buatan', '15 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Rekreasi & Edukasi</h3>
              </div>
            </Link>
            <Link href="/kategori/sejarah" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('sejarah', '18 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Wisata Sejarah</h3>
              </div>
            </Link>
            <Link href="/kategori/museum" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('museum', '19 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Museum</h3>
              </div>
            </Link>
            <Link href="/kategori/wisata-art-space" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('wisata-art-space', '10 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Art Gallery</h3>
              </div>
            </Link>
            <Link href="/kategori/wisata-religi" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('wisata-religi', '12 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Wisata Religi</h3>
              </div>
            </Link>
            <Link href="/kategori/walking-tour" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('walking-tour', '5 Rute')}</span>
                <h3 className="text-2xl font-bold text-white">Walking Tour</h3>
              </div>
            </Link>
            <Link href="/kategori/olahraga" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#3D7A5E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('olahraga', '9 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Olahraga</h3>
              </div>
            </Link>
          </div>
        </section>

        {/* CLUSTER 3: Lifestyle, Eat & Space */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#C9971E]/10 rounded-xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-[#C9971E]" />
            </div>
            <div>
              <h2 className={`${montserrat.className} text-3xl font-bold text-slate-900`}>Lifestyle, Eat & Space</h2>
              <p className="text-slate-600">Kuliner, Belanja, Kampung Kreatif & Co-Working Space</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
            <Link href="/kategori?cluster=kuliner" className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#C9971E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('kuliner', '50+ Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Kuliner & Kafe</h3>
              </div>
            </Link>
            <Link href="/kategori/wisata-sentra-belanja" className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#C9971E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('wisata-sentra-belanja', '22 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Belanja & Fesyen</h3>
              </div>
            </Link>
            <Link href="/kategori/wisata-ekonomi-kreatif" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#C9971E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('wisata-ekonomi-kreatif', '17 Sektor')}</span>
                <h3 className="text-2xl font-bold text-white">Oleh-oleh & Ekraf</h3>
              </div>
            </Link>
            <Link href="/kategori/kampung-wisata-kreatif" className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#C9971E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('kampung-wisata-kreatif', '8 Kampung')}</span>
                <h3 className="text-2xl font-bold text-white">Kampung Kreatif</h3>
              </div>
            </Link>
            <Link href="/kategori/coworking" className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-800">
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="bg-[#C9971E] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2">{getCount('coworking', '14 Lokasi')}</span>
                <h3 className="text-2xl font-bold text-white">Co-Working & Creative Space</h3>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
