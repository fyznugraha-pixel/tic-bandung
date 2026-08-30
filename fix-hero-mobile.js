const fs = require('fs');
let content = fs.readFileSync('src/components/home/HeroSlider.tsx', 'utf8');

// 1. Reduce hero height on mobile: 65vh -> 55vh, min-h 450 -> 380
content = content.replace(
  'className="relative w-full h-[65vh] min-h-[450px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-gray-900"',
  'className="relative w-full h-[55vh] min-h-[380px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-gray-900"'
);

// 2. Reduce hero title text size on mobile: text-5xl -> text-3xl
content = content.replace(
  'text-5xl md:text-7xl lg:text-[100px]',
  'text-3xl md:text-7xl lg:text-[100px]'
);

// 3. Reduce mb on h1 for mobile
content = content.replace(
  'leading-[1.05] mb-8 drop-shadow-xl',
  'leading-[1.05] mb-4 md:mb-8 drop-shadow-xl'
);

// 4. Reduce description margin bottom line
content = content.replace(
  '<div className="w-24 h-1 bg-[#f5be45] mb-8 animate-hero-line rounded-full">',
  '<div className="w-16 md:w-24 h-1 bg-[#f5be45] mb-4 md:mb-8 animate-hero-line rounded-full">'
);

fs.writeFileSync('src/components/home/HeroSlider.tsx', content);
console.log('Fixed hero height and text size for mobile');
