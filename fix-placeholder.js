const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

content = content.replace(
  /placeholder="Contoh: Bandung Berisik 2026"/,
  `placeholder="Contoh: Asia Africa Festival 2026"`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed placeholder');
