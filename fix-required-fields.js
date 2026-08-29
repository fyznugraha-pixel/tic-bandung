const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// 1. Add Download icon import
content = content.replace(
  /import \{ CheckCircle2, Calendar, MapPin, User, Phone, Mail, AtSign, Star, FileText, Send, Building, Target, UploadCloud \} from 'lucide-react';/,
  `import { CheckCircle2, Calendar, MapPin, User, Phone, Mail, AtSign, Star, FileText, Send, Building, Target, UploadCloud, Download } from 'lucide-react';`
);

// 2. Make Instagram field required
content = content.replace(
  /<label className="block text-sm font-medium text-slate-300 mb-2">8\. Akun Instagram Acara<\/label>/,
  `<label className="block text-sm font-medium text-slate-300 mb-2">8. Akun Instagram Acara *</label>`
);
content = content.replace(
  /<input type="text" name="instagram" placeholder="@namainstagram"/,
  `<input type="text" name="instagram" required placeholder="@namainstagram"`
);

// 3. Add Download button to Surat Kesediaan section
const suratSectionRegex = /(<div className="relative">\s*<input type="url" name="commitment_letter_link"[\s\S]*?<\/div>)/;
content = content.replace(
  suratSectionRegex,
  `$1\n            <a href="/template-surat-laporan-kegiatan.docx" download className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-300 font-medium transition-colors">\n              <Download className="w-4 h-4" /> Unduh Template Surat Laporan\n            </a>`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed required fields and added download button');
