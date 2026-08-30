const fs = require('fs');
let content = fs.readFileSync('src/components/public/Navbar.tsx', 'utf8');

content = content.replace(/className=\{\`lg:hidden absolute top-full left-0 w-full bg-white\/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out \$\{isOpen \? 'max-h-\[500px\] opacity-100' : 'max-h-0 opacity-0'\}\`\} \/\/ Adjust based on navbar height/g, 'className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? \'max-h-[500px] opacity-100\' : \'max-h-0 opacity-0\'}`}');

fs.writeFileSync('src/components/public/Navbar.tsx', content);
console.log('Fixed syntax error');
