const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/event/page.tsx', 'utf8');

content = content.replace(
  /<div className="w-full max-w-4xl mx-auto space-y-12">/,
  `<div className="w-full space-y-12">`
);

content = content.replace(
  /<div className="w-full max-w-5xl mx-auto">/,
  `<div className="w-full mt-12">`
);

fs.writeFileSync('src/app/(public)/event/page.tsx', content);
console.log('Fixed width');
