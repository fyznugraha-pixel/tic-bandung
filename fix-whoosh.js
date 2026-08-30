const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/transportasi/page.tsx', 'utf8');

// Fix Whoosh Description
content = content.replace(
  '<p className="text-slate-300 font-medium leading-relaxed max-w-md text-[10px] md:text-base line-clamp-2 md:line-clamp-none">',
  '<p className="text-slate-300 font-medium leading-relaxed max-w-md text-[10px] md:text-base hidden md:block">'
);

// Fix Whoosh Link
content = content.replace(
  '<Link href="https://kcic.co.id" className="inline-flex items-center gap-2 text-white font-bold mt-4 group-hover:gap-3 transition-all hover:text-blue-300">',
  '<Link href="https://kcic.co.id" className="inline-flex items-center gap-1 md:gap-2 text-white font-bold mt-1 md:mt-4 text-[10px] md:text-base group-hover:gap-3 transition-all hover:text-blue-300">'
);

// Fix Bandros Description
content = content.replace(
  '<p className="text-slate-300 font-medium leading-relaxed max-w-md text-[10px] md:text-base line-clamp-2 md:line-clamp-none">',
  '<p className="text-slate-300 font-medium leading-relaxed max-w-md text-[10px] md:text-base hidden md:block">'
);

fs.writeFileSync('src/app/(public)/transportasi/page.tsx', content);
console.log('Fixed Whoosh and Bandros cards');
