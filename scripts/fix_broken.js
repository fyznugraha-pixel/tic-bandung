const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('D:/kerjaan/tic-bandung/scripts/asset_tree.json', 'utf8'));

// Helper to get the first image from a specific folder (case-insensitive search)
function getFirstImage(folderPathStr) {
    const parts = folderPathStr.split('/').filter(Boolean);
    let current = tree;
    let actualPath = [];
    
    for (const part of parts) {
        // Case insensitive find
        const actualKey = Object.keys(current).find(k => k.toLowerCase() === part.toLowerCase());
        if (!actualKey) return null;
        current = current[actualKey];
        actualPath.push(actualKey);
    }
    if (current && current._files) {
        const img = current._files.find(f => f.match(/\.(jpg|jpeg|png|webp|JPG|PNG|JPEG)$/i));
        if (img) return `/ASET VISUAL/Wisata Bandung/${actualPath.join('/')}/${img}`;
    }
    return null;
}

// 1. Fix page.tsx (Landing Page)
const pageFile = 'D:/kerjaan/tic-bandung/src/app/(public)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

const pageMappings = [
    { title: 'Gedung Sate', folder: 'Museum/Museum gedung sate' },
    { title: 'Alun-Alun Bandung', folder: 'Park Destination/Alun alun bandung' },
    { title: 'Jalan Braga', folder: 'Walking Tour/Jalan Braga' },
    { title: 'Sumber Hidangan', folder: 'Legendary Cullinary tourism in Bandung/Sumber hidangan (Braga)' },
    { title: 'Braga Permai', folder: 'Legendary Cullinary tourism in Bandung/Braga permai' },
    { title: 'Bandoengsche Melk', folder: 'Legendary Cullinary tourism in Bandung/Bandoengsche melk centrale' },
    { title: 'Toko Roti Sidodadi', folder: 'Legendary Cullinary tourism in Bandung/Toko roti sidodadi' },
    { title: 'Kopi Purnama', folder: 'Legendary Cullinary tourism in Bandung/Kopi purnama (JL alkateri)' },
    { title: 'Roti Gempol', folder: 'Legendary Cullinary tourism in Bandung/Roti Gempol' }
];

pageMappings.forEach(m => {
    const imgUrl = getFirstImage(m.folder);
    if (imgUrl) {
        // <img ... src="..." /> followed eventually by <h3>m.title</h3>
        const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>[\\s\\S]*?<h3[^>]*?>${m.title})`, 'g');
        pageContent = pageContent.replace(regex, `$1${imgUrl}$2`);
    } else {
        console.warn('NOT FOUND:', m.folder);
    }
});

// Quick access mappings in page.tsx
const quickAccessMappings = [
    { span: 'Destinasi', folder: 'Nature Destination/Tebing Keraton' },
    { span: 'Kuliner', folder: 'Legendary Cullinary tourism in Bandung/Toko roti sidodadi' },
    { span: 'Event', folder: 'Actractions  & arts tourism/Saung angklung Udjo' },
    { span: 'Trip Planner', folder: 'Nature Destination/Kawah putih' },
    { span: 'Transportasi', folder: 'Walking Tour/Jalan Asia Afrika' }
];

quickAccessMappings.forEach(m => {
    const imgUrl = getFirstImage(m.folder);
    if (imgUrl) {
        const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>[\\s\\S]*?<span[^>]*?>${m.span})`, 'g');
        pageContent = pageContent.replace(regex, `$1${imgUrl}$2`);
    } else {
        console.warn('NOT FOUND QUICK ACCESS:', m.folder);
    }
});

fs.writeFileSync(pageFile, pageContent, 'utf8');

// 2. Fix kategori/page.tsx (Bento Grid)
const kategoriFile = 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/page.tsx';
let kategoriContent = fs.readFileSync(kategoriFile, 'utf8');

const bentoMappings = [
    { href: '/kategori/museum', folder: 'Museum/Museum Asia Afrika' },
    { href: '/kategori/wisata-art-space', folder: 'Art Gallery/NU art Sculpture Park' },
    { href: '/kategori/wisata-ekonomi-kreatif', folder: 'Souvenir Tourism/Cihampelas' },
    { href: '/kategori/wisata-alam', folder: 'Nature Destination/Kawah putih' },
    { href: '/kategori/wisata-buatan', folder: 'Leisure destination/Trans studio Bandung' },
    { href: '/kategori/taman-kota', folder: 'Park Destination/Taman film (pasupati)' },
    { href: '/kategori/kampung-wisata-kreatif', folder: 'Tourist village/Creative tourism village cinambo' },
    { href: '/kategori/public-space', folder: 'Walking Tour/Jalan Braga' },
    { href: '/kategori/walking-tour', folder: 'Walking Tour/Jalan Asia Afrika' },
    { href: '/kategori/atraksi-kesenian', folder: 'Actractions  & arts tourism/Saung angklung Udjo' },
    { href: '/kategori/kuliner-legendaris', folder: 'Legendary Cullinary tourism in Bandung/Braga permai' },
    { href: '/kategori/belanja-souvenir', folder: 'Wisata sentra belanja/Cibaduyut' },
    { href: '/kategori/kuliner-malam', folder: 'Cullinary night tour/Red dimsum (Dipati ukur)' }
];

bentoMappings.forEach(m => {
    const imgUrl = getFirstImage(m.folder);
    if (imgUrl) {
        // <Link href="..." ... style={{ backgroundImage: "url('...')" }}>
        const regex = new RegExp(`(href="${m.href}"[\\s\\S]*?style={{ backgroundImage: "url\\(')([^']+?)('\\)" }})`);
        kategoriContent = kategoriContent.replace(regex, `$1${imgUrl}$3`);
    } else {
        console.warn('NOT FOUND BENTO:', m.folder);
    }
});

fs.writeFileSync(kategoriFile, kategoriContent, 'utf8');

console.log('Fixed broken images globally!');
