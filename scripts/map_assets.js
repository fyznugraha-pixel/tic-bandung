const fs = require('fs');
const path = require('path');

const tree = JSON.parse(fs.readFileSync('D:/kerjaan/tic-bandung/scripts/asset_tree.json', 'utf8'));

// Helper to get all file paths from a folder in the tree
function getAllImagesFromFolder(folderName) {
    let images = [];
    if (!tree[folderName]) return images;
    
    for (const [subfolder, content] of Object.entries(tree[folderName])) {
        if (content._files) {
            content._files.forEach(file => {
                // Ensure it's an image
                if (file.match(/\.(jpg|jpeg|png|webp|webp)$/i)) {
                    images.push(`/ASET VISUAL/Wisata Bandung/${folderName}/${subfolder}/${file}`);
                }
            });
        }
    }
    // Also check root files if any
    if (tree[folderName]._files) {
        tree[folderName]._files.forEach(file => {
            if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                images.push(`/ASET VISUAL/Wisata Bandung/${folderName}/${file}`);
            }
        });
    }
    return images;
}

// Map files to their respective image pools
const fileMappings = [
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutAlam.tsx',
        pools: [
            ...getAllImagesFromFolder('Nature Destination')
        ]
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutBuatan.tsx',
        pools: [
            ...getAllImagesFromFolder('Leisure destination'),
            ...getAllImagesFromFolder('Walking Tour')
        ]
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutMuseum.tsx',
        pools: [
            ...getAllImagesFromFolder('Museum')
        ]
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutTamanKota.tsx',
        pools: [
            ...getAllImagesFromFolder('Park Destination')
        ]
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutKampungKreatif.tsx',
        pools: [
            ...getAllImagesFromFolder('Tourist village')
        ]
    },
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutArtSpace.tsx',
        pools: [
            ...getAllImagesFromFolder('Actractions  & arts tourism'),
            ...getAllImagesFromFolder('Art Gallery')
        ]
    },
    // We don't have an explicit folder for Ekonomi Kreatif, we can use a mix or just leave it. Let's use Souvenir Tourism for now.
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/[slug]/components/LayoutEkonomiKreatif.tsx',
        pools: [
            ...getAllImagesFromFolder('Souvenir Tourism'),
            ...getAllImagesFromFolder('Wisata sentra belanja')
        ]
    },
    // page.tsx (Landing page) - we can mix various pools
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/page.tsx',
        pools: [
            ...getAllImagesFromFolder('Nature Destination'),
            ...getAllImagesFromFolder('Museum'),
            ...getAllImagesFromFolder('Legendary Cullinary tourism in Bandung')
        ]
    },
    // kategori/page.tsx (Kategori Index)
    {
        file: 'D:/kerjaan/tic-bandung/src/app/(public)/kategori/page.tsx',
        pools: [
            ...getAllImagesFromFolder('Nature Destination'),
            ...getAllImagesFromFolder('Museum'),
            ...getAllImagesFromFolder('Park Destination'),
            ...getAllImagesFromFolder('Leisure destination')
        ]
    }
];

fileMappings.forEach(mapping => {
    if (!fs.existsSync(mapping.file)) return;
    
    let content = fs.readFileSync(mapping.file, 'utf8');
    let poolIndex = 0;
    const poolSize = mapping.pools.length;
    
    if (poolSize === 0) {
        console.warn(`No images found for mapping: ${mapping.file}`);
        return;
    }
    
    // Shuffle the pool for variety
    const shuffledPool = mapping.pools.sort(() => 0.5 - Math.random());
    
    // Replace Unsplash URLs and googleusercontent URLs
    // Regex matches src="..." or style={{ backgroundImage: "url('...')" }}
    const regex = /(https:\/\/images\.unsplash\.com\/[^"'\s\)]+|https:\/\/lh3\.googleusercontent\.com\/[^"'\s\)]+)/g;
    
    content = content.replace(regex, (match) => {
        const localImg = shuffledPool[poolIndex % poolSize];
        poolIndex++;
        // URI encode spaces in filename
        return encodeURI(localImg);
    });
    
    fs.writeFileSync(mapping.file, content, 'utf8');
    console.log(`Updated images in ${path.basename(mapping.file)}`);
});
