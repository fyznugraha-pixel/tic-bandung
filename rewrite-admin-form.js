const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventForm.tsx', 'utf8');

content = content.replace(
  /type FormData = \{[\s\S]*?\};/,
  `type FormData = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  destination_id?: string;
  organizer: string;
  location: string;
  pic_name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  kol_partner: string;
  artist_performance: string;
  usp: string;
  target_visitors: string;
  execution_count: string;
  promotion_media: string;
  attachment_link: string;
  commitment_letter_link: string;
};`
);

content = content.replace(
  /reset\(\{[\s\S]*?\}\);/,
  `reset({
        title: initialData.title || "",
        description: initialData.description || "",
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : "",
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : "",
        destination_id: initialData.destination_id || "",
        organizer: initialData.organizer || "",
        location: initialData.location || "",
        pic_name: initialData.pic_name || "",
        whatsapp: initialData.whatsapp || "",
        email: initialData.email || "",
        instagram: initialData.instagram || "",
        kol_partner: initialData.kol_partner || "",
        artist_performance: initialData.artist_performance || "",
        usp: initialData.usp || "",
        target_visitors: initialData.target_visitors ? initialData.target_visitors.toString() : "",
        execution_count: initialData.execution_count ? initialData.execution_count.toString() : "",
        promotion_media: initialData.promotion_media || "",
        attachment_link: initialData.attachment_link || "",
        commitment_letter_link: initialData.commitment_letter_link || "",
      });`
);

const newFieldsHTML = `
          <div className="md:col-span-2">
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Lokasi Terperinci (Tempat Acara) *</label>
            <input 
              {...register("location", { required: "Lokasi wajib diisi" })} 
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
              placeholder="Contoh: Kiara Artha Park"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Informasi Penanggung Jawab (PIC)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="md:col-span-2">
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Nama Penanggung Jawab *</label>
            <input 
              {...register("pic_name", { required: "Wajib diisi" })} 
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Nomor WhatsApp *</label>
            <input 
              {...register("whatsapp", { required: "Wajib diisi" })} 
              type="tel"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Email *</label>
            <input 
              {...register("email", { required: "Wajib diisi" })} 
              type="email"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Detail Spesifik & Promosi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Akun Instagram Acara</label>
            <input 
              {...register("instagram")} 
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
              placeholder="@nama.ig"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Mitra KOL</label>
            <input 
              {...register("kol_partner")} 
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Pertunjukan Artis (Line Up)</label>
            <input 
              {...register("artist_performance")} 
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Nilai Jual Unik (USP) *</label>
            <textarea 
              {...register("usp", { required: "Wajib diisi" })} 
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none resize-none" 
            ></textarea>
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Target Pengunjung *</label>
            <input 
              {...register("target_visitors", { required: "Wajib diisi" })} 
              type="number"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Pelaksanaan Ke-berapa? *</label>
            <input 
              {...register("execution_count", { required: "Wajib diisi" })} 
              type="number"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
        </div>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#1b1c1a] mb-2">Berkas Lampiran</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="md:col-span-2">
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Media Promosi (Google Drive Link) *</label>
            <input 
              {...register("promotion_media", { required: "Wajib diisi" })} 
              type="url"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Link File Proposal/Poster</label>
            <input 
              {...register("attachment_link")} 
              type="url"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
          <div>
            <label className="block text-base font-bold text-[#1b1c1a] mb-2">Link Surat Kesediaan</label>
            <input 
              {...register("commitment_letter_link")} 
              type="url"
              className="w-full px-4 py-3 bg-gray-50 text-base border border-gray-200 rounded-lg outline-none" 
            />
          </div>
        </div>
      </div>`;

// Safely insert it right after the closing div of Waktu & Lokasi
const targetLocation = /<\/div>\s*<\/div>\s*<div className="mb-8">/m;
content = content.replace(targetLocation, newFieldsHTML + '\n\n      <div className="mb-8">');

fs.writeFileSync('src/components/admin/EventForm.tsx', content);
