const fs = require('fs');

let transportContent = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');
transportContent = transportContent.replace(/rounded-xl md:rounded-\[32px\]/g, 'rounded-xl sm:rounded-[32px]');
// Actually let's use rounded-2xl or rounded-xl (which is 12px). Let's change it to rounded-lg (8px) on mobile for a tighter look.
transportContent = transportContent.replace(/rounded-xl sm:rounded-\[32px\]/g, 'rounded-lg md:rounded-[32px]');
fs.writeFileSync('src/app/(public)/transportasi/page.tsx', transportContent);

let homeContent = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');
homeContent = homeContent.replace(/rounded-xl md:rounded-3xl/g, 'rounded-lg md:rounded-3xl');
fs.writeFileSync('src/app/(public)/page.tsx', homeContent);

let kategoriContent = fs.readFileSync('src/app/(public)/kategori/page.tsx', 'utf8');
kategoriContent = kategoriContent.replace(/rounded-xl md:rounded-2xl/g, 'rounded-lg md:rounded-2xl');
fs.writeFileSync('src/app/(public)/kategori/page.tsx', kategoriContent);

console.log('Fixed border radius to be even tighter on mobile (rounded-lg)');
