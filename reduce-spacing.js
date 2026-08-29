const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/event/page.tsx', 'utf8');

// Change gap-16 to gap-8
content = content.replace(
  /<div className="flex flex-col gap-16">/,
  `<div className="flex flex-col gap-8">`
);

// Remove mt-12
content = content.replace(
  /<div className="w-full mt-12">/,
  `<div className="w-full">`
);

fs.writeFileSync('src/app/(public)/event/page.tsx', content);
console.log('Fixed spacing');
