const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

const targetSection = `<span>Surat Kesediaan</span>
                <span>Buka &rarr;</span>`;
const newSection = `<span>Surat Kesediaan</span>
                <span>Unduh &darr;</span>`;

content = content.replace(targetSection, newSection);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed download text in modal');
