const fs = require('fs');
let content = fs.readFileSync('src/app/globals.css', 'utf8');

content = content.replace(
  '@apply bg-white rounded-3xl border border-white',
  '@apply bg-white rounded-lg md:rounded-3xl border border-white'
);

fs.writeFileSync('src/app/globals.css', content);
console.log('Fixed clay-card border radius');
