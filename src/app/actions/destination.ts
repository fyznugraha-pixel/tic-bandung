"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createDestinationAction(formData: FormData) {
  const supabase = await createClient();
  
  // NFR-12: Must be authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized. Anda harus login sebagai admin." };
  }

  try {
    // 1. Extract data
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const district = formData.get("district") as string;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const ticket_type = formData.get("ticket_type") as string;
    const ticket_nominal = formData.get("ticket_nominal") ? parseInt(formData.get("ticket_nominal") as string) : null;
    const operating_hours = formData.get("operating_hours") as string;
    const established_year = formData.get("established_year") ? parseInt(formData.get("established_year") as string) : null;
    const source_photo_credit = formData.get("source_photo_credit") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File;

    // Generate slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // 2. Insert into destinations
    // NFR-10 is handled by the database trigger! It will automatically set is_potential_duplicate
    const { data: destData, error: destError } = await supabase
      .from("destinations")
      .insert({
        category_id,
        name,
        slug,
        description,
        address,
        district,
        latitude,
        longitude,
        ticket_type,
        ticket_nominal: ticket_type === 'PAID' ? ticket_nominal : null,
        operating_hours: operating_hours ? JSON.parse(operating_hours) : null,
        established_year,
        status
      })
      .select()
      .single();

    if (destError) {
      console.error(destError);
      return { error: "Gagal menyimpan data destinasi: " + destError.message };
    }

    // 3. Upload Image (FR-17)
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${destData.id}-${Math.random()}.${fileExt}`;
      const filePath = `destinations/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("destination-images")
        .upload(filePath, image);

      if (uploadError) {
        return { error: "Gagal mengunggah gambar: " + uploadError.message };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("destination-images")
        .getPublicUrl(filePath);

      // 4. Save into destination_images (NFR-11)
      const { error: imgError } = await supabase
        .from("destination_images")
        .insert({
          destination_id: destData.id,
          image_url: publicUrl,
          source_photo_credit,
          is_primary: true
        });

      if (imgError) {
        return { error: "Gagal menyimpan metadata gambar: " + imgError.message };
      }
    }

    // NFR-10 Validation Check Warning to Admin
    let warning = null;
    if (destData.is_potential_duplicate) {
       warning = "Peringatan (NFR-10): Lokasi ini berada sangat dekat (<10m) dengan destinasi lain di database. Data disimpan, namun ditandai sebagai potensi duplikat untuk direview.";
    }

    revalidatePath("/kategori");
    revalidatePath("/admin/dashboard");
    
    return { success: true, warning, id: destData.id };

  } catch (error: any) {
    console.error(error);
    return { error: "Terjadi kesalahan internal sistem." };
  }
}
