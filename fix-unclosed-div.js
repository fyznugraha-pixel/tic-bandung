const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

content = content.replace(
  /<\/table>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  `        </table>
      </div>
    </div>
    </div>
  );
}`
);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed unclosed div');
