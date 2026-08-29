const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinasi/[slug]/page.tsx', 'utf8');

const oldQuery = `    .select(\`
      *,
      categories (
        name,
        slug,
        cluster_color
      )
      )
    \`)`;

const newQuery = `    .select(\`
      *,
      categories (
        name,
        slug,
        cluster_color
      )
    \`)`;

content = content.replace(oldQuery, newQuery);

fs.writeFileSync('src/app/(public)/destinasi/[slug]/page.tsx', content);
console.log('Fixed syntax error in query');
