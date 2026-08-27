import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fcf9f5]">
      <Loader2 className="w-12 h-12 text-[#C9971E] animate-spin mb-4" />
      <p className="text-slate-600 font-medium animate-pulse">Memuat halaman...</p>
    </div>
  );
}
