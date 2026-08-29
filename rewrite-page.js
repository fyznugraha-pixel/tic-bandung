const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/event/page.tsx', 'utf8');

// The layout is currently:
// <div className="flex flex-col lg:flex-row gap-12">
//   <div className="w-full lg:w-2/3 space-y-12">
//     ...
//   </div>
//   <div className="w-full lg:w-1/3">
//     ...
//   </div>
// </div>

content = content.replace(
  /<div className="flex flex-col lg:flex-row gap-12">/,
  `<div className="flex flex-col gap-16">`
);

content = content.replace(
  /<div className="w-full lg:w-2\/3 space-y-12">/,
  `<div className="w-full max-w-4xl mx-auto space-y-12">`
);

content = content.replace(
  /<\/div>\s*\{\/\* Right Column: Registration Form \*\/\}\s*<div className="w-full lg:w-1\/3">/m,
  `</div>
          {/* Bottom Row: Registration Form */}
          <div className="w-full max-w-5xl mx-auto">`
);

content = content.replace(
  /sticky top-28/,
  ``
);

fs.writeFileSync('src/app/(public)/event/page.tsx', content);
console.log('Fixed page.tsx');
