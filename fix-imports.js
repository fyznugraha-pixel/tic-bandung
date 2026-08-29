const fs = require('fs');

// Fix EventSubmissionForm.tsx
let content1 = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');
content1 = content1.replace(/Instagram,/g, 'AtSign,');
content1 = content1.replace(/<Instagram/g, '<AtSign');
fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content1);

console.log('Fixed EventSubmissionForm.tsx');
