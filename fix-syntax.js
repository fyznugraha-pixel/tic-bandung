const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  `    </div>
    </div>
  );
}`
);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed syntax error');
