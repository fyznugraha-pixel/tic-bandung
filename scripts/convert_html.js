const fs = require('fs');
const path = require('path');

const UI_DIR = path.join(__dirname, '../UI-CODE');
const OUT_DIR = path.join(__dirname, '../src/app/(public)/kategori/[slug]/components');

const filesToConvert = [
    { file: 'alam.html', name: 'LayoutAlam' },
    { file: 'wisata_buatan.html', name: 'LayoutBuatan' },
    { file: 'museum.html', name: 'LayoutMuseum' },
    { file: 'taman_kota.html', name: 'LayoutTamanKota' },
    { file: 'kampung_kreatif.html', name: 'LayoutKampungKreatif' },
    { file: 'public_space_area.html', name: 'LayoutPublicSpace' },
    { file: 'ekonomi_kreatif.html', name: 'LayoutEkonomiKreatif' },
    { file: 'art_space.html', name: 'LayoutArtSpace' },
];

function htmlToJsx(html) {
    // Replace class with className
    let jsx = html.replace(/class=/g, 'className=');
    
    // Fix inline styles: style="background-image: url('...')" -> style={{ backgroundImage: "url('...')" }}
    jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim()).map(s => {
            let [key, val] = s.split(':');
            if(!val) return '';
            key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            return `${key}: '${val.trim().replace(/'/g, "\\'")}'`;
        }).join(', ');
        return `style={{ ${styles} }}`;
    });

    // Close img tags
    jsx = jsx.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
    
    // Close input tags
    jsx = jsx.replace(/<input([^>]+[^\/])>/g, '<input$1 />');
    
    // Close hr tags
    jsx = jsx.replace(/<hr([^>]+[^\/])>/g, '<hr$1 />');
    
    // Close br tags
    jsx = jsx.replace(/<br([^>]*[^\/])?>/g, '<br$1 />');

    // Fix some SVG properties if any (stroke-width to strokeWidth, etc)
    jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
    jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
    jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    
    // Replace html comments with jsx comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
    // Escape unescaped &
    jsx = jsx.replace(/&(?!(?:apos|quot|[a-zA-Z0-9]+|#\d+|#x[a-fA-F0-9]+);)/g, '&amp;');

    return jsx;
}

for (const { file, name } of filesToConvert) {
    const filePath = path.join(UI_DIR, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${file} not found!`);
        continue;
    }
    
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract <main>...</main>
    const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    
    if (match) {
        let content = match[0];
        
        let jsx = htmlToJsx(content);
        
        const componentCode = `import Link from 'next/link';
import Image from 'next/image';

export default function ${name}() {
  return (
    ${jsx}
  );
}
`;
        fs.writeFileSync(path.join(OUT_DIR, `${name}.tsx`), componentCode);
        console.log(`Successfully generated ${name}.tsx`);
    } else {
        console.warn(`Could not find <main> tag in ${file}`);
    }
}
