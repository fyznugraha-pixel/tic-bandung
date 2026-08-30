const fs = require('fs');
let content = fs.readFileSync('src/components/ui/animations/BlurText.tsx', 'utf8');

content = content.replace(/className=\{\`inline-flex flex-wrap \$\{className\}\`\}/g, 'className={`inline-block ${className}`}');
content = content.replace(/className="mr-\[0\.25em\]"/g, 'className="inline-block mr-[0.25em]"');

fs.writeFileSync('src/components/ui/animations/BlurText.tsx', content);
console.log('Fixed BlurText layout');
