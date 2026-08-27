import { createClient } from '@/utils/supabase/server';
import DashboardTable from '@/components/admin/DashboardTable';
import { LayoutDashboard, CheckCircle2, FileEdit, Plus, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard Admin | Pesona Bandung',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch all destinations with their primary image and category
  const { data: destinations, error } = await supabase
    .from('destinations')
    .select(`
      id,
      name,
      slug,
      status,
      created_at,
      categories (
        name,
        color_cluster
      ),
      destination_images (
        image_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Dashboard Fetch Error:", error);
  }

  const data = destinations || [];

  // Format data for the client component
  const formattedData = data.map(dest => ({
    id: dest.id,
    name: dest.name,
    slug: dest.slug,
    status: dest.status,
    category: dest.categories ? { 
      name: (dest.categories as any).name, 
      color_cluster: (dest.categories as any).color_cluster 
    } : null,
    image_url: dest.destination_images?.[0]?.image_url || null,
    created_at: dest.created_at,
  }));

  // Calculate Metrics
  const totalDestinations = formattedData.length;
  const publishedCount = formattedData.filter(d => d.status === 'PUBLISHED').length;
  const draftCount = formattedData.filter(d => d.status === 'DRAFT').length;

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-[#C9971E]" />
            Dashboard Utama
          </h1>
          <p className="text-gray-500 mt-2">Kelola seluruh data destinasi wisata Kota Bandung.</p>
        </div>
        
        <Link 
          href="/admin/destinasi/baru" 
          className="bg-[#3D7A5E] hover:bg-[#2c5c45] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Destinasi Baru
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
            <MapPin className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Destinasi</p>
            <p className="text-3xl font-display font-bold text-gray-900">{totalDestinations}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Aktif (Published)</p>
            <p className="text-3xl font-display font-bold text-gray-900">{publishedCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
            <FileEdit className="w-7 h-7 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Menunggu (Draft)</p>
            <p className="text-3xl font-display font-bold text-gray-900">{draftCount}</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Daftar Destinasi</h2>
      </div>
      
      <DashboardTable initialData={formattedData} />

    </div>
  );
}
