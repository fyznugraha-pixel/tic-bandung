const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

// Add import
content = content.replace(
  /import { ExternalLink, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';/,
  `import { ExternalLink, CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';\nimport * as XLSX from 'xlsx';`
);

// Add export function before return
const exportFn = `
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(item => ({
      'Tanggal Masuk': new Date(item.created_at).toLocaleDateString('id-ID'),
      'Judul Acara': item.title,
      'Tanggal Mulai': item.start_date,
      'Tanggal Selesai': item.end_date,
      'Lokasi': item.location,
      'EO / Komunitas': item.eo_name,
      'Nama PIC': item.pic_name,
      'Email': item.email,
      'WhatsApp': item.whatsapp,
      'Instagram': item.instagram,
      'KOL': item.kol_partner,
      'Artis': item.artist_performance,
      'Status': item.status
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pendaftaran Event");
    XLSX.writeFile(wb, "Data_Pendaftaran_Event.xlsx");
  };

  return (`;
  
content = content.replace(/\n\s*return \(\n/, exportFn);

// Wrap table with a container and add export button
content = content.replace(
  /return \(\n\s*<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">/,
  `return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button 
          onClick={exportToExcel}
          className="px-4 py-2 bg-[#217346] hover:bg-[#1e6b41] text-white font-bold rounded-lg text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">`
);

// Add closing div at the end
content = content.replace(
  /<\/div>\n\s*<\/div>\n\s*\);\n\}/,
  `</div>\n    </div>\n    </div>\n  );\n}`
);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed export');
