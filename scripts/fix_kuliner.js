const fs = require('fs');

const targetFile = 'D:/kerjaan/tic-bandung/src/app/(public)/page.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
    { title: 'Sumber Hidangan', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Sumber hidangan (Braga)/Etalase-Tua-Sumber-Hidangan.jpg' },
    { title: 'Braga Permai', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Braga permai/2024-03-25-2636904789.jpg' },
    { title: 'Bandoengsche Melk', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Bandoengsche melk centrale/2029256078.jpeg' },
    // Replace Kopi Aroma card with Toko Roti Sidodadi since Aroma asset doesn't exist
    { title: 'Toko Roti Sidodadi', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Toko roti sidodadi/IMG_20260810_191953.jpg', oldTitle: 'Kopi Aroma', oldDesc: 'Kopi biji dan bubuk legendaris yang diproses secara tradisional.', newDesc: 'Toko roti legendaris dengan resep kuno tanpa bahan pengawet.' },
    { title: 'Kopi Purnama', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Kopi purnama (JL alkateri)/1392700_720.jpg' },
    { title: 'Roti Gempol', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Roti Gempol/IMG_20260810_191227.jpg' }
];

// Helper to encode URI
const encodePath = (path) => encodeURI(path);

// First replace Kopi Aroma with Toko Roti Sidodadi text
content = content.replace(/Kopi Aroma/g, 'Toko Roti Sidodadi');
content = content.replace(/Kopi biji dan bubuk legendaris yang diproses secara tradisional\./g, 'Toko roti legendaris dengan resep kuno tanpa bahan pengawet.');

// Replace images by finding the <img> right before the title block
replacements.forEach(r => {
    // Find <img ... src="..." /> just before <h3...>Title</h3>
    // We can do this by splitting and joining or regex
    // Since the structure is: 
    // <img alt="..." className="..." src="..." />
    // <div className="...">...</div>
    // <div className="...">
    //   <h3 className="...">{title}</h3>
    
    // We'll use a regex that looks for the src attribute in the preceding img tag
    const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>\\s*<div[^>]*?></div>\\s*<div[^>]*?>\\s*<div[^>]*?>[^<]*?</div>\\s*<h3[^>]*?>${r.title})`, 'g');
    
    content = content.replace(regex, `$1${encodePath(r.url)}$2`);
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Done fixing Kuliner Legend cards in page.tsx');
