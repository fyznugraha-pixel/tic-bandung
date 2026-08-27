const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('D:/kerjaan/tic-bandung/scripts/asset_tree.json', 'utf8'));

// Helper to get the first image from a specific folder
function getFirstImage(folderPathStr) {
    const parts = folderPathStr.split('/').filter(Boolean);
    let current = tree;
    for (const part of parts) {
        if (!current[part]) return null;
        current = current[part];
    }
    if (current && current._files) {
        const img = current._files.find(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
        if (img) return `/ASET VISUAL/Wisata Bandung/${folderPathStr}/${img}`;
    }
    return null;
}

const layouts = [
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutAlam.tsx',
        mappings: {
            'Curug Dago': 'Nature Destination/Curug Dago',
            'Gedong Tjai': 'Nature Destination/Gedong tjai tjibadak',
            'Kampung Tjibarani': 'Nature Destination/Kampoeng tjibarani',
            'Sein Farm Sekemala': 'Nature Destination/Senin farm sekemala',
            'Mupu Jeruk': 'Nature Destination/Mupu jeruk',
            'Wisata Petik Anggur': 'Nature Destination/Wisata petik anggur (Cipadung kidul)'
        }
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutArtSpace.tsx',
        mappings: {
            'Galeri Hegarmanah': 'Art Gallery/Gallery komunitas lukis hegar manah',
            'Sanggar Olah Seni': 'Art Gallery/Sanggar olah seni Babakan Siliwangi',
            'Grey Art Gallery': 'Art Gallery/Grey art Gallery',
            'Galeri Pusat Kebudayaan': 'Art Gallery/Rumah seni ropih', // Replacement as planned
            'Maranatha Art and Desain': 'Art Gallery/Maranatha art design center',
            'NuArt Sculpture Park': 'Art Gallery/NU art Sculpture Park'
        }
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutBuatan.tsx',
        mappings: {
            'Kiara Artha Park': 'Leisure destination/Kiara Artha park',
            'Trans Studio Bandung': 'Leisure destination/Trans studio Bandung',
            'Taman Lalu Lintas': 'Leisure destination/Taman lalulintas',
            'Karang Setra Waterland': 'Leisure destination/Karang setra waterland',
            'Panghegar Waterboom': 'Leisure destination/Panghegar Waterboom',
            'Peta Park': 'Leisure destination/Peta park',
            'Panama Park': 'Leisure destination/Panama park',
            'Margacinta Park': 'Leisure destination/Margacinta park'
        }
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutKampungKreatif.tsx',
        mappings: {
            'Kampung Wisata Kreatif Cibaduyut': 'Tourist village/Creative tourism village Cibaduyut',
            'Kampung Wisata Kreatif Cinambo': 'Tourist village/Creative tourism village cinambo',
            'Kampung Wisata Kreatif Gedebage': 'Tourist village/Kampung wisata batik (Cigadung)', // Replacement as planned
            'Kampung Wisata Kreatif Pasir Kunci': 'Tourist village/The pasir kunci'
        }
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutMuseum.tsx',
        mappings: {
            'Museum Geologi': 'Museum/Museum geologi',
            'Museum Gedung Sate': 'Museum/Museum gedung sate',
            'Museum Kota Bandung': 'Museum/Museum kota Bandung',
            'Museum Pos Indonesia': 'Museum/Museum Pos Indonesia'
        }
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutTamanKota.tsx',
        mappings: {
            'Taman Musik Centrum': 'Park Destination/Taman musik (jl sumbawa 20)',
            'Taman Foto': 'Park Destination/Taman foto (jl kemuning)',
            'Taman Vanda': 'Park Destination/Taman vanda',
            'Alun-alun Ujung Berung': 'Park Destination/Taman alun alun ujung Berung'
        }
    }
];

layouts.forEach(layout => {
    if (!fs.existsSync(layout.file)) return;
    let content = fs.readFileSync(layout.file, 'utf8');

    for (const [title, folder] of Object.entries(layout.mappings)) {
        const imgPath = getFirstImage(folder);
        if (imgPath) {
            // Replace the image source preceding the title h3
            // Format: src="..." -> <h3 ...>Title</h3>
            // We use unencoded path since React handles it fine.
            const regex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>\\s*<div[^>]*?></div>\\s*<div[^>]*?>\\s*<h3[^>]*?>${title})`, 'g');
            content = content.replace(regex, `$1${imgPath}$2`);
            
            // For layout components that might have different structure (like just a sibling h3):
            const fallbackRegex = new RegExp(`(<img[^>]*?src=")[^"]+("[^>]*?>[\\s\\S]*?<h3[^>]*?>${title})`, 'g');
            content = content.replace(fallbackRegex, `$1${imgPath}$2`);
        } else {
            console.warn(`No image found for ${title} in folder ${folder}`);
        }
    }
    
    // Also, if the component has a Hero Banner, let's revert it back to Unsplash OR use the first image from its mapped folder
    // E.g. <img alt="Hero Wisata Alam" ...> 
    // We'll leave hero banners alone for now unless specified.
    
    fs.writeFileSync(layout.file, content, 'utf8');
});

console.log('Precision mapping completed for all category layout files.');
