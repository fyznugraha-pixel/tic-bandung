const fs = require('fs');
let content = fs.readFileSync('src/components/ui/ModernHero.tsx', 'utf8');

content = content.replace('text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight', 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight');

fs.writeFileSync('src/components/ui/ModernHero.tsx', content);
console.log('Fixed hero font size with simple string replacement');
