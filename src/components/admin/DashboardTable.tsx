"use client";
import Swal from 'sweetalert2';

import { useState, useTransition } from 'react';
import { togglePublishStatusAction } from '@/app/actions/dashboard';
import { deleteDestinationAction } from '@/app/actions/destination';
import { Trash2, Edit2, ExternalLink, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationData {
  id: string;
  name: string;
  slug: string;
  status: string;
  category: { name: string; cluster_color: string } | null;
  image_url: string | null;
  created_at: string;
}

export default function DashboardTable({ initialData, allCategories }: { initialData: DestinationData[], allCategories: {name: string}[] }) {
  const [data, setData] = useState<DestinationData[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categoryTabs = ['Semua', ...allCategories.map(c => c.name), 'Tanpa Kategori'];
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredData = activeTab === 'Semua' 
    ? data 
    : data.filter(item => (item.category?.name || 'Tanpa Kategori') === activeTab);

  const handleDelete = async (id: string, name: string) => {
    const confirmResult = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: `Peringatan! Apakah Anda yakin ingin menghapus destinasi "${name}"? Tindakan ini tidak bisa dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#858796',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });
    if (!confirmResult.isConfirmed) return;// Optimistic UI update
    setData(prev => prev.filter(item => item.id !== id));
    
    startTransition(async () => {
      const result = await deleteDestinationAction(id);
      if (result.error) {
        setErrorMsg(`Gagal menghapus: ${result.error}`);
        // Revert data if failed (simple reload strategy for safety)
        window.location.reload();
      }
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    // Optimistic UI update
    setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));

    startTransition(async () => {
      const result = await togglePublishStatusAction(id, currentStatus);
      if (result.error) {
        setErrorMsg(`Gagal mengubah status: ${result.error}`);
        // Revert data if failed
        setData(prev => prev.map(item => item.id === id ? { ...item, status: currentStatus } : item));
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {errorMsg && (
        <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertCircle className="w-5 h-5" />
          {errorMsg}
          <button onClick={() => setErrorMsg(null)} className="ml-auto underline">Tutup</button>
        </div>
      )}

      <div className="flex items-center gap-2 p-4 border-b border-gray-100 overflow-x-auto no-scrollbar">
        {categoryTabs.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === cat 
                ? 'bg-[#3D7A5E] text-white shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <th className="p-4 pl-6">Destinasi</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Status</th>
              <th className="p-4">Tanggal Dibuat</th>
              <th className="p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  Belum ada destinasi yang ditambahkan di kategori ini.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        {item.image_url ? (
                          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">/{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    {item.category ? (
                      <span 
                        className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white"
                        style={{ 
                          backgroundColor: 
                            item.category.cluster_color === 'green' ? '#3D7A5E' : 
                            item.category.cluster_color === 'gold' ? '#C9971E' :
                            item.category.cluster_color === 'blue' ? '#2C5C8A' :
                            item.category.cluster_color === 'teal' ? '#2C7A7A' : '#4f4635'
                        }}
                      >
                        {item.category.name}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Tanpa Kategori</span>
                    )}
                  </td>
                  
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggleStatus(item.id, item.status)}
                      disabled={isPending}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border transition-all ${
                        item.status === 'published' 
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                          : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                      }`}
                      title="Klik untuk mengubah status"
                    >
                      {item.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {item.status}
                    </button>
                  </td>
                  
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/destinasi/${item.slug}`} 
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat di Web Publik"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      
                      <Link 
                        href={`/admin/destinasi/edit/${item.id}`}
                        className="p-2 text-gray-400 hover:text-[#C9971E] hover:bg-[#C9971E]/10 rounded-lg transition-colors"
                        title="Edit Destinasi"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      
                      <button 
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={isPending}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Destinasi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
