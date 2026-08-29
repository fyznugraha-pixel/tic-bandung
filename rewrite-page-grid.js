const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/event/page.tsx', 'utf8');

// The layout is currently:
// <div className="flex flex-col gap-16">
//   <div className="w-full space-y-12">
//     <ScrollReveal>
//     {/* Timeline Section */}
//     ...
//     {/* Kriteria Section */}
//     ...
//     </ScrollReveal>
//   </div>
//   {/* Bottom Row: Registration Form */}
//   <div className="w-full max-w-5xl mx-auto">

content = content.replace(
  /<div className="w-full space-y-12">\s*<ScrollReveal>\s*\{\/\* Timeline Section \*\/\}/m,
  `<div className="w-full">
            <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Timeline Section */}`
);

content = content.replace(
  /<\/ul>\s*<\/section>\s*<\/ScrollReveal>\s*<\/div>/,
  `</ul>
            </section>
            </div>
            </ScrollReveal>
          </div>`
);

fs.writeFileSync('src/app/(public)/event/page.tsx', content);
console.log('Fixed grid');
