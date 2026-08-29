const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

content = content.replace(
  / \*<\/label>/g,
  ` <span className="text-red-500">*</span></label>`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed required asterisks');
