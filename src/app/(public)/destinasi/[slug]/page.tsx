import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Ticket, ChevronRight, Navigation } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const supabase = await createClient();
  
  const { data: destination } = await supabase
    .from('destinations')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!destination) return { title: 'Destinasi Tidak Ditemukan' };

  return {
    title: `${destination.name} | Pesona Bandung`,
    description: destination.description || `Informasi lengkap mengenai ${destination.name} di Kota Bandung.`,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const supabase = await createClient();

  // Fetch Destination details, images, and category
  const { data: dest, error } = await supabase
    .from('destinations')
    .select(`
      *,
      categories (
        name,
        slug,
        color_cluster
      ),
      destination_images (
        image_url,
        source_photo_credit
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !dest) {
    notFound();
  }

  const category = dest.categories;
  const primaryImage = dest.destination_images?.[0];

  // Helper to get color hex
  const getCategoryColor = (cluster: string) => {
    if (cluster === 'green') return '#3D7A5E';
    if (cluster === 'gold') return '#C9971E';
    if (cluster === 'blue') return '#2C5C8A';
    if (cluster === 'teal') return '#2C7A7A';
    return '#4f4635';
  };

  const themeColor = getCategoryColor(category?.color_cluster || '');

  return (
    <main className="w-full bg-[#fcf9f5] min-h-screen">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-900">
        <Image
          src={primaryImage?.image_url || 'https://images.unsplash.com/photo-1549473889-14f410d83298?q=80&w=2000'}
          alt={dest.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 flex flex-col justify-end">
          <div className="max-w-[1200px] mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex text-white/80 text-sm mb-4 items-center gap-2 font-medium">
              <Link className="hover:text-white transition-colors" href="/">Beranda</Link>
              <ChevronRight className="w-4 h-4" />
              <Link className="hover:text-white transition-colors" href="/kategori">Kategori</Link>
              <ChevronRight className="w-4 h-4" />
              {category && (
                <>
                  <Link className="hover:text-white transition-colors" href={`/kategori/${category.slug}`}>{category.name}</Link>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-white line-clamp-1">{dest.name}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-2 leading-tight">
              {dest.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5 text-[#C9971E]" />
              <span className="text-lg">{dest.district || 'Bandung'}</span>
            </div>
          </div>
        </div>

        {/* NFR-11 Photo Credit */}
        {primaryImage?.source_photo_credit && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white/70 text-[10px] px-2 py-1 rounded">
            Foto oleh: {primaryImage.source_photo_credit}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#d3c5af]/50 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1b1c1a] mb-4">Tentang {dest.name}</h2>
              <div className="prose prose-lg text-[#4f4635] leading-relaxed max-w-none">
                {dest.description ? (
                  dest.description.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))
                ) : (
                  <p className="italic">Belum ada deskripsi untuk destinasi ini.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Info Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#d3c5af]/50 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-[#1b1c1a] mb-6 border-b border-[#f6f3f0] pb-4">Informasi Penting</h3>
              
              <div className="space-y-6">
                
                {/* Harga Tiket (NFR-09) */}
                {dest.ticket_type !== 'UNCONFIRMED' && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#3D7A5E]/10 flex items-center justify-center shrink-0">
                      <Ticket className="w-5 h-5 text-[#3D7A5E]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4f4635] uppercase tracking-wider mb-1">Harga Tiket</p>
                      <p className="font-semibold text-lg text-[#1b1c1a]">
                        {dest.ticket_type === 'FREE' ? (
                          <span className="text-[#3D7A5E]">Gratis</span>
                        ) : dest.ticket_nominal ? (
                          new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dest.ticket_nominal)
                        ) : (
                          'Berbayar'
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Jam Operasional */}
                {dest.operating_hours && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4f4635] uppercase tracking-wider mb-1">Jam Buka</p>
                      {/* Simple rendering for now. In a real app, parse the JSON and format it nicely */}
                      <p className="font-medium text-sm text-[#1b1c1a] whitespace-pre-wrap">
                        {typeof dest.operating_hours === 'string' 
                          ? dest.operating_hours 
                          : JSON.stringify(dest.operating_hours, null, 2).replace(/["{}]/g, '')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Alamat Lanjutan */}
                {dest.address && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9971E]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#C9971E]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4f4635] uppercase tracking-wider mb-1">Alamat Lokasi</p>
                      <p className="font-medium text-sm text-[#1b1c1a] leading-relaxed">
                        {dest.address}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Button: Google Maps */}
              {dest.latitude && dest.longitude && (
                <div className="mt-8 pt-6 border-t border-[#f6f3f0]">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                    style={{ backgroundColor: themeColor }}
                  >
                    <Navigation className="w-5 h-5" />
                    Petunjuk Arah (Maps)
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
