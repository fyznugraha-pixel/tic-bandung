const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Fix grid container for more breathing room
content = content.replace(
  '<div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-4 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 sidebar-scrollbar">',
  '<div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-6 md:gap-8 pb-8 -mx-4 px-6 md:mx-0 md:px-0 scroll-px-6 sidebar-scrollbar">'
);

// Fix card wrapper to snap to center
content = content.replace(
  '<ScrollReveal key={item.id} delay={i * 0.1} className="w-[85vw] sm:w-[350px] flex-shrink-0 snap-start md:w-auto h-full">',
  '<ScrollReveal key={item.id} delay={i * 0.1} className="w-[85vw] sm:w-[350px] flex-shrink-0 snap-center md:w-auto h-full">'
);

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Fixed swipe padding');
