const fs = require('fs');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Pattern for simple confirm: if (!window.confirm("...")) return; or if (!confirm("...")) return;
    const confirmRegex = /if\s*\(!?(?:window\.)?confirm\(([`"'])(.*?)([`"'])\)\)\s*\{?\s*return;?\s*\}?/g;
    
    content = content.replace(confirmRegex, (match, quote1, text, quote2) => {
        let title = "Konfirmasi";
        let confirmBtn = "Ya, Lanjutkan";
        if (text.toLowerCase().includes("hapus")) {
            title = "Konfirmasi Hapus";
            confirmBtn = "Ya, Hapus";
        }
        return `const confirmResult = await Swal.fire({
      title: '${title}',
      text: \`${text}\`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#858796',
      confirmButtonText: '${confirmBtn}',
      cancelButtonText: 'Batal'
    });
    if (!confirmResult.isConfirmed) return;`;
    });

    // Pattern for if (confirm("...")) { ... }
    const confirmBlockRegex = /if\s*\((?:window\.)?confirm\(([`"'])(.*?)([`"'])\)\)\s*\{/g;
    content = content.replace(confirmBlockRegex, (match, quote1, text, quote2) => {
        let title = "Konfirmasi";
        let confirmBtn = "Ya, Lanjutkan";
        if (text.toLowerCase().includes("hapus")) {
            title = "Konfirmasi Hapus";
            confirmBtn = "Ya, Hapus";
        }
        return `const confirmResult = await Swal.fire({
      title: '${title}',
      text: \`${text}\`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#858796',
      confirmButtonText: '${confirmBtn}',
      cancelButtonText: 'Batal'
    });
    if (confirmResult.isConfirmed) {`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated Swal in ${filePath}`);
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
