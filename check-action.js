const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');
console.log(content.substring(0, 1000));
