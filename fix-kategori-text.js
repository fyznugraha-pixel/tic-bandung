const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/kategori/page.tsx', 'utf8');

// Fix card padding
content = content.replace(/className="absolute inset-0 p-6 flex flex-col justify-end z-10"/g, 'className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end z-10"');

// Fix tags
content = content.replace(/className="bg-\[#2C5C8A\] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2"/g, 'className="bg-[#2C5C8A] text-white text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full w-max mb-1 md:mb-2"');
content = content.replace(/className="bg-\[#3D7A5E\] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2"/g, 'className="bg-[#3D7A5E] text-white text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full w-max mb-1 md:mb-2"');
content = content.replace(/className="bg-\[#C9971E\] text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-2"/g, 'className="bg-[#C9971E] text-white text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full w-max mb-1 md:mb-2"');

// Fix titles
content = content.replace(/<h3 className="text-2xl font-bold text-white">\{cat\.name\}<\/h3>/g, '<h3 className="text-sm md:text-2xl font-bold text-white leading-tight">{cat.name}</h3>');
content = content.replace(/<h3 className="text-xl font-bold text-white">\{cat\.name\}<\/h3>/g, '<h3 className="text-sm md:text-xl font-bold text-white leading-tight">{cat.name}</h3>');

fs.writeFileSync('src/app/(public)/kategori/page.tsx', content);
console.log('Fixed kategori page mobile text sizes');
