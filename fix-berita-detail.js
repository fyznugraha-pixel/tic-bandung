const fs = require('fs');
let c = fs.readFileSync('src/app/(public)/berita/[slug]/page.tsx', 'utf8');

// 1. Hero height: 60vh -> 45vh on mobile
c = c.replace(
  'className="relative w-full h-[60vh] md:h-[70vh] bg-black"',
  'className="relative w-full h-[45vh] md:h-[70vh] bg-black"'
);

// 2. Hero bottom padding: pb-16 -> pb-8 on mobile
c = c.replace(
  'className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24"',
  'className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-24"'
);

// 3. Breadcrumb: smaller on mobile
c = c.replace(
  'className="flex text-white/80 text-sm mb-6 items-center gap-2 font-medium z-10 relative drop-shadow-md"',
  'className="flex text-white/80 text-xs md:text-sm mb-3 md:mb-6 items-center gap-1 md:gap-2 font-medium z-10 relative drop-shadow-md flex-wrap"'
);

// 4. Category + date row: mb-6 -> mb-3 on mobile
c = c.replace(
  'className="flex items-center gap-3 mb-6"',
  'className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6 flex-wrap"'
);

// 5. Title: text-4xl -> text-2xl on mobile
c = c.replace(
  'text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight drop-shadow-md leading-tight max-w-4xl drop-shadow-lg',
  'text-2xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight drop-shadow-md leading-tight max-w-4xl drop-shadow-lg'
);

// 6. Content section padding: py-16 -> py-8 on mobile
c = c.replace(
  'py-16 md:py-24 grid grid-cols-1',
  'py-8 md:py-24 grid grid-cols-1'
);

// 7. Article prose: prose-lg -> prose on mobile (smaller base font)
c = c.replace(
  'prose prose-lg prose-slate',
  'prose prose-base md:prose-lg prose-slate'
);

// 8. First letter: too big on mobile
c = c.replace(
  'first-letter:text-6xl',
  'first-letter:text-4xl md:first-letter:text-6xl'
);

// 9. Sidebar CTA: rounded-3xl p-8 -> rounded-2xl p-5 on mobile
c = c.replace(
  'className="bg-[#3D7A5E] rounded-3xl p-8 text-white mb-10',
  'className="bg-[#3D7A5E] rounded-xl md:rounded-3xl p-5 md:p-8 text-white mb-6 md:mb-10'
);

// 10. Gap between columns: gap-12 -> gap-8 on mobile
c = c.replace(
  'gap-12 lg:gap-16',
  'gap-8 lg:gap-16'
);

fs.writeFileSync('src/app/(public)/berita/[slug]/page.tsx', c);
console.log('Fixed berita detail page for mobile');
