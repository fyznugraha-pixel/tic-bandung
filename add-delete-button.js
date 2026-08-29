const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  /import \{ updateSubmissionStatusAction \} from '@\/app\/actions\/eventSubmission';/,
  `import { updateSubmissionStatusAction, deleteSubmissionAction } from '@/app/actions/eventSubmission';`
);

content = content.replace(
  /import \{ ExternalLink, CheckCircle, XCircle, Clock, Eye, Download \} from 'lucide-react';/,
  `import { ExternalLink, CheckCircle, XCircle, Clock, Eye, Download, Trash2 } from 'lucide-react';`
);

// 2. Add handleDelete function
const handleDeleteFn = `
  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: 'Hapus Pengajuan?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#858796',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });
    if (!confirmResult.isConfirmed) return;
    
    startTransition(async () => {
      const result = await deleteSubmissionAction(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Berhasil menghapus pengajuan!");
        setData(prev => prev.filter(item => item.id !== id));
      }
    });
  };

  const showDetail`;
content = content.replace(/const showDetail/, handleDeleteFn);

// 3. Add delete button to JSX
const actionButtons = `
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => showDetail(item)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors border border-blue-200 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Lihat Detail
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200 flex items-center justify-center"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>`;

content = content.replace(
  /<button\s+onClick=\{\(\) => showDetail\(item\)\}\s+className="px-3 py-1\.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors border border-blue-200 flex items-center justify-center gap-1 ml-auto"\s+>\s+<Eye className="w-3 h-3" \/> Lihat Detail\s+<\/button>/,
  actionButtons
);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Added delete button');
