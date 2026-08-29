const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinasi/[slug]/page.tsx', 'utf8');

content = content.replace(
  /<div className="max-w-\[1200px\] mx-auto w-full">/,
  `<div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 lg:px-12">`
);

fs.writeFileSync('src/app/(public)/destinasi/[slug]/page.tsx', content);
console.log('Fixed hero max width');
