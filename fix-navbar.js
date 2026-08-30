const fs = require('fs');
let content = fs.readFileSync('src/components/public/Navbar.tsx', 'utf8');

// Fix z-index
content = content.replace('z-50 transition-all', 'z-[2000] transition-all relative');

// Fix mobile dropdown overlap/gap
const targetDropdown = `      {/* Mobile Menu Overlay */}
      <div 
        className={\`lg:hidden fixed inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out \${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }\`}
        style={{ top: scrolled ? '64px' : '80px' }} // Adjust based on navbar height
      >`;

const replacementDropdown = `      {/* Mobile Menu Overlay */}
      <div 
        className={\`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out \${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }\`}
      >`;

content = content.replace(targetDropdown, replacementDropdown);

fs.writeFileSync('src/components/public/Navbar.tsx', content);
console.log('Fixed navbar z-index and dropdown gap');
