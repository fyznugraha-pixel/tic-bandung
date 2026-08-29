const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

content = content.replace(
  /<a href="\/template-surat-laporan-kegiatan\.docx"/,
  `<a href="/ASET%20VISUAL/surat/FORMAT%20SURAT%20PERNYATAAN%20KESANGGUPAN%20COE.docx"`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed template link');
