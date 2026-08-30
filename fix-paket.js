const fs = require('fs');
let c = fs.readFileSync('src/app/(public)/paket-wisata/page.tsx', 'utf8');

// 1. CTA title: text-4xl -> text-2xl on mobile
c = c.replace(
  'text-4xl md:text-5xl font-bold text-white mb-6 leading-tight',
  'text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight'
);

// 2. CTA description: text-lg -> text-sm on mobile  
c = c.replace(
  'text-slate-300 text-lg md:text-xl font-light',
  'text-slate-300 text-sm md:text-xl font-light'
);

// 3. CTA section padding: p-12 -> p-6 on mobile
c = c.replace(
  'rounded-[3rem] overflow-hidden relative flex flex-col md:flex-row items-center justify-between p-12 md:p-16 lg:px-24',
  'rounded-[1.5rem] md:rounded-[3rem] overflow-hidden relative flex flex-col md:flex-row items-center justify-between p-6 md:p-16 lg:px-24'
);

// 4. Card padding: p-8 -> p-5 on mobile
c = c.replace(
  /rounded-\[2\.5rem\] p-8 md:p-12/g,
  'rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12'
);

// 5. ASITA/ASTINDO title: text-3xl -> text-xl on mobile
c = c.replace(
  /text-3xl font-bold text-slate-900 mb-1`}>ASITA/,
  'text-xl md:text-3xl font-bold text-slate-900 mb-1`}>ASITA'
);
c = c.replace(
  /text-3xl font-bold text-slate-900 mb-1`}>ASTINDO/,
  'text-xl md:text-3xl font-bold text-slate-900 mb-1`}>ASTINDO'
);

// 6. Description: text-lg -> text-sm on mobile
c = c.replace(
  /text-slate-600 leading-relaxed mb-8 text-lg/g,
  'text-slate-600 leading-relaxed mb-4 md:mb-8 text-sm md:text-lg'
);

// 7. Logo size: w-24 h-24 -> w-16 h-16 on mobile
c = c.replace(
  /w-24 h-24 bg-white\/80 backdrop-blur-md rounded-3xl/g,
  'w-16 h-16 md:w-24 md:h-24 bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl'
);

// 8. Section bottom pb-32 -> pb-16 on mobile
c = c.replace(
  'mx-auto pb-32 -mt-8',
  'mx-auto pb-16 md:pb-32 -mt-8'
);
c = c.replace(
  'mx-auto pb-32">',
  'mx-auto pb-16 md:pb-32">'
);

// 9. CTA buttons padding: px-8 py-4 -> px-6 py-3 on mobile
c = c.replace(
  'bg-[#C9971E] hover:bg-[#b0831a] text-white px-8 py-4 rounded-xl',
  'bg-[#C9971E] hover:bg-[#b0831a] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base'
);
c = c.replace(
  'bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl',
  'bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base'
);

// 10. Grid gap: gap-4 mb-10 -> gap-3 mb-6 on mobile
c = c.replace(
  'grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10',
  'grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-10'
);
c = c.replace(
  'flex flex-col gap-3 mb-10',
  'flex flex-col gap-2 md:gap-3 mb-6 md:mb-10'
);

fs.writeFileSync('src/app/(public)/paket-wisata/page.tsx', c);
console.log('Fixed paket wisata mobile sizing');
