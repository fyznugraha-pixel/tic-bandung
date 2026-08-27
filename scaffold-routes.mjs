import fs from 'fs';
import path from 'path';

const routes = [
  'src/app/(public)',
  'src/app/(public)/kategori',
  'src/app/(public)/kategori/[slug]',
  'src/app/(public)/destinasi/[slug]',
  'src/app/(public)/kuliner',
  'src/app/(public)/kuliner/[slug]',
  'src/app/(public)/event',
  'src/app/(public)/event/[slug]',
  'src/app/(public)/peta',
  'src/app/(public)/trip-planner',
  'src/app/(public)/transportasi',
  'src/app/(admin)/admin',
  'src/app/(admin)/admin/login',
  'src/app/(admin)/admin/dashboard',
  'src/app/(admin)/admin/destinasi',
  'src/app/(admin)/admin/destinasi/new',
  'src/app/(admin)/admin/destinasi/[id]/edit',
  'src/app/(admin)/admin/media',
  'src/app/api/geocode',
  'src/app/api/directions',
  'src/app/api/itinerary',
  'src/components/ui',
  'src/components/public',
  'src/components/admin',
  'src/lib/supabase',
  'src/lib/validations',
  'src/lib/utils',
  'src/types',
  'src/data'
];

routes.forEach(route => {
  const fullPath = path.join(process.cwd(), route);
  fs.mkdirSync(fullPath, { recursive: true });
  
  if (route.startsWith('src/app') && !route.includes('api')) {
    const pagePath = path.join(fullPath, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      fs.writeFileSync(pagePath, `export default function Page() {\n  return <div>${route}</div>;\n}\n`);
    }
  }
});
