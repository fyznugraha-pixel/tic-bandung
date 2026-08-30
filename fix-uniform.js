const fs = require('fs');
let c = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Section 1: Berita -> py-12 md:py-24
c = c.replace(
  '<section className="w-full pt-16 md:pt-32 pb-8 md:pb-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">',
  '<section className="w-full py-12 md:py-24 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">'
);

// Section 2: Destinasi -> py-12 md:py-24
c = c.replace(
  '<section className="w-full pb-16 md:pb-32 pt-8 md:pt-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">',
  '<section className="w-full py-12 md:py-24 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">'
);

// Section 3: Galeri -> py-12 md:py-24
c = c.replace(
  '<section className="w-full py-12 md:py-32 bg-[#fcf9f5]">',
  '<section className="w-full py-12 md:py-24 bg-[#fcf9f5]">'
);

fs.writeFileSync('src/app/(public)/page.tsx', c);
console.log('Unified section spacing to py-12 md:py-24');
