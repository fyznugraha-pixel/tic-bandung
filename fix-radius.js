const fs = require('fs');

// 1. transportasi/page.tsx
let transportContent = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');
transportContent = transportContent.replace(/rounded-\[32px\]/g, 'rounded-xl md:rounded-[32px]');
fs.writeFileSync('src/app/(public)/transportasi/page.tsx', transportContent);

// 2. page.tsx
let homeContent = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');
homeContent = homeContent.replace(/rounded-3xl/g, 'rounded-xl md:rounded-3xl');
fs.writeFileSync('src/app/(public)/page.tsx', homeContent);

// 3. kategori/page.tsx
let kategoriContent = fs.readFileSync('src/app/(public)/kategori/page.tsx', 'utf8');
kategoriContent = kategoriContent.replace(/className="relative rounded-2xl overflow-hidden/g, 'className="relative rounded-xl md:rounded-2xl overflow-hidden');
fs.writeFileSync('src/app/(public)/kategori/page.tsx', kategoriContent);

console.log('Fixed border radius for cards on mobile');
