const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/layout.tsx', 'utf8');

if (!content.includes('FooterWrapper')) {
  content = content.replace('import Navbar from \'@/components/public/Navbar\';', 'import Navbar from \'@/components/public/Navbar\';\nimport FooterWrapper from \'@/components/public/FooterWrapper\';');
  
  content = content.replace('<footer className="bg-white border-t border-slate-200 w-full pt-16">', '<FooterWrapper>\n      <footer className="bg-white border-t border-slate-200 w-full pt-16">');
  
  content = content.replace('</footer>\n      \n      {/* Floating WhatsApp Button */}', '</footer>\n      </FooterWrapper>\n      \n      {/* Floating WhatsApp Button */}');
  
  fs.writeFileSync('src/app/(public)/layout.tsx', content);
  console.log('Layout fixed');
}
