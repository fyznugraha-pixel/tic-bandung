const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

// Fix the flex container
content = content.replace(
  '<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">',
  '<div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">'
);

// Add inner flex wrapper for centering on mobile
content = content.replace(
  '<div>\r\n              <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">',
  '<div className="flex flex-col items-center md:items-start">\n              <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center md:justify-start gap-2">'
);
// In case line endings are different:
content = content.replace(
  '<div>\n              <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">',
  '<div className="flex flex-col items-center md:items-start">\n              <span className="text-[#3D7A5E] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center md:justify-start gap-2">'
);

// Fix the divider
content = content.replace(
  '<div className="w-24 h-1.5 bg-[#3D7A5E] rounded-full"></div>',
  '<div className="w-24 h-1.5 bg-[#3D7A5E] rounded-full mx-auto md:mx-0"></div>'
);

fs.writeFileSync('src/app/(public)/page.tsx', content);
console.log('Fixed Galeri alignment');
