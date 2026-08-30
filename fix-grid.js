const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');

content = content.replace(
  '<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[160px] md:auto-rows-[300px]">',
  '<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[minmax(160px,auto)] md:auto-rows-[300px]">'
);

fs.writeFileSync('src/app/(public)/transportasi/page.tsx', content);
console.log('Fixed grid auto-rows');
