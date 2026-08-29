const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

const newShowDetail = `
  const showDetail = (item: SubmissionData) => {
    Swal.fire({
      title: '<span style="font-size: 1.25rem; font-weight: 700; color: #111827;">Detail Pengajuan Event</span>',
      html: \`
        <div style="text-align: left; font-size: 14px; max-height: 65vh; overflow-y: auto; padding: 5px; color: #374151; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Section 1 -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; color: #0f172a; font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span style="background: #e2e8f0; color: #475569; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px;">1</span>
              Informasi Acara
            </h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
              <div><span style="color: #64748b; font-size: 12px; display: block;">Judul</span><strong style="color: #0f172a;">\${item.title || '-'}</strong></div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div><span style="color: #64748b; font-size: 12px; display: block;">Tanggal Mulai</span><strong style="color: #0f172a;">\${item.start_date ? new Date(item.start_date).toLocaleDateString('id-ID') : '-'}</strong></div>
                <div><span style="color: #64748b; font-size: 12px; display: block;">Tanggal Selesai</span><strong style="color: #0f172a;">\${item.end_date ? new Date(item.end_date).toLocaleDateString('id-ID') : '-'}</strong></div>
              </div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Lokasi</span><strong style="color: #0f172a;">\${item.location || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Deskripsi</span><span style="color: #334155; line-height: 1.5; display: block; margin-top: 4px;">\${item.description || '-'}</span></div>
            </div>
          </div>

          <!-- Section 2 -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; color: #0f172a; font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span style="background: #e2e8f0; color: #475569; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px;">2</span>
              Pelaksana & PIC
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div><span style="color: #64748b; font-size: 12px; display: block;">EO/Komunitas</span><strong style="color: #0f172a;">\${item.eo_name || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Nama PIC</span><strong style="color: #0f172a;">\${item.pic_name || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Email</span><strong style="color: #0f172a;">\${item.email || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">WhatsApp</span><strong style="color: #0f172a;">\${item.whatsapp || '-'}</strong></div>
            </div>
          </div>

          <!-- Section 3 -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; color: #0f172a; font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span style="background: #e2e8f0; color: #475569; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px;">3</span>
              Detail Tambahan
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div><span style="color: #64748b; font-size: 12px; display: block;">Instagram</span><strong style="color: #0f172a;">\${item.instagram || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">KOL</span><strong style="color: #0f172a;">\${item.kol_partner || '-'}</strong></div>
              <div style="grid-column: span 2;"><span style="color: #64748b; font-size: 12px; display: block;">Line Up Artis</span><strong style="color: #0f172a;">\${item.artist_performance || '-'}</strong></div>
              <div style="grid-column: span 2;"><span style="color: #64748b; font-size: 12px; display: block;">Nilai Jual Unik (USP)</span><span style="color: #334155; line-height: 1.5; display: block; margin-top: 4px;">\${item.usp || '-'}</span></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Target Pengunjung</span><strong style="color: #0f172a;">\${item.target_visitors || '-'}</strong></div>
              <div><span style="color: #64748b; font-size: 12px; display: block;">Pelaksanaan Ke-</span><strong style="color: #0f172a;">\${item.execution_count || '-'}</strong></div>
            </div>
          </div>

          <!-- Section 4 -->
          <div style="background: #f0fdf4; border: 1px dashed #4ade80; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 12px 0; color: #166534; font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span style="background: #dcfce7; color: #166534; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px;">4</span>
              Berkas Lampiran
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="\${item.promotion_media || '#'}" target="_blank" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; text-decoration: none; font-weight: 600; font-size: 13px;">
                <span>Media Promosi (Drive)</span>
                <span>Buka &rarr;</span>
              </a>
              \${item.attachment_link ? \`
              <a href="\${item.attachment_link}" target="_blank" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; text-decoration: none; font-weight: 600; font-size: 13px;">
                <span>Proposal/Poster</span>
                <span>Buka &rarr;</span>
              </a>\` : ''}
              \${item.commitment_letter_link ? \`
              <a href="\${item.commitment_letter_link}" target="_blank" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; text-decoration: none; font-weight: 600; font-size: 13px;">
                <span>Surat Kesediaan</span>
                <span>Buka &rarr;</span>
              </a>\` : ''}
            </div>
          </div>

        </div>
      \`,
      width: 650,
      showCloseButton: true,
      showConfirmButton: item.status === 'PENDING',
      showDenyButton: item.status === 'PENDING',
      confirmButtonText: 'Terima (Approve)',
      confirmButtonColor: '#10b981',
      denyButtonText: 'Tolak (Reject)',
      cancelButtonText: 'Tutup'
    }).then((result) => {`;

const oldShowDetailRegex = /const showDetail = \(item: SubmissionData\) => \{[\s\S]*?cancelButtonText: 'Tutup'\n\s*\}\)\.then\(\(result\) => \{/;
content = content.replace(oldShowDetailRegex, newShowDetail);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed modal UI');
