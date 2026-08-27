const fs = require('fs');

const targetFile = 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/page.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add imports and async/supabase logic
const importSupabase = `import { createClient } from '@/utils/supabase/server';\n\n`;
if (!content.includes('createClient')) {
    content = content.replace("export default function KategoriPage() {", 
`import { createClient } from '@/utils/supabase/server';

export default async function KategoriPage() {
  const supabase = createClient();
  const { data: stats } = await supabase.from('category_stats_view').select('*');
  
  const getCount = (slug: string, fallback: string) => {
    if (!stats) return fallback;
    const category = stats.find(s => s.slug === slug);
    return category ? \`\${category.total_published_locations} Lokasi\` : fallback;
  };
`);
}

// 2. Map slugs to their specific titles to find them in the JSX
const categories = [
    { title: 'Museum', slug: 'museum', fallback: '19 Lokasi' },
    { title: 'Wisata Art Space', slug: 'wisata-art-space', fallback: '15 Lokasi' },
    { title: 'Wisata Ekonomi Kreatif', slug: 'wisata-ekonomi-kreatif', fallback: '17 Sektor' },
    { title: 'Wisata Alam', slug: 'wisata-alam', fallback: '6 Lokasi' },
    { title: 'Wisata Buatan', slug: 'wisata-buatan', fallback: '9 Lokasi' },
    { title: 'Taman Kota', slug: 'taman-kota', fallback: '20 Lokasi' },
    { title: 'Kampung Kreatif', slug: 'kampung-wisata-kreatif', fallback: '8 Lokasi' },
    { title: 'Public Space', slug: 'public-space', fallback: '5 Lokasi' },
    { title: 'Walking Tour', slug: 'walking-tour', fallback: '5 Rute' },
    { title: 'Atraksi Kesenian', slug: 'atraksi-kesenian', fallback: '22 Lokasi' },
    { title: 'Kuliner Legendaris', slug: 'kuliner-legendaris', fallback: '50+ Spot' },
    { title: 'Belanja Souvenir', slug: 'belanja-souvenir', fallback: '12 Mall' },
    { title: 'Kuliner Malam', slug: 'kuliner-malam', fallback: '10 Kawasan' },
    { title: 'Religi & Ziarah', slug: 'religi-ziarah', fallback: '18 Lokasi' },
    { title: 'Oleh-Oleh', slug: 'belanja-souvenir', fallback: '35 Sentra' } // Wait, Oleh-Oleh might be a different slug or the same
];

categories.forEach(c => {
    // Regex finds the span before the h3 with the exact title
    // Example: <span className="...">19 Lokasi</span> \n <h3 ...>Museum</h3>
    const regex = new RegExp(`(<span[^>]*?>)[^<]+(</span>\\s*<h3[^>]*?>${c.title})`, 'g');
    
    // Check if it exists before replacing
    if (regex.test(content)) {
        content = content.replace(regex, `$1{getCount('${c.slug}', '${c.fallback}')}$2`);
    } else {
        // Edge cases where h3 might be different
        const regex2 = new RegExp(`(<span[^>]*?>)[^<]+(</span>\\s*<[^>]*>[\\s\\S]*?<h3[^>]*?>${c.title})`, 'g');
        content = content.replace(regex2, `$1{getCount('${c.slug}', '${c.fallback}')}$2`);
    }
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Done integrating Supabase stats into kategori page');
