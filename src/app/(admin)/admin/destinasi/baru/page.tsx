import DestinationForm from "@/components/admin/DestinationForm";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Tambah Destinasi Baru | Admin TIC Kota Bandung",
};

export default async function NewDestinationPage() {
  const supabase = await createClient();
  
  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  return (
    <main className="min-h-screen bg-[#fcf9f5] py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-[#1b1c1a] mb-2">Tambah Destinasi Baru</h1>
          <p className="text-[#4f4635]">Isi formulir di bawah untuk mendaftarkan destinasi wisata baru ke dalam sistem.</p>
        </div>

        <DestinationForm categories={categories || []} />
      </div>
    </main>
  );
}
