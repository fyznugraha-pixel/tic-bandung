const fs = require('fs');

const targetFile = 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/page.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = {
    '/kategori/museum': 'Museum/Museum%20Asia%20Afrika/IMG_1903.PNG',
    '/kategori/wisata-art-space': 'Art%20Gallery/NU%20art%20Sculpture%20Park/tvteu2pv2s2fe5vs5qzp.jpg',
    '/kategori/wisata-ekonomi-kreatif': 'Souvenir%20Tourism/Cihampelas/2021_04_24_15_24_03_689108.jpg',
    '/kategori/wisata-alam': 'Nature%20Destination/kawah%20putih/2.jpg',
    '/kategori/wisata-buatan': 'Leisure%20destination/Trans%20Studio%20bandung/9-trans-studio-bandung.jpg',
    '/kategori/taman-kota': 'Park%20Destination/Taman%20film/Taman-Film-Bandung_169.jpeg',
    '/kategori/kampung-wisata-kreatif': 'Tourist%20village/kampung%20wisata%20kreatif%20cinambo/IMG_20260810_171500.jpg',
    '/kategori/public-space': 'Walking%20Tour/Jalan%20Braga/FB_IMG_1537243916962.jpg',
    '/kategori/walking-tour': 'Walking%20Tour/Jalan%20Asia%20Afrika/A.jpg',
    '/kategori/atraksi-kesenian': 'Actractions%20%20&%20arts%20tourism/Saung%20angklung%20Udjo/Pertunjukanluar.webp',
    '/kategori/kuliner-legendaris': 'Legendary%20Cullinary%20tourism%20in%20Bandung/Braga%20permai/braga-permai-8.jpg',
    '/kategori/belanja-souvenir': 'Wisata%20sentra%20belanja/cibaduyut/FOTO_BERITA_33878.jpg',
    '/kategori/kuliner-malam': 'Cullinary%20night%20tour/Red%20dimsum%20(Dipati%20ukur)/9aeb5d3b80a1d5a166dc889fcdf32e1d.jpg'
};

for (const [href, imgPath] of Object.entries(replacements)) {
    // Regex to match the block starting with Link href="<href>" and capturing the style={{ backgroundImage: "url('...')" }}
    const regex = new RegExp(`(href="${href}"[\\s\\S]*?style={{ backgroundImage: "url\\(')([^']+?)('\\)" }})`);
    content = content.replace(regex, `$1/ASET VISUAL/Wisata Bandung/${imgPath}$3`);
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Done mapping specific cards in kategori/page.tsx');
