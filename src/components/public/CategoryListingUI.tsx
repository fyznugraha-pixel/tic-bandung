"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, Search, X } from 'lucide-react';
import DestinationCard from '@/components/public/DestinationCard';

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  district: string | null;
  ticket_type: 'FREE' | 'PAID' | 'UNCONFIRMED';
  ticket_nominal: number | null;
  operating_hours: string | null;
  destination_images: { image_url: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color_cluster: string;
}

export default function CategoryListingUI({
  category,
  initialDestinations,
}: {
  category: Category;
  initialDestinations: Destination[];
}) {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<'FREE' | 'PAID' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique districts for the filter dropdown
  const uniqueDistricts = useMemo(() => {
    const districts = initialDestinations
      .map(d => d.district)
      .filter((d): d is string => d !== null && d.trim() !== '');
    return Array.from(new Set(districts)).sort();
  }, [initialDestinations]);

  // Filter logic (Client Side for speed - FR-03)
  const filteredDestinations = useMemo(() => {
    return initialDestinations.filter(dest => {
      const matchDistrict = selectedDistrict ? dest.district === selectedDistrict : true;
      const matchPrice = selectedPrice ? dest.ticket_type === selectedPrice : true;
      const matchSearch = searchQuery 
        ? dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (dest.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;
      
      return matchDistrict && matchPrice && matchSearch;
    });
  }, [initialDestinations, selectedDistrict, selectedPrice, searchQuery]);

  return (
    <main className="min-h-screen bg-[#fcf9f5]">
      {/* Header Banner - Dynamic Color Based on Category */}
      <div 
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ 
          backgroundColor: 
            category.color_cluster === 'green' ? '#3D7A5E' : 
            category.color_cluster === 'gold' ? '#C9971E' :
            category.color_cluster === 'blue' ? '#2C5C8A' :
            category.color_cluster === 'teal' ? '#2C7A7A' : '#4f4635'
        }}
      >
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <nav className="flex text-white/80 text-sm mb-6 items-center gap-2 font-medium">
            <Link className="hover:text-white transition-colors" href="/">Beranda</Link>
            <ChevronRight className="w-4 h-4" />
            <Link className="hover:text-white transition-colors" href="/kategori">Kategori</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Filter Bar (FR-03) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#d3c5af]/50 mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between sticky top-4 z-20">
          
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#7a5900] focus:ring-1 focus:ring-[#7a5900] outline-none transition-all text-[#1b1c1a]" 
              placeholder="Cari nama destinasi..." 
              type="text" 
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={selectedDistrict || ''} 
                onChange={(e) => setSelectedDistrict(e.target.value || null)}
                className="bg-transparent text-sm font-medium text-[#1b1c1a] outline-none cursor-pointer"
              >
                <option value="">Semua Kawasan</option>
                {uniqueDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedPrice(selectedPrice === 'FREE' ? null : 'FREE')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  selectedPrice === 'FREE' 
                    ? 'bg-[#3D7A5E] text-white border-[#3D7A5E]' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Gratis
              </button>
              <button 
                onClick={() => setSelectedPrice(selectedPrice === 'PAID' ? null : 'PAID')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  selectedPrice === 'PAID' 
                    ? 'bg-[#C9971E] text-white border-[#C9971E]' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Berbayar
              </button>
            </div>

            {(selectedDistrict || selectedPrice || searchQuery) && (
              <button 
                onClick={() => {
                  setSelectedDistrict(null);
                  setSelectedPrice(null);
                  setSearchQuery('');
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-auto md:ml-0"
                title="Reset Filters"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-[#4f4635] font-medium">
          Menampilkan <span className="text-[#1b1c1a] font-bold">{filteredDestinations.length}</span> destinasi
        </div>

        {/* Grid Layout (NFR-23 Reusability) */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard 
                key={dest.id} 
                destination={{
                  id: dest.id,
                  name: dest.name,
                  slug: dest.slug,
                  description: dest.description,
                  district: dest.district,
                  category: {
                    name: category.name,
                    color_cluster: category.color_cluster
                  },
                  image_url: dest.destination_images?.[0]?.image_url || null,
                  ticket_type: dest.ticket_type,
                  ticket_nominal: dest.ticket_nominal,
                  operating_hours: dest.operating_hours
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#d3c5af]">
            <p className="text-xl text-[#4f4635] mb-2">Pencarian Tidak Ditemukan</p>
            <p className="text-[#4f4635]/70">Coba ubah kata kunci atau hapus filter kawasan/harga.</p>
          </div>
        )}
      </div>
    </main>
  );
}
