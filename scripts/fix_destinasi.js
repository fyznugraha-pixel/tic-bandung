const fs = require('fs');

const targetFile = 'D:/kerjaan/tic-bandung/src/app/(public)/page.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
    { title: 'Gedung Sate', url: '/ASET VISUAL/Wisata Bandung/Museum/Museum Gedung Sate/museum-gedung-sate.jpg' },
    { title: 'Alun-Alun Bandung', url: '/ASET VISUAL/Wisata Bandung/Public speace area/alun-alun-bandung.jpg' }, // If doesn't exist, we'll use Braga
    { title: 'Jalan Braga', url: '/ASET VISUAL/Wisata Bandung/Walking Tour/Jalan Braga/FB_IMG_1537243916962.jpg' }
];

const encodePath = (path) => encodeURI(path);

replacements.forEach(r => {
    // Regex to find: <img ... src="..." />
    // <div ...></div>
    // <div ...>
    //   <span ...>...</span>
    //   <h3 ...>Gedung Sate</h3>
    const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>\\s*<div[^>]*?></div>\\s*<div[^>]*?>\\s*<span[^>]*?>[^<]*?</span>\\s*<h3[^>]*?>${r.title})`, 'g');
    content = content.replace(regex, `$1${encodePath(r.url)}$2`);
});

// Fix Trip planner & transportasi which use <span>Trip Planner</span>
const quickLinks = [
    { text: 'Trip Planner', url: '/ASET VISUAL/Wisata Bandung/Nature Destination/kawah putih/2.jpg' },
    { text: 'Transportasi', url: '/ASET VISUAL/Wisata Bandung/Walking Tour/Jalan Asia Afrika/A.jpg' }
];

quickLinks.forEach(r => {
    const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>\\s*<div[^>]*?></div>\\s*<div[^>]*?>\\s*<[^>]*?>[\\s\\S]*?<span[^>]*?>${r.text})`, 'g');
    content = content.replace(regex, `$1${encodePath(r.url)}$2`);
});

// Quick access row at the top (Destinasi, Kuliner, Event)
const quickAccess = [
    { text: 'Destinasi', url: '/ASET VISUAL/Wisata Bandung/Nature Destination/Tebing Keraton/IMG_2056.JPG' },
    { text: 'Kuliner', url: '/ASET VISUAL/Wisata Bandung/Legendary Cullinary tourism in Bandung/Braga permai/2024-03-25-2636904789.jpg' },
    { text: 'Event', url: '/ASET VISUAL/Wisata Bandung/Actractions  & arts tourism/Saung angklung Udjo/Pertunjukanluar.webp' }
];

quickAccess.forEach(r => {
    const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>\\s*<div[^>]*?></div>\\s*<div[^>]*?>\\s*<[^>]*?>[\\s\\S]*?<span[^>]*?>${r.text})`, 'g');
    content = content.replace(regex, `$1${encodePath(r.url)}$2`);
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Done fixing Popular Destinations and Quick Access in page.tsx');
