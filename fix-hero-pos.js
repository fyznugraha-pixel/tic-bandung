const fs = require('fs');
let c = fs.readFileSync('src/components/home/HeroSlider.tsx', 'utf8');

// Remove the -mt-20 on mobile, keep it on desktop
c = c.replace(
  'gap-12 -mt-20">',
  'gap-12 mt-0 md:-mt-20">'
);

fs.writeFileSync('src/components/home/HeroSlider.tsx', c);
console.log('Fixed hero text position on mobile');
