const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Fix News Card Padding
content = content.replace(/className="p-8 flex flex-col flex-grow justify-between"/g, 'className="p-4 md:p-8 flex flex-col flex-grow justify-between"');

// Fix News title size
content = content.replace(/className="\${montserrat.className} text-xl font-bold/g, 'className="${montserrat.className} text-sm md:text-xl font-bold');

// Fix Destinasi Bento padding & text sizes for mobile
content = content.replace(/className="absolute bottom-0 left-0 p-10/g, 'className="absolute bottom-0 left-0 p-4 md:p-10');
content = content.replace(/className="\${montserrat.className} text-4xl font-bold/g, 'className="${montserrat.className} text-lg md:text-4xl font-bold');

content = content.replace(/className="absolute bottom-0 left-0 p-8 transform/g, 'className="absolute bottom-0 left-0 p-4 md:p-8 transform');
content = content.replace(/className="\${montserrat.className} text-2xl font-bold/g, 'className="${montserrat.className} text-base md:text-2xl font-bold');

content = content.replace(/className="absolute bottom-0 left-0 p-6 transform/g, 'className="absolute bottom-0 left-0 p-4 md:p-6 transform');
content = content.replace(/className="\${montserrat.className} text-xl font-bold text-white"/g, 'className="${montserrat.className} text-sm md:text-xl font-bold text-white"');

// Fix 50+ Destinasi padding
content = content.replace(/className="group relative rounded-3xl overflow-hidden md:col-span-1 md:row-span-1 block bg-\[#C9971E\] flex flex-col justify-center items-center text-center p-8/g, 'className="group relative rounded-3xl overflow-hidden md:col-span-1 md:row-span-1 block bg-[#C9971E] flex flex-col justify-center items-center text-center p-4 md:p-8');
content = content.replace(/className="w-16 h-16 bg-white\/20/g, 'className="w-10 h-10 md:w-16 md:h-16 bg-white/20');
content = content.replace(/className="text-white w-8 h-8/g, 'className="text-white w-5 h-5 md:w-8 md:h-8');

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Mobile padding and text sizes fixed');
