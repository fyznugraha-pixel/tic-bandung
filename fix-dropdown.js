const fs = require('fs');
let content = fs.readFileSync('src/components/public/Navbar.tsx', 'utf8');

// Replace fixed positioning with absolute top-full
const regex = /className=\{\`lg:hidden fixed inset-x-0[^\`]+\`\}[\s\r\n]+style=\{\{ top: scrolled \? '64px' : '80px' \}\}/;
const replacement = "className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}";

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/public/Navbar.tsx', content);
console.log('Fixed dropdown positioning with regex');
