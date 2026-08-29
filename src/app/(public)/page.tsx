import Link from 'next/link';
import { Search, Map, Utensils, Sun, Landmark, Calendar, MapPin, Bus, Star, Compass, Download, Heart, ArrowRight, Camera, ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import HeroSlider from '@/components/home/HeroSlider';
import { createClient } from '@/utils/supabase/server';
import { Montserrat } from 'next/font/google';
import { ScrollReveal } from '@/components/ui/animations/ScrollReveal';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export const dynamic = 'force-dynamic';

export const revalidate = 0;

export default async function LandingPage() {
  const supabase = await createClient();

  // Fetch Hero Sliders
  const { data: heroSliders } = await supabase
    .from('hero_sliders')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  // Fetch News Articles
  const { data: newsArticles } = await supabase
    .from('news_articles')
    .select('*')
    .eq('status', 'published')
    .order('date_published', { ascending: false })
    .limit(3);

  // Fetch Galleries
  const { data: galleries } = await supabase
    .from('galleries')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .limit(4);

  // Fetch specific destinations to integrate images dynamically while keeping layout static
  const { data: staticDests } = await supabase
    .from('destinations')
    .select('slug, images')
    .in('slug', ['gedung-sate', 'alun-alun-bandung', 'jalan-braga']);

  const getDestImg = (slug: string) => {
    const dest = staticDests?.find((d) => d.slug === slug);
    return dest && dest.images && dest.images.length > 0 ? dest.images[0] : null;
  };

  // Default sliders sebagai fallback dengan gambar yang valid!
  const defaultSliders = [
    {
      id: 'default-1',
      title: "Gedung Sate",
      subtitle: "Ikon bersejarah perpaduan arsitektur Eropa dan Nusantara di jantung kota.",
      image_url: "/gedung-sate.webp",
      button_link: "/destinasi/gedung-sate"
    },
    {
      id: 'default-2',
      title: "Jalan Asia Afrika",
      subtitle: "Saksi bisu Konferensi Asia Afrika dengan pesona malam yang romantis.",
      image_url: "/ASET VISUAL/jalan-asia-afrika.jpg",
      button_link: "/destinasi/jalan-asia-afrika"
    },
    {
      id: 'default-3',
      title: "Bandros",
      subtitle: "Jelajahi keindahan alam, budaya, dan kuliner legendaris Parijs van Java.",
      image_url: "/ASET VISUAL/bandros.jpg",
      button_link: "/kategori"
    },
    {
      id: 'default-4',
      title: "Boseh",
      subtitle: "Nikmati udara segar dan keindahan kota Bandung dengan bersepeda santai.",
      image_url: "/ASET VISUAL/boseh.jpg",
      button_link: "/transportasi"
    }
  ];

  // Gunakan data dari CMS jika ada, jika tidak gunakan default
  const activeSliders = (heroSliders && heroSliders.length > 0) ? heroSliders : defaultSliders;

  // Default fallback data for news if empty
  const defaultNews = [
    {
      id: 'news-1',
      category: "Tips Liburan", 
      color_theme: "emerald",
      title: "Panduan Lengkap Wisata Keluarga di Kota Bandung Akhir Pekan",
      date_published: "2026-08-12T00:00:00Z",
      image_url: null
    },
    {
      id: 'news-2',
      category: "Tourism Update", 
      color_theme: "blue",
      title: "Persiapan Kota Bandung Menyambut Konferensi Internasional 2027",
      date_published: "2026-08-10T00:00:00Z",
      image_url: null
    },
    {
      id: 'news-3',
      category: "Kuliner Lokal", 
      color_theme: "amber",
      title: "5 Kafe Legendaris di Jalan Braga yang Wajib Anda Kunjungi",
      date_published: "2026-08-08T00:00:00Z",
      image_url: null
    }
  ];

  const activeNews = (newsArticles && newsArticles.length > 0) ? newsArticles : defaultNews;

  return (
    <main className="min-h-screen bg-[#fcf9f5] overflow-hidden">
      <HeroSlider sliders={activeSliders} />

      {/* 10. BERITA & ARTIKEL WISATA (Tourism Update) */}
      <section className="w-full pt-32 pb-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
        <ScrollReveal className="flex flex-col items-center mb-16">
          <span className="text-[#C9971E] font-bold tracking-widest uppercase text-sm mb-4">Update Terkini</span>
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 tracking-tight`}>Berita & Artikel Wisata</h2>
          <div className="w-24 h-1.5 bg-[#C9971E] rounded-full"></div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeNews && activeNews.length > 0 ? (
            activeNews.map((item, i) => (
               <ScrollReveal key={item.id} delay={i * 0.1} className="h-full">
                 <Link href={`/berita/${item.slug || '#'}`} className="clay-card group cursor-pointer flex flex-col h-full overflow-hidden block">
                   <div className="h-64 relative overflow-hidden bg-slate-200 flex flex-col items-center justify-center">
                     {item.image_url ? (
                       <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt={item.title} />
                     ) : (
                       <ImageIcon className="w-12 h-12 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                     )}
                     
                     <div className="absolute top-4 left-4">
                       <span className={`text-xs font-bold text-white bg-${item.color_theme || 'blue'}-600 px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm`}>{item.category}</span>
                     </div>
                   </div>
                   <div className="p-8 flex flex-col flex-grow justify-between">
                     <div>
                       <h3 className={`${montserrat.className} text-xl font-bold text-slate-900 mb-4 group-hover:text-[#C9971E] transition-colors line-clamp-3 leading-snug`}>{item.title}</h3>
                     </div>
                     <div className="flex items-center justify-between mt-4">
                       <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-slate-400" /> {new Date(item.date_published).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                       </span>
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#C9971E] transition-colors duration-500">
                         <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                       </div>
                     </div>
                   </div>
                 </Link>
               </ScrollReveal>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-500">Belum ada berita wisata terbaru.</div>
          )}
        </div>
      </section>

      {/* REKOMENDASI DESTINASI WISATA (Still Hardcoded to destinations logic - skipping for CMS home content) */}
      <section className="w-full pb-32 pt-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4">Eksplorasi</span>
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 tracking-tight`}>Rekomendasi Destinasi</h2>
          <div className="w-24 h-1.5 bg-[#3D7A5E] rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[900px] md:h-[650px]">
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-2 block shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/gedung-sate">
            {getDestImg('gedung-sate') ? (
              <img src={getDestImg('gedung-sate')!} alt="Gedung Sate" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <div className="absolute inset-0 bg-[#C9971E]/20 transition-colors duration-700 group-hover:bg-[#C9971E]/40 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/20" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="bg-[#C9971E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">Ikon Kota</span>
              <h3 className={`${montserrat.className} text-4xl font-bold text-white mb-2`}>Gedung Sate</h3>
              <p className="text-white/80 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 overflow-hidden transition-all duration-500 line-clamp-2 max-w-md">Simbol kebanggaan masyarakat Jawa Barat yang menyimpan nilai sejarah panjang sejak era kolonial.</p>
            </div>
          </Link>
          
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-1 block shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/alun-alun-bandung">
            {getDestImg('alun-alun-bandung') ? (
              <img src={getDestImg('alun-alun-bandung')!} alt="Alun-Alun Bandung" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white/20" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="bg-[#3D7A5E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">Alam & Rekreasi</span>
              <h3 className={`${montserrat.className} text-2xl font-bold text-white`}>Alun-Alun Bandung</h3>
            </div>
          </Link>
          
          <Link className="group relative rounded-3xl overflow-hidden md:col-span-1 md:row-span-1 block shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-slate-800" href="/destinasi/jalan-braga">
            {getDestImg('jalan-braga') ? (
              <img src={getDestImg('jalan-braga')!} alt="Jalan Braga" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <div className="absolute inset-0 bg-[#2C5C8A]/20 transition-colors duration-700 group-hover:bg-[#2C5C8A]/40 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-white/20" />
              </div>
            )}

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

            {/* 11. BENTO GRID GALERI FOTO */}
      <ScrollReveal>
      <section className="w-full py-24 md:py-32 bg-[#fcf9f5]">
        <div className="max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">
                <Camera className="w-4 h-4" /> Pesona Visual
              </span>
              <h2 className={`${montserrat.className} text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight`}>Galeri Kota</h2>
              <div className="w-24 h-1.5 bg-[#3D7A5E] rounded-full"></div>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-3 text-slate-600 font-bold hover:text-[#3D7A5E] transition-colors px-6 py-3 rounded-full bg-white shadow-sm border border-slate-200 hover:border-[#3D7A5E]/30 hover:shadow-md">
              Jelajahi Semua <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[650px]">
            {true ? (
               Array.from({ length: 4 }).map((_, index) => {
                 const gallery = galleries && galleries[index];
                 
                 let bentoClass = "";
                 if (index === 0) bentoClass = "md:col-span-2 md:row-span-2"; // 1. Large Square Left
                 else if (index === 1) bentoClass = "md:col-span-2 md:row-span-1"; // 2. Wide Rectangle Top Right
                 else if (index === 2) bentoClass = "md:col-span-1 md:row-span-1"; // 3. Small Square Bottom Middle
                 else if (index === 3) bentoClass = "md:col-span-1 md:row-span-1"; // 4. Small Square Bottom Right

                 if (!gallery) {
                   return (
                     <div key={`dummy-${index}`} className={`${bentoClass} rounded-3xl overflow-hidden relative group shadow-lg bg-slate-200 flex items-center justify-center min-h-[250px]`}>
                       <ImageIcon className="w-12 h-12 text-slate-400 opacity-50" />
                     </div>
                   );
                 }

                 return (
                   <div key={gallery.id} className={`${bentoClass} rounded-3xl overflow-hidden relative group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-slate-800 flex items-center justify-center min-h-[250px]`}>
                     <img src={gallery.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={gallery.title} />
                     
                     {/* Overlay exactly like destinations */}
                     <div className="absolute inset-0 bg-[#3D7A5E]/20 transition-colors duration-700 group-hover:bg-[#3D7A5E]/40 opacity-0 group-hover:opacity-100"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1a]/90 via-[#1b1c1a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                     
                     {/* Content styled like destinations */}
                     <div className="absolute bottom-0 left-0 p-8 md:p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 w-full text-left">
                       <span className="bg-[#3D7A5E] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 md:mb-4 inline-block shadow-sm">
                         {gallery.category}
                       </span>
                       <h3 className={`${montserrat.className} ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-bold text-white leading-tight`}>
                         {gallery.title}
                       </h3>
                     </div>
                   </div>
                 );
               })
            ) : null}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </main>
  );
}

