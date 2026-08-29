const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

content = content.replace(
  /const target = e.target as HTMLInputElement \| HTMLTextAreaElement;/,
  `const target = e.target as unknown as HTMLInputElement | HTMLTextAreaElement;`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed TS error');
