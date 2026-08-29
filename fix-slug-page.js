const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinasi/[slug]/page.tsx', 'utf8');

// Fix column name in select
content = content.replace(
  /color_cluster/,
  `cluster_color\n      ),\n      destination_images (image_url)`
);

// Fix usage of column name
content = content.replace(
  /color_cluster/g,
  `cluster_color`
);

fs.writeFileSync('src/app/(public)/destinasi/[slug]/page.tsx', content);
console.log('Fixed slug page');
