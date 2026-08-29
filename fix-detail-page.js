const fs = require('fs');
const path = 'src/app/(public)/destinasi/[slug]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add revalidate
if (!content.includes('export const revalidate')) {
  content = content.replace(
    /export default async function DestinationDetailPage/,
    `export const revalidate = 0;\n\nexport default async function DestinationDetailPage`
  );
}

// Remove destination_images from select
content = content.replace(
  /,\s*destination_images\s*\(\s*image_url,\s*source_photo_credit\s*\)/,
  ''
);

fs.writeFileSync(path, content);
console.log('Fixed detail page');
