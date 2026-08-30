const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');

// Fix card paddings
content = content.replace(/className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end"/g, 'className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end"');
content = content.replace(/className="h-full flex flex-col justify-between p-8"/g, 'className="h-full flex flex-col justify-between p-4 md:p-8"');
content = content.replace(/className="h-full flex flex-col justify-end p-8"/g, 'className="h-full flex flex-col justify-end p-4 md:p-8"');
content = content.replace(/className="absolute inset-0 p-8 flex flex-col justify-between"/g, 'className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between"');

// Fix tags
content = content.replace(/className="inline-flex items-center justify-center w-max px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider"/g, 'className="inline-flex items-center justify-center w-max px-2 py-0.5 md:px-3 md:py-1 bg-blue-600 text-white text-[9px] md:text-xs font-bold rounded-full mb-2 md:mb-4 uppercase tracking-wider"');

// Fix titles
content = content.replace(/<h2 className="text-3xl font-bold text-white mb-2 tracking-tight">/g, '<h2 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight">');
content = content.replace(/<h3 className="text-xl font-bold text-slate-900 mb-2">/g, '<h3 className="text-base md:text-xl font-bold text-slate-900 mb-1 md:mb-2">');
content = content.replace(/<h3 className="text-2xl font-bold text-white mb-2">/g, '<h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">');

// Fix descriptions on mobile
content = content.replace(/<p className="text-slate-300 font-medium leading-relaxed max-w-md">/g, '<p className="text-slate-300 font-medium leading-relaxed max-w-md text-[10px] md:text-base line-clamp-2 md:line-clamp-none">');
content = content.replace(/<p className="text-slate-600 font-medium leading-relaxed">/g, '<p className="text-slate-600 font-medium leading-relaxed text-[10px] md:text-base line-clamp-2 md:line-clamp-none">');

fs.writeFileSync('src/app/(public)/transportasi/page.tsx', content);
console.log('Fixed transport page mobile text sizes');
