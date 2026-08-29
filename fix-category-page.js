const fs = require('fs');

const path = 'src/app/(public)/kategori/[slug]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add export const revalidate = 0
if (!content.includes('export const revalidate')) {
  content = content.replace(
    /export default async function CategoryPage/,
    `export const revalidate = 0;\n\nexport default async function CategoryPage`
  );
}

// 2. Fix the query and transform data
content = content.replace(
  /const { data: destinations, error } = await supabase[\s\S]*?\.eq\('status', 'published'\);/,
  `const { data: rawDestinations, error } = await supabase
    .from('destinations')
    .select(\`
      id, 
      name, 
      slug, 
      description, 
      address,
      price_info,
      opening_hours,
      images
    \`)
    .eq('category_id', category.id)
    .eq('status', 'published');

  // Transform raw data to match CategoryListingUI interface
  let destinations: any[] = [];
  if (rawDestinations) {
    destinations = rawDestinations.map((d: any) => {
      let ticket_type = 'UNCONFIRMED';
      let ticket_nominal = null;
      if (d.price_info && typeof d.price_info === 'object') {
         ticket_type = d.price_info.type || 'UNCONFIRMED';
         ticket_nominal = d.price_info.nominal || null;
      }
      
      return {
        id: d.id,
        name: d.name,
        slug: d.slug,
        description: d.description,
        district: d.address || null, // Using address as district for filtering
        ticket_type: ticket_type,
        ticket_nominal: ticket_nominal,
        operating_hours: d.opening_hours ? JSON.stringify(d.opening_hours) : null,
        destination_images: d.images && Array.isArray(d.images) ? d.images.map((img: string) => ({ image_url: img })) : []
      };
    });
  }`
);

fs.writeFileSync(path, content);
console.log('Fixed category page.');
