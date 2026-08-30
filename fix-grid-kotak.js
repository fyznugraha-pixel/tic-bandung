const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

content = content.replace(
  '<div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-6 h-[360px] sm:h-[600px] md:h-[650px]">',
  '<div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-6 aspect-square sm:aspect-auto sm:h-[600px] md:h-[650px]">'
);

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Fixed destinasi grid to be perfect squares on mobile');
