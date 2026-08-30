const fs = require('fs');
let c = fs.readFileSync('src/components/home/HeroSlider.tsx', 'utf8');

// Center the text container on mobile
c = c.replace(
  '<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 -mt-20">',
  '<div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-12 -mt-20">'
);

// Center the text wrapper on mobile
c = c.replace(
  '<div className="w-full md:w-1/2">',
  '<div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">'
);

// Center the gold line on mobile
c = c.replace(
  '<div className="w-16 md:w-24 h-1 bg-[#f5be45] mb-4 md:mb-8 animate-hero-line rounded-full">',
  '<div className="w-16 md:w-24 h-1 bg-[#f5be45] mb-4 md:mb-8 animate-hero-line rounded-full mx-auto md:mx-0">'
);

fs.writeFileSync('src/components/home/HeroSlider.tsx', c);
console.log('Centered hero text on mobile');
