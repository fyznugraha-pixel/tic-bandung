const fs = require('fs');
const filesToUpdate = [
  'src/app/(public)/page.tsx',
  'src/app/(public)/kategori/page.tsx',
  'src/app/(public)/transportasi/page.tsx'
];

filesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file.includes('page.tsx') && file.includes('app/(public)/page.tsx')) {
    // 1. News Card Image Height
    content = content.replace(/className="h-64 relative overflow-hidden bg-slate-200/g, 'className="aspect-[4/3] w-full relative overflow-hidden bg-slate-200');
    
    // 2. Destinasi Bento Grid Height
    content = content.replace('h-[600px] sm:h-[900px] md:h-[650px]', 'h-[360px] sm:h-[600px] md:h-[650px]');
    
    // 3. Galeri Item min-height
    content = content.replace(/min-h-\[250px\]/g, 'min-h-[160px] md:min-h-[250px]');
  }

  if (file.includes('kategori/page.tsx')) {
    // 4. Kategori grids
    content = content.replace('auto-rows-[250px]', 'auto-rows-[160px] md:auto-rows-[250px]');
    content = content.replace('auto-rows-[220px]', 'auto-rows-[150px] md:auto-rows-[220px]');
    content = content.replace('auto-rows-[280px]', 'auto-rows-[180px] md:auto-rows-[280px]');
  }

  if (file.includes('transportasi/page.tsx')) {
    // 5. Transportasi grids
    content = content.replace('auto-rows-[200px] md:auto-rows-[300px]', 'auto-rows-[160px] md:auto-rows-[300px]');
  }

  fs.writeFileSync(file, content);
});
console.log('Mobile aspect ratios fixed');
