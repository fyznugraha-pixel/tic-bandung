"use client";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

import { useState, useTransition } from 'react';
import { updateSubmissionStatusAction } from '@/app/actions/eventSubmission';
import { ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

type SubmissionData = {
  id: string;
  pic_name: string;
  eo_name: string;
  email: string;
  whatsapp: string;
  attachment_link: string;
  status: string;
  created_at: string;
};

export default function EventSubmissionTable({ initialData }: { initialData: SubmissionData[] }) {
  const [data, setData] = useState<SubmissionData[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const confirmResult = await Swal.fire({
      title: 'Konfirmasi',
      text: `Apakah Anda yakin ingin mengubah status menjadi ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#858796',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (!confirmResult.isConfirmed) return;startTransition(async () => {
      const result = await updateSubmissionStatusAction(id, status);
      if (result.error) {
        toast.error(result.error);
      } else {
        setData(prev => prev.map(item => 
          item.id === id ? { ...item, status: status } : item
        ));
      }
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
              <th className="p-4 pl-6">Tanggal Masuk</th>
              <th className="p-4">Pengirim (PIC & EO)</th>
              <th className="p-4">Kontak</th>
              <th className="p-4">Materi (Link)</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  Belum ada pendaftaran event yang masuk.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{item.pic_name}</p>
                    <p className="text-xs text-gray-500">{item.eo_name}</p>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${item.email}`} className="text-sm text-blue-600 hover:underline">Email</a>
                      <a href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline">WhatsApp</a>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <a 
                      href={item.attachment_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                      item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      item.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                      {item.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                      {item.status === 'PENDING' && <Clock className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="p-4 pr-6 text-right">
                    {item.status === 'PENDING' && (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(item.id, "APPROVED")}
                          disabled={isPending}
                          className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold rounded-lg transition-colors border border-green-200"
                        >
                          Terima
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(item.id, "REJECTED")}
                          disabled={isPending}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg transition-colors border border-red-200"
                        >
                          Tolak
                        </button>
                      </div>
                    )}
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
