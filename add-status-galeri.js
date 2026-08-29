const fs = require('fs');

let content = fs.readFileSync('src/components/admin/cms/GaleriClient.tsx', 'utf8');

content = content.replace(
  'is_featured: boolean;',
  'is_featured: boolean;\n  status?: string;'
);

const handleToggleFunc = `  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const actionText = currentStatus === 'published' ? 'menurunkan (unpublish)' : 'menerbitkan (publish)';
    const result = await Swal.fire({
      title: 'Konfirmasi Ubah Status',
      text: \`Apakah Anda yakin ingin \${actionText} foto ini?\`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C9971E',
      cancelButtonColor: '#858796',
      confirmButtonText: 'Ya, Ubah',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        const res = await toggleGalleryStatus(id, currentStatus);
        if (res.error) toast.error(res.error);
        else toast.success('Status berhasil diubah!');
      });
    }
  };
`;
content = content.replace(
  'const handleDelete = async (id: string, title: string) => {',
  handleToggleFunc + '\n  const handleDelete = async (id: string, title: string) => {'
);

if (!content.includes('toggleGalleryStatus')) {
    content = content.replace(
        `import { createGallery, updateGallery, deleteGallery } from '@/app/actions/cmsActions';`,
        `import { createGallery, updateGallery, deleteGallery, toggleGalleryStatus } from '@/app/actions/cmsActions';`
    );
}

const toggleBtn = `
                  <button 
                    onClick={() => handleToggleStatus(item.id, item.status || 'published')}
                    disabled={isPending}
                    className={\`p-2 rounded-lg border transition-colors \${
                      (item.status || 'published') === 'published' 
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                    }\`}
                    title="Ubah Status"
                  >
                    {(item.status || 'published') === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>`;
content = content.replace(
  '<button \n                    onClick={() => handleEdit(item)}\n                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"',
  toggleBtn + '\n                  <button \n                    onClick={() => handleEdit(item)}\n                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"'
);
content = content.replace(
  `import { Plus, Edit, Trash2, X, Loader2, UploadCloud } from 'lucide-react';`,
  `import { Plus, Edit, Trash2, X, Loader2, UploadCloud, Eye, EyeOff } from 'lucide-react';`
);

fs.writeFileSync('src/components/admin/cms/GaleriClient.tsx', content);
console.log('Updated GaleriClient');
