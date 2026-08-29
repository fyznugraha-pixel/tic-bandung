const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Determine if we need imports
    let needsToast = false;
    let needsSwal = false;

    // 1. Replace alerts
    if (content.includes('alert(') || content.includes('alert (')) {
        needsToast = true;
        // Specific replacements
        content = content.replace(/alert\((result\.error|res\.error)\)/g, 'toast.error($1)');
        content = content.replace(/alert\("Error:/g, 'toast.error("Error:');
        content = content.replace(/alert\(`Error:/g, 'toast.error(`Error:');
        content = content.replace(/alert\("Terjadi kesalahan/g, 'toast.error("Terjadi kesalahan');
        content = content.replace(/alert\("Gagal mengupload/g, 'toast.error("Gagal mengupload');
        content = content.replace(/alert\("Foto utama/g, 'toast.error("Foto utama');
        content = content.replace(/alert\("Poster\/Foto/g, 'toast.error("Poster/Foto');
        
        // Success replacements
        content = content.replace(/alert\(`Event berhasil/g, 'toast.success(`Event berhasil');
        content = content.replace(/alert\(`Destinasi berhasil/g, 'toast.success(`Destinasi berhasil');
        content = content.replace(/alert\("Thumbnail kategori/g, 'toast.success("Thumbnail kategori');
        
        // Fallback for any remaining alerts (assume error if not success)
        content = content.replace(/alert\(/g, 'toast.error(');
        content = content.replace(/window\.toast\.error/g, 'toast.error'); // Fix if it was window.alert
    }

    // 2. Replace confirms
    // This is tricky because confirm is synchronous: if (!confirm(...)) return;
    // We have to change the function to async, and change the logic.
    // Instead of doing it globally automatically, let's just mark if it has confirm.
    if (content.includes('confirm(')) {
        needsSwal = true;
    }

    if (needsToast && !content.includes("import { toast } from 'react-hot-toast'")) {
        content = "import { toast } from 'react-hot-toast';\n" + content;
    }
    if (needsSwal && !content.includes("import Swal from 'sweetalert2'")) {
        content = "import Swal from 'sweetalert2';\n" + content;
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

const files = [
    'src/components/admin/DestinationForm.tsx',
    'src/components/admin/EventForm.tsx',
    'src/components/admin/EventSubmissionTable.tsx',
    'src/components/admin/EventTable.tsx',
    'src/components/admin/CategoryListClient.tsx',
    'src/components/admin/AdminManagementClient.tsx',
    'src/components/admin/cms/BeritaClient.tsx',
    'src/components/admin/cms/HeroSliderClient.tsx',
    'src/components/admin/cms/GaleriClient.tsx',
    'src/components/admin/DashboardTable.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        processFile(f);
    }
});
