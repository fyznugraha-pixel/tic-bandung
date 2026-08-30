const fs = require('fs');
let content = fs.readFileSync('src/components/public/MapClient.tsx', 'utf8');

content = content.replace(/<ZoomControl position="bottomright" \/>/g, '<ZoomControl position="bottomleft" />');

fs.writeFileSync('src/components/public/MapClient.tsx', content);
console.log('Map zoom fixed');
