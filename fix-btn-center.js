const fs = require('fs');
let c = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// Make button not full-width on mobile, centered
c = c.replace(
  'className="w-full md:w-auto px-8 py-3 bg-amber-500',
  'className="w-auto px-8 py-3 bg-amber-500'
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', c);
console.log('Fixed button to be auto-width and centered');
