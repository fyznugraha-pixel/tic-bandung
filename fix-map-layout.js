const fs = require('fs');

// Fix layout.tsx
let layoutContent = fs.readFileSync('src/app/(public)/layout.tsx', 'utf8');
layoutContent = layoutContent.replace('<div className="flex-grow">', '<div className="flex-grow flex flex-col">');
fs.writeFileSync('src/app/(public)/layout.tsx', layoutContent);

// Fix peta/page.tsx
let petaContent = fs.readFileSync('src/app/(public)/peta/page.tsx', 'utf8');
petaContent = petaContent.replace('<main className="w-full h-screen relative flex flex-col">', '<main className="w-full flex-grow relative flex flex-col">');
fs.writeFileSync('src/app/(public)/peta/page.tsx', petaContent);

console.log('Fixed map layout overflow');
