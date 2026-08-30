const fs = require('fs');
let c = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Section 1: Berita - pt-32 pb-16 -> pt-16 md:pt-32 pb-8 md:pb-16
c = c.replace(
  '<section className="w-full pt-32 pb-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">',
  '<section className="w-full pt-16 md:pt-32 pb-8 md:pb-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">'
);

// Section 2: Destinasi - pb-32 pt-16 -> pb-16 md:pb-32 pt-8 md:pt-16
c = c.replace(
  '<section className="w-full pb-32 pt-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">',
  '<section className="w-full pb-16 md:pb-32 pt-8 md:pt-16 max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto">'
);

// Section 3: Galeri - py-24 md:py-32 -> py-12 md:py-32
c = c.replace(
  '<section className="w-full py-24 md:py-32 bg-[#fcf9f5]">',
  '<section className="w-full py-12 md:py-32 bg-[#fcf9f5]">'
);

// Section headers: mb-16 -> mb-8 md:mb-16
c = c.replace(
  '<ScrollReveal className="flex flex-col items-center mb-16">',
  '<ScrollReveal className="flex flex-col items-center mb-8 md:mb-16">'
);
c = c.replace(
  '<div className="flex flex-col items-center mb-16">',
  '<div className="flex flex-col items-center mb-8 md:mb-16">'
);
c = c.replace(
  'items-center md:items-end mb-16 gap-6 text-center',
  'items-center md:items-end mb-8 md:mb-16 gap-4 md:gap-6 text-center'
);

fs.writeFileSync('src/app/(public)/page.tsx', c);
console.log('Fixed section spacing for mobile');
