'use client';

import { useState, useTransition, useRef } from 'react';
import { Plus, Edit, Trash2, X, Loader2, UploadCloud } from 'lucide-react';
import { createNewsArticle, updateNewsArticle, deleteNewsArticle } from '@/app/actions/cmsActions';
import { compressImageToWebp, uploadToSupabase } from '@/utils/imageUpload';
import { CustomSelect } from '@/components/ui/CustomSelect';

type NewsArticle = {
  id: string;
  title: string;
  category: string;
  date_published: string;
  image_url: string;
  color_theme: string;
  link: string | null;
  is_featured: boolean;
};

// Form Modal Component
function BeritaFormModal({
  isOpen,
  onClose,
  initialData = null
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: NewsArticle | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    // Convert datetime-local to ISO string or format required by DB
    const dateInput = formData.get('date_published') as string;
    if (dateInput) {
      formData.set('date_published', new Date(dateInput).toISOString());
    }
    
    startTransition(async () => {
      try {
        let finalImageUrl = initialData?.image_url || '';
        
        if (selectedFile) {
          setLoadingMessage("Mengompresi gambar (WebP)...");
        const webpFile = await compressImageToWebp(selectedFile);
          setLoadingMessage("Mengunggah gambar...");
        finalImageUrl = await uploadToSupabase(webpFile, 'news');
        } else if (!initialData) {
          throw new Error('Gambar cover wajib diunggah');
        }

        formData.set('image_url', finalImageUrl);

        let result;
        if (initialData) {
          result = await updateNewsArticle(initialData.id, formData);
        } else {
          result = await createNewsArticle(formData);
        }

        if (result?.error) {
          setError(result.error);
        } else {
          onClose();
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat menyimpan data');
      }
    });
  };

  const defaultDate = initialData?.date_published 
    ? new Date(initialData.date_published).toISOString().slice(0, 16) 
    : new Date().toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white shadow-2xl w-full max-w-md h-full flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold font-display text-gray-900">
            {initialData ? 'Edit Berita' : 'Tambah Berita'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sidebar-scrollbar">
          <form id="berita-form" onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Cover (Wajib)</label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full h-48 border-2 border-dashed rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center transition-colors hover:bg-gray-50 ${previewImage ? 'border-gray-200' : 'border-[#3D7A5E]/30 bg-green-50/30'}`}
              >
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Ganti Gambar
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <UploadCloud className="w-8 h-8 text-[#3D7A5E] mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Klik untuk unggah gambar</p>
                    <p className="text-xs text-gray-500 mt-1">Otomatis dikompresi ke WebP</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
              <input 
                name="title" 
                type="text" 
                required 
                defaultValue={initialData?.title || ''}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] outline-none transition-colors"
                placeholder="Contoh: 5 Kafe Legendaris di Braga"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <input 
                  name="category" 
                  type="text" 
                  required 
                  defaultValue={initialData?.category || ''}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] outline-none transition-colors"
                  placeholder="Misal: Kuliner Lokal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warna Label</label>
                <CustomSelect 
                  name="color_theme" 
                  defaultValue={initialData?.color_theme || 'emerald'}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] outline-none transition-colors"
                  options={[
                    { value: 'emerald', label: 'Hijau (Emerald)' },
                    { value: 'blue', label: 'Biru (Blue)' },
                    { value: 'amber', label: 'Kuning (Amber)' },
                    { value: 'rose', label: 'Merah (Rose)' },
                    { value: 'purple', label: 'Ungu (Purple)' },
                  ]}
                  placeholder="Pilih Warna"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Publish</label>
              <input 
                name="date_published" 
                type="datetime-local" 
                required
                defaultValue={defaultDate}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] outline-none transition-colors"
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end bg-white shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit" 
            form="berita-form"
            disabled={isPending}
            className="bg-[#3D7A5E] hover:bg-[#2c5c45] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Tambah Berita'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddBeritaButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#3D7A5E] hover:bg-[#2c5c45] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
      >
        <Plus className="w-5 h-5" />
        Tambah Berita
      </button>
      <BeritaFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function EditBeritaButton({ article }: { article: NewsArticle }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
        title="Edit Berita"
      >
        <Edit className="w-4 h-4" />
      </button>
      <BeritaFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialData={article} />
    </>
  );
}

export function DeleteBeritaButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) {
      startTransition(async () => {
        const result = await deleteNewsArticle(id);
        if (result?.error) {
          alert(`Error: ${result.error}`);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus Berita"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
