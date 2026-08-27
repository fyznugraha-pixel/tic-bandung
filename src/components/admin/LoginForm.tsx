"use client";

import { useState } from "react";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(42,42,40,0.08)] border border-[#d3c5af]/50 p-8 md:p-10 w-full max-w-md">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-display text-[#1b1c1a] mb-2">Portal Admin</h1>
        <p className="text-[#4f4635] text-sm">Masuk untuk mengelola data TIC Kota Bandung</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Alamat Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              name="email"
              type="email" 
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none transition-all text-[#1b1c1a]"
              placeholder="admin@pesonabandung.id"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Kata Sandi</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              name="password"
              type="password" 
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none transition-all text-[#1b1c1a]"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full py-3.5 bg-[#3D7A5E] hover:bg-[#2e5e48] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Memverifikasi..." : "Masuk ke Dashboard"}
        {!isPending && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
      
      <p className="mt-6 text-center text-xs text-gray-500">
        Halaman ini dilindungi oleh autentikasi Supabase. Hanya staf dengan role Admin yang diizinkan masuk.
      </p>
    </form>
  );
}
