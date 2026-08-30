const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

content = content.replace(/className="\$\{montserrat\.className\} text-2xl font-bold text-white mb-3"\>50\+ Destinasi/g, 'className={`${montserrat.className} text-base md:text-2xl font-bold text-white mb-1 md:mb-3`}>50+ Destinasi');

content = content.replace(/className="text-sm font-bold text-white\/90 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300"\>Jelajahi/g, 'className="text-[10px] md:text-sm font-bold text-white/90 uppercase tracking-widest flex items-center gap-1 md:gap-2 group-hover:gap-2 md:group-hover:gap-4 transition-all duration-300">Jelajahi');

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Fixed 50+ Destinasi text');
