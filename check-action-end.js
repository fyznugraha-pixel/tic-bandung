const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(50, 70).join('\n'));
