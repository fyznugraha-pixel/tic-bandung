const fs = require('fs');
let content = fs.readFileSync('src/components/ui/ModernHero.tsx', 'utf8');

content = content.replace(
  'const containerClass = isCenter \r\n    ? "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center"\r\n    : "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center";',
  'const containerClass = isCenter \n    ? "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center"\n    : "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center";'
);

content = content.replace(
  'const textAlignmentClass = isCenter ? "items-center text-center" : (isRight ? "items-end text-right lg:order-2" : "items-start text-left");',
  'const textAlignmentClass = isCenter ? "items-center text-center" : (isRight ? "items-center text-center lg:items-end lg:text-right lg:order-2" : "items-center text-center lg:items-start lg:text-left");'
);

content = content.replace(
  'const navAlignClass = isCenter ? "justify-center" : (isRight ? "justify-end" : "justify-start");',
  'const navAlignClass = isCenter ? "justify-center" : (isRight ? "justify-center lg:justify-end" : "justify-center lg:justify-start");'
);

content = content.replace(
  '<section className="relative w-full min-h-[550px] flex items-center justify-center pt-0 pb-12 lg:pb-16">',
  '<section className="relative w-full min-h-[350px] md:min-h-[550px] flex items-center justify-center pt-8 md:pt-0 pb-8 md:pb-12 lg:pb-16">'
);

fs.writeFileSync('src/components/ui/ModernHero.tsx', content);
console.log('Fixed hero spacing and mobile alignment');
