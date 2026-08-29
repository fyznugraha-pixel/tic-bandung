const fs = require('fs');
const file = 'src/app/(public)/kategori/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ScrollReveal')) {
  content = content.replace(
    "import { Montserrat } from 'next/font/google';",
    "import { Montserrat } from 'next/font/google';\nimport { ScrollReveal } from '@/components/ui/animations/ScrollReveal';"
  );
}

// Wrap sections in kategori
content = content.replace(
  '<section className="mb-20">',
  '<ScrollReveal>\n<section className="mb-20">'
).replace(
  '</section>\n\n        {/* THINGS TO DO',
  '</section>\n</ScrollReveal>\n\n        {/* THINGS TO DO'
);

content = content.replace(
  '<section className="mb-20" id="things-to-do">',
  '<ScrollReveal delay={0.1}>\n<section className="mb-20" id="things-to-do">'
).replace(
  '</section>\n\n        {/* WHERE TO EAT',
  '</section>\n</ScrollReveal>\n\n        {/* WHERE TO EAT'
);

content = content.replace(
  '<section className="mb-20" id="where-to-eat">',
  '<ScrollReveal delay={0.2}>\n<section className="mb-20" id="where-to-eat">'
).replace(
  '</section>\n\n      </div>',
  '</section>\n</ScrollReveal>\n\n      </div>'
);

fs.writeFileSync(file, content);
console.log('Updated kategori/page.tsx');
