const fs = require('fs');
const file = 'src/app/(public)/transportasi/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ScrollReveal')) {
  content = content.replace(
    "import { Montserrat } from 'next/font/google';",
    "import { Montserrat } from 'next/font/google';\nimport { ScrollReveal } from '@/components/ui/animations/ScrollReveal';"
  );
}

// Wrap Whoosh Card
content = content.replace(
  '{/* Card 1: Whoosh (Image Card) */}\n          <div className="md:col-span-2 bg-slate-900',
  '{/* Card 1: Whoosh (Image Card) */}\n          <ScrollReveal className="md:col-span-2 h-full">\n          <div className="bg-slate-900 h-full'
).replace(
  '</p>\n              <Link href="#" className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all">\n                Lihat Jadwal <ChevronRight className="w-4 h-4" />\n              </Link>\n            </div>\n          </div>',
  '</p>\n              <Link href="#" className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all">\n                Lihat Jadwal <ChevronRight className="w-4 h-4" />\n              </Link>\n            </div>\n          </div>\n          </ScrollReveal>'
);

// Wrap Bus Trans Metro
content = content.replace(
  '{/* Card 2: Bus Trans Metro */}\n          <div className="bg-white',
  '{/* Card 2: Bus Trans Metro */}\n          <ScrollReveal delay={0.1} className="h-full">\n          <div className="bg-white h-full'
).replace(
  '</span>\n              </div>\n            </div>\n          </div>',
  '</span>\n              </div>\n            </div>\n          </div>\n          </ScrollReveal>'
);

// Wrap Bandros
content = content.replace(
  '{/* Card 3: Bandros */}\n          <div className="bg-[#C9971E]',
  '{/* Card 3: Bandros */}\n          <ScrollReveal delay={0.2} className="h-full">\n          <div className="bg-[#C9971E] h-full'
).replace(
  '</div>\n            </div>\n          </div>',
  '</div>\n            </div>\n          </div>\n          </ScrollReveal>'
);

// Wrap Angkot
content = content.replace(
  '{/* Card 4: Angkot */}\n          <div className="md:col-span-2 lg:col-span-4 bg-white',
  '{/* Card 4: Angkot */}\n          <ScrollReveal className="md:col-span-2 lg:col-span-4 h-full">\n          <div className="bg-white h-full'
).replace(
  '</div>\n              </div>\n            </div>\n          </div>',
  '</div>\n              </div>\n            </div>\n          </div>\n          </ScrollReveal>'
);


fs.writeFileSync(file, content);
console.log('Updated transportasi/page.tsx');
