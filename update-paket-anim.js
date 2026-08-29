const fs = require('fs');
const file = 'src/app/(public)/paket-wisata/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ScrollReveal')) {
  content = content.replace(
    "import { Montserrat } from 'next/font/google';",
    "import { Montserrat } from 'next/font/google';\nimport { ScrollReveal } from '@/components/ui/animations/ScrollReveal';"
  );
}

// Wrap Association Logos Section
content = content.replace(
  '<div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center mb-16 relative overflow-hidden">',
  '<ScrollReveal>\n<div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center mb-16 relative overflow-hidden">'
).replace(
  '</div>\n\n        {/* GRID PAKET WISATA',
  '</div>\n</ScrollReveal>\n\n        {/* GRID PAKET WISATA'
);

// Wrap Paket Cards
content = content.replace(
  '<div className="bg-white rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-slate-100 flex flex-col h-full relative">',
  '<ScrollReveal delay={index * 0.1} className="h-full">\n<div className="bg-white rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-slate-100 flex flex-col h-full relative">'
).replace(
  '</Link>\n              </div>\n            </div>',
  '</Link>\n              </div>\n            </div>\n</ScrollReveal>'
);


fs.writeFileSync(file, content);
console.log('Updated paket-wisata/page.tsx');
