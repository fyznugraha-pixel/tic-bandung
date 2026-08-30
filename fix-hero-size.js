const fs = require('fs');
let content = fs.readFileSync('src/components/home/HeroSlider.tsx', 'utf8');

// Fix header height
content = content.replace(
  '<header className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-gray-900">',
  '<header className="relative w-full h-[65vh] min-h-[450px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-gray-900">'
);

// Fix h1 text size
content = content.replace(
  '<h1 className={`${montserrat.className} text-6xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl`}>',
  '<h1 className={`${montserrat.className} text-5xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl`}>'
);

// Fix p text size
content = content.replace(
  '<p className="text-lg md:text-xl text-white/90 max-w-md font-light leading-relaxed drop-shadow-md animate-hero-desc">',
  '<p className="text-sm md:text-xl text-white/90 max-w-md font-light leading-relaxed drop-shadow-md animate-hero-desc">'
);

fs.writeFileSync('src/components/home/HeroSlider.tsx', content);
console.log('Fixed hero size on mobile');
