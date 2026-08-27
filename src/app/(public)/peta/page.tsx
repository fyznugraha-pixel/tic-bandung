import { createClient } from '@/utils/supabase/server';
import MapClientWrapper from '@/components/public/MapClientWrapper';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Peta Interaktif Wisata | Pesona Bandung',
  description: 'Jelajahi seluruh destinasi wisata di Kota Bandung melalui peta interaktif.',
};

export default async function PetaPage() {
  const supabase = await createClient();

  // Fetch all published destinations with coordinates
  const { data: destinations } = await supabase
    .from('destinations')
    .select(`
      id, 
      name, 
      slug, 
      latitude, 
      longitude, 
      district,
      ticket_type,
      ticket_nominal,
      categories (
        name,
        color_cluster
      ),
      destination_images (
        image_url
      )
    `)
    .eq('status', 'PUBLISHED')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  // Map data to match MapClient props
  const formattedDestinations = (destinations || []).map(dest => ({
    id: dest.id,
    name: dest.name,
    slug: dest.slug,
    latitude: dest.latitude,
    longitude: dest.longitude,
    district: dest.district,
    ticket_type: dest.ticket_type,
    ticket_nominal: dest.ticket_nominal,
    category: {
      name: dest.categories?.name || 'Uncategorized',
      color_cluster: dest.categories?.color_cluster || 'default',
    },
    image_url: dest.destination_images?.[0]?.image_url || null,
  }));

  return (
    <main className="w-full h-screen relative flex flex-col">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <Link href="/" className="bg-white/90 backdrop-blur-md hover:bg-white text-[#1b1c1a] px-4 py-2.5 rounded-full shadow-lg border border-white/20 font-bold text-sm flex items-center gap-2 transition-all">
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
        
        {/* Legend / Key */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 pointer-events-auto hidden md:block">
          <h3 className="text-xs font-bold text-[#1b1c1a] mb-3 uppercase tracking-wider">Kategori Klaster</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#4f4635]">
              <span className="w-3 h-3 rounded-full bg-[#3D7A5E]"></span> Alam & Taman
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4f4635]">
              <span className="w-3 h-3 rounded-full bg-[#C9971E]"></span> Budaya & Belanja
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4f4635]">
              <span className="w-3 h-3 rounded-full bg-[#2C5C8A]"></span> Rekreasi Buatan
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4f4635]">
              <span className="w-3 h-3 rounded-full bg-[#2C7A7A]"></span> Seni & Religi
            </div>
          </div>
        </div>
      </div>

      {/* The Map itself takes up the whole screen */}
      <div className="flex-1 w-full h-full z-0 relative">
        <MapClientWrapper destinations={formattedDestinations} />
      </div>
    </main>
  );
}
