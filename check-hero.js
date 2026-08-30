const fs = require('fs');
let content = fs.readFileSync('src/components/ui/ModernHero.tsx', 'utf8');

if (!content.includes('lg:grid lg:grid-cols-2')) {
  console.log('Replacing layout properties again using regex to ignore line endings');
  content = content.replace(
    /const containerClass = isCenter\s+\? "relative z-10 w-full max-w-\[1600px\] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center"\s+: "relative z-10 w-full max-w-\[1600px\] px-4 md:px-8 lg:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center";/,
    'const containerClass = isCenter \n    ? "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center"\n    : "relative z-10 w-full max-w-[1600px] px-4 md:px-8 lg:px-12 mx-auto flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center";'
  );
  fs.writeFileSync('src/components/ui/ModernHero.tsx', content);
} else {
  console.log('Already replaced successfully!');
}
