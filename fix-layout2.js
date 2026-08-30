const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/layout.tsx', 'utf8');

// The file has <FooterWrapper> but no </FooterWrapper>. Let's find </footer> and add </FooterWrapper> after it.
content = content.replace(/<\/footer>\s*(?:\r\n|\n)*\s*\{\/\* Floating WhatsApp Button \*\/\}/, '</footer>\n      </FooterWrapper>\n\n      {/* Floating WhatsApp Button */}');

fs.writeFileSync('src/app/(public)/layout.tsx', content);
console.log('Fixed syntax in layout');
