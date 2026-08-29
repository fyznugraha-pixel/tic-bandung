const fs = require('fs');
const file = 'src/app/(public)/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ScrollReveal')) {
  content = content.replace(
    "import { Montserrat } from 'next/font/google';",
    "import { Montserrat } from 'next/font/google';\nimport { ScrollReveal } from '@/components/ui/animations/ScrollReveal';"
  );
}

// 1. Wrap News header
content = content.replace(
  '<div className="flex flex-col items-center mb-16">',
  '<ScrollReveal className="flex flex-col items-center mb-16">'
).replace(
  '<div className="w-24 h-1.5 bg-[#C9971E] rounded-full"></div>\n        </div>',
  '<div className="w-24 h-1.5 bg-[#C9971E] rounded-full"></div>\n        </ScrollReveal>'
);

// 2. Wrap News Cards individually with delay
content = content.replace(
  '<div key={item.id} className="clay-card group cursor-pointer flex flex-col h-full overflow-hidden">',
  '<ScrollReveal key={item.id} delay={i * 0.1} className="h-full">\n<div className="clay-card group cursor-pointer flex flex-col h-full overflow-hidden">'
).replace(
  '</div>\n               </div>',
  '</div>\n               </div>\n</ScrollReveal>'
);

// 3. Wrap Interactive Map Section
content = content.replace(
  '<section className="w-full bg-slate-900',
  '<ScrollReveal>\n      <section className="w-full bg-slate-900'
).replace(
  '</section>\n\n      {/* 12. CALL TO ACTION',
  '</section>\n      </ScrollReveal>\n\n      {/* 12. CALL TO ACTION'
);

// 4. Wrap CTA
content = content.replace(
  '<section className="w-full py-24',
  '<ScrollReveal>\n      <section className="w-full py-24'
).replace(
  '</section>\n    </main>',
  '</section>\n      </ScrollReveal>\n    </main>'
);

fs.writeFileSync(file, content);
console.log('Updated page.tsx');
