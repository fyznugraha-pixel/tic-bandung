const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Fix grid container
content = content.replace(
  '<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">',
  '<div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-4 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 sidebar-scrollbar">'
);

// Fix card wrapper
content = content.replace(
  '<ScrollReveal key={item.id} delay={i * 0.1} className="h-full">',
  '<ScrollReveal key={item.id} delay={i * 0.1} className="w-[85vw] sm:w-[350px] flex-shrink-0 snap-start md:w-auto h-full">'
);
// Handle multiple items if it's in a map! The replace above only does the first one if there are multiple static ones, but this is a map `activeNews.map(...)` so it's only one line in the code!

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Fixed swipe news');
