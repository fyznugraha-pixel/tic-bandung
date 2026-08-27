"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, CheckCircle, Info } from "lucide-react";
import { createDestinationAction } from "@/app/actions/destination";

type Category = {
  id: string;
  name: string;
};

type FormData = {
  name: string;
  category_id: string;
  description: string;
  address: string;
  district: string;
  latitude: string;
  longitude: string;
  ticket_type: "FREE" | "PAID" | "UNCONFIRMED";
  ticket_nominal?: string;
  operating_hours: string;
  established_year: string;
  source_photo_credit: string;
};

export default function DestinationForm({ categories }: { categories: Category[] }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      ticket_type: "UNCONFIRMED",
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchTicketType = watch("ticket_type");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const onSubmit = async (data: FormData, status: "DRAFT" | "PUBLISHED") => {
    setIsSubmitting(true);
    try {
      if (!imageFile) {
        alert("Foto wajib diunggah sesuai ketentuan (NFR-16)");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const val = data[key as keyof FormData];
        if (val !== undefined && val !== "") {
          formData.append(key, val as string);
        }
      });
      formData.append("status", status);
      formData.append("image", imageFile);

      const result = await createDestinationAction(formData);
      
      if (result.error) {
        alert(result.error);
        return;
      }

      if (result.warning) {
        alert(result.warning);
      } else {
        alert(`Destinasi berhasil disimpan sebagai ${status}!`);
      }
      
      window.location.reload();
      
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="bg-white rounded-xl shadow-sm border border-[#d3c5af]/50 p-6 md:p-8">
      
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Informasi Utama</h2>
        <p className="text-sm text-[#4f4635]">Data dasar tentang destinasi wisata.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Nama Destinasi *</label>
            <input 
              {...register("name", { required: "Nama wajib diisi" })} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none" 
              placeholder="Contoh: Museum Geologi"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Kategori *</label>
            <select 
              {...register("category_id", { required: "Kategori wajib dipilih" })}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Deskripsi Singkat</label>
            <textarea 
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none" 
              placeholder="Jelaskan daya tarik destinasi ini..."
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Lokasi & Pemetaan (NFR-10)</h2>
        <div className="bg-[#3D7A5E]/10 border border-[#3D7A5E]/20 p-4 rounded-lg flex gap-3 items-start mb-6">
          <Info className="w-5 h-5 text-[#3D7A5E] shrink-0 mt-0.5" />
          <p className="text-sm text-[#3D7A5E] leading-relaxed">
            Sistem akan mendeteksi otomatis jika titik koordinat (Latitude/Longitude) yang Anda masukkan berada kurang dari 10 meter dari destinasi lain yang sudah terdaftar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Alamat Lengkap *</label>
            <input 
              {...register("address", { required: "Alamat wajib diisi" })} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none" 
              placeholder="Jl. Diponegoro No.57, Cihaur Geulis..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Kecamatan</label>
            <input 
              {...register("district")} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none" 
              placeholder="Contoh: Cibeunying Kaler"
            />
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Latitude *</label>
            <input 
              {...register("latitude", { required: "Latitude wajib diisi" })} 
              type="number" step="any"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono text-sm" 
              placeholder="-6.900277"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Longitude *</label>
            <input 
              {...register("longitude", { required: "Longitude wajib diisi" })} 
              type="number" step="any"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono text-sm" 
              placeholder="107.618611"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Informasi Tiket & Operasional (NFR-09)</h2>
        <p className="text-sm text-[#4f4635] mb-6">Penentuan status harga secara eksplisit agar sistem membedakan Gratis dan Belum Konfirmasi.</p>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <label className="block text-sm font-semibold text-[#1b1c1a] mb-4">Status Harga Tiket Masuk *</label>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="UNCONFIRMED" {...register("ticket_type")} className="w-4 h-4 text-[#3D7A5E] focus:ring-[#3D7A5E]" />
                <span className="text-sm text-gray-700">Belum Terkonfirmasi (Disembunyikan di UI)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="FREE" {...register("ticket_type")} className="w-4 h-4 text-[#3D7A5E] focus:ring-[#3D7A5E]" />
                <span className="text-sm text-gray-700">Gratis (Ditampilkan "Gratis")</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="PAID" {...register("ticket_type")} className="w-4 h-4 text-[#3D7A5E] focus:ring-[#3D7A5E]" />
                <span className="text-sm text-gray-700">Berbayar</span>
              </label>
            </div>

            {watchTicketType === "PAID" && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Nominal Harga (Rp) *</label>
                <input 
                  {...register("ticket_nominal", { required: watchTicketType === "PAID" ? "Nominal wajib diisi jika berbayar" : false })} 
                  type="number"
                  className="w-full sm:w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none font-mono" 
                  placeholder="Contoh: 25000"
                />
                {errors.ticket_nominal && <p className="text-red-500 text-xs mt-1">{errors.ticket_nominal.message}</p>}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Jam Operasional (JSON)</label>
              <input 
                {...register("operating_hours")} 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono text-sm" 
                placeholder='{"senin": "08:00-16:00"}'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Tahun Berdiri</label>
              <input 
                {...register("established_year")} 
                type="number"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none" 
                placeholder="Contoh: 1920"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Aset Visual (NFR-11)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Foto Utama *</label>
            <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center overflow-hidden cursor-pointer group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-gray-500">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Pilih atau letakkan foto</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1b1c1a] mb-2">Kredit / Sumber Foto *</label>
            <p className="text-xs text-gray-500 mb-2">Wajib diisi untuk audit hak cipta aset (NFR-11). Contoh: "Dinas Pariwisata Bandung" atau "Unsplash by John Doe".</p>
            <input 
              {...register("source_photo_credit", { required: "Kredit foto wajib diisi" })} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3D7A5E] focus:ring-1 focus:ring-[#3D7A5E] outline-none" 
              placeholder="Sumber / Fotografer..."
            />
            {errors.source_photo_credit && <p className="text-red-500 text-xs mt-1">{errors.source_photo_credit.message}</p>}
          </div>

        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
        <button 
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "DRAFT"))}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Simpan ke Draft
        </button>
        <button 
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "PUBLISHED"))}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#3D7A5E] text-white font-bold hover:bg-[#2e5e48] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          {isSubmitting ? "Menyimpan..." : "Publish Destinasi"}
        </button>
      </div>
    </form>
  );
}
