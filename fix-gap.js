const fs = require('fs');
let c = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// All 3 sections: py-12 -> py-6 on mobile
c = c.replace(
  /className="w-full py-12 md:py-24 max-w-\[1600px\]/g,
  'className="w-full py-6 md:py-24 max-w-[1600px]'
);
c = c.replace(
  'className="w-full py-12 md:py-24 bg-[#fcf9f5]"',
  'className="w-full py-6 md:py-24 bg-[#fcf9f5]"'
);

fs.writeFileSync('src/app/(public)/page.tsx', c);
console.log('Reduced mobile section gap to py-6');
