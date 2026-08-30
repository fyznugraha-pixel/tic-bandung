const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');

// Card 2: Bandros
content = content.replace(
  'className="inline-flex items-center justify-center w-max px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider"',
  'className="inline-flex items-center justify-center w-max px-2 py-0.5 md:px-3 md:py-1 bg-amber-500 text-white text-[9px] md:text-xs font-bold rounded-full mb-1 md:mb-4 uppercase tracking-wider"'
);
content = content.replace(
  'Link href="https://uptangkutan-bandung.id/bandros/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-amber-300"',
  'Link href="https://uptangkutan-bandung.id/bandros/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 md:gap-2 text-white font-bold mt-2 md:mt-4 text-[10px] md:text-base group-hover:gap-3 transition-all hover:text-amber-300"'
);

// Card 3: Transportasi Online
content = content.replace(
  'className="absolute inset-0 p-8 flex flex-col justify-end"',
  'className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end"'
);
content = content.replace(
  'className="inline-flex items-center justify-center w-max px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider"',
  'className="inline-flex items-center justify-center w-max px-2 py-0.5 md:px-3 md:py-1 bg-emerald-600 text-white text-[9px] md:text-xs font-bold rounded-full mb-1 md:mb-3 uppercase tracking-wider"'
);
content = content.replace(
  'className="text-xl font-bold text-white mb-2 leading-tight"',
  'className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 leading-tight"'
);

// Card 4: Boseh
content = content.replace(
  'className="absolute inset-0 p-8 flex flex-col justify-end"',
  'className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end"'
);
content = content.replace(
  'className="inline-flex items-center justify-center w-max px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider"',
  'className="inline-flex items-center justify-center w-max px-2 py-0.5 md:px-3 md:py-1 bg-purple-600 text-white text-[9px] md:text-xs font-bold rounded-full mb-1 md:mb-3 uppercase tracking-wider"'
);
content = content.replace(
  'className="text-xl font-bold text-white mb-2"',
  'className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2"'
);
content = content.replace(
  'className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-purple-300 text-sm"',
  'className="inline-flex items-center gap-1 md:gap-2 text-white font-bold mt-1 md:mt-4 text-[10px] md:text-sm group-hover:gap-3 transition-all hover:text-purple-300"'
);

// Card 5: DAMRI
content = content.replace(
  '<div className="md:col-span-2 bg-white rounded-[32px] p-8 md:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">',
  '<div className="col-span-2 md:col-span-2 bg-white rounded-[32px] p-5 md:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">'
);
content = content.replace(
  '<div className="flex items-center gap-4 mb-8">',
  '<div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">'
);
content = content.replace(
  '<h3 className="text-2xl font-bold text-slate-900">DAMRI & Angkot</h3>',
  '<h3 className="text-lg md:text-2xl font-bold text-slate-900">DAMRI & Angkot</h3>'
);
content = content.replace(
  '<div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-8">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8">'
);

fs.writeFileSync('src/app/(public)/transportasi/page.tsx', content);
console.log('Fixed transportasi layout');
