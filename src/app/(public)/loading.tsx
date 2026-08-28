import React from 'react';
import { Loader2 } from 'lucide-react';

export default function PublicLoading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#fcf9f5]">
      <Loader2 className="w-10 h-10 text-[#C9971E] animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">Memuat halaman...</p>
    </div>
  );
}
