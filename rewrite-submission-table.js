const fs = require('fs');
const content = `"use client";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

import { useState, useTransition } from 'react';
import { updateSubmissionStatusAction } from '@/app/actions/eventSubmission';
import { ExternalLink, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

type SubmissionData = {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  pic_name: string;
  eo_name: string;
  email: string;
  whatsapp: string;
  location: string;
  description: string;
  instagram: string;
  kol_partner: string;
  artist_performance: string;
  usp: string;
  target_visitors: number;
  execution_count: number;
  promotion_media: string;
  attachment_link: string;
  commitment_letter_link: string;
  status: string;
  created_at: string;
};

export default function EventSubmissionTable({ initialData }: { initialData: SubmissionData[] }) {
  const [data, setData] = useState<SubmissionData[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const confirmResult = await Swal.fire({
      title: 'Konfirmasi',
      text: \`Apakah Anda yakin ingin mengubah status menjadi \${status}?\`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#858796',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (!confirmResult.isConfirmed) return;
    
    startTransition(async () => {
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

  const showDetail = (item: SubmissionData) => {
    Swal.fire({
      title: 'Detail Pengajuan Event',
      html: \`
        <div style="text-align: left; font-size: 14px; max-height: 60vh; overflow-y: auto; padding: 10px;">
          <h4 style="margin-top:0; color:#3D7A5E; font-weight:bold;">1. Informasi Acara</h4>
          <p><b>Judul:</b> \${item.title || '-'}</p>
          <p><b>Tanggal Mulai:</b> \${item.start_date ? new Date(item.start_date).toLocaleDateString() : '-'}</p>
          <p><b>Tanggal Selesai:</b> \${item.end_date ? new Date(item.end_date).toLocaleDateString() : '-'}</p>
          <p><b>Lokasi:</b> \${item.location || '-'}</p>
          <p><b>Deskripsi:</b> \${item.description || '-'}</p>
          
          <h4 style="margin-top:20px; color:#3D7A5E; font-weight:bold;">2. Pelaksana & PIC</h4>
          <p><b>EO/Komunitas:</b> \${item.eo_name || '-'}</p>
          <p><b>PIC:</b> \${item.pic_name || '-'}</p>
          <p><b>Email:</b> \${item.email || '-'}</p>
          <p><b>WhatsApp:</b> \${item.whatsapp || '-'}</p>

          <h4 style="margin-top:20px; color:#3D7A5E; font-weight:bold;">3. Detail & Promosi</h4>
          <p><b>Instagram:</b> \${item.instagram || '-'}</p>
          <p><b>KOL:</b> \${item.kol_partner || '-'}</p>
          <p><b>Line Up Artis:</b> \${item.artist_performance || '-'}</p>
          <p><b>Nilai Jual Unik (USP):</b> \${item.usp || '-'}</p>
          <p><b>Target Pengunjung:</b> \${item.target_visitors || '-'}</p>
          <p><b>Pelaksanaan Ke-:</b> \${item.execution_count || '-'}</p>

          <h4 style="margin-top:20px; color:#3D7A5E; font-weight:bold;">4. Lampiran</h4>
          <p><b>Media Promosi:</b> <a href="\${item.promotion_media || '#'}" target="_blank" style="color: blue;">Lihat Media</a></p>
          <p><b>Proposal/Poster:</b> \${item.attachment_link ? \`<a href="\${item.attachment_link}" target="_blank" style="color: blue;">Unduh Proposal</a>\` : 'Tidak ada'}</p>
          <p><b>Surat Kesediaan:</b> \${item.commitment_letter_link ? \`<a href="\${item.commitment_letter_link}" target="_blank" style="color: blue;">Unduh Surat</a>\` : 'Tidak ada'}</p>
        </div>
      \`,
      width: 600,
      showCloseButton: true,
      showConfirmButton: item.status === 'PENDING',
      showDenyButton: item.status === 'PENDING',
      confirmButtonText: 'Terima (Approve)',
      confirmButtonColor: '#10b981',
      denyButtonText: 'Tolak (Reject)',
      cancelButtonText: 'Tutup'
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateStatus(item.id, "APPROVED");
      } else if (result.isDenied) {
        handleUpdateStatus(item.id, "REJECTED");
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
              <th className="p-4">Acara</th>
              <th className="p-4">PIC & EO</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
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
                    <p className="font-bold text-gray-900">{item.title || '-'}</p>
                    <p className="text-xs text-gray-500">{item.start_date ? new Date(item.start_date).toLocaleDateString('id-ID') : '-'}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-bold text-gray-700">{item.pic_name}</p>
                    <p className="text-xs text-gray-500">{item.eo_name}</p>
                  </td>
                  
                  <td className="p-4">
                    <span className={\`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md \${
                      item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      item.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }\`}>
                      {item.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                      {item.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                      {item.status === 'PENDING' && <Clock className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => showDetail(item)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors border border-blue-200 flex items-center justify-center gap-1 ml-auto"
                    >
                      <Eye className="w-3 h-3" /> Lihat Detail
                    </button>
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
`;

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
