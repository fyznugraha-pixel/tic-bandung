"use client";

import { useState } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { submitEventFormAction } from '@/app/actions/eventSubmission';

export default function EventSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await submitEventFormAction(formData);

    setIsSubmitting(false);

    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Terima kasih telah mendaftarkan event Anda. Tim kurator kami akan mereviu data Anda secepatnya dan menghubungi Anda melalui WhatsApp atau Email.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-amber-500 font-bold hover:text-amber-400 text-sm"
        >
          Kirim Form Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Nama Penanggung Jawab *</label>
        <input 
          type="text" 
          name="pic_name"
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" 
          placeholder="Nama lengkap" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Nama Perusahaan / EO *</label>
        <input 
          type="text" 
          name="eo_name"
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" 
          placeholder="Nama EO atau Instansi" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email Aktif *</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" 
            placeholder="email@domain.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">No. WhatsApp *</label>
          <input 
            type="tel" 
            name="whatsapp"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" 
            placeholder="0812xxxx" 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Attachment Materi Event (Link) *</label>
        <input 
          type="url" 
          name="attachment_link"
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" 
          placeholder="Link Google Drive / Dropbox materi" 
        />
        <p className="text-xs text-slate-500 mt-2">*Lampirkan link folder berisi Proposal, Flyer, Logo, dll. Pastikan akses link terbuka (Public).</p>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#C9971E] text-white font-bold py-4 rounded-xl hover:bg-amber-600 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FileText className="w-5 h-5" /> 
        {isSubmitting ? "Mengirim Data..." : "Submit Pendaftaran"}
      </button>
    </form>
  );
}
