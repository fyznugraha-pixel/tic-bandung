const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/peta/page.tsx', 'utf8');

content = content.replace('<main className="w-full flex-grow relative flex flex-col">', '<main className="w-full h-[calc(100dvh-70px)] relative flex flex-col">');

fs.writeFileSync('src/app/(public)/peta/page.tsx', content);
console.log('Fixed peta height collapse');
