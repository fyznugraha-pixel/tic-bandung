const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinasi/[slug]/page.tsx', 'utf8');

content = content.replace(
  /<div className="max-w-\[1600px\] mx-auto w-full px-4 md:px-8 lg:px-12">/,
  `<div className="max-w-[1600px] mx-auto w-full">`
);

fs.writeFileSync('src/app/(public)/destinasi/[slug]/page.tsx', content);
console.log('Fixed hero padding');
