"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "./log";

// CREATE DESTINATION
export async function createDestinationAction(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized. Anda harus login sebagai admin." };
  }

  try {
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const lat = formData.get("lat") ? parseFloat(formData.get("lat") as string) : null;
    const lng = formData.get("lng") ? parseFloat(formData.get("lng") as string) : null;
    const ticket_type = formData.get("ticket_type") as string;
    const ticket_nominal = formData.get("ticket_nominal") ? parseInt(formData.get("ticket_nominal") as string) : null;
    const opening_hours = formData.get("opening_hours") as string;
    const content = formData.get("content") as string;
    const founded_year = formData.get("founded_year") ? parseInt(formData.get("founded_year") as string) : null;
    const source_photo_credit = formData.get("source_photo_credit") as string;
    const status = formData.get("status") as string;
    const imageUrl = formData.get("image_url") as string;
    const leafletUrl = formData.get("leaflet_url") as string;
    const galleryUrlsStr = formData.get("gallery_urls") as string;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    // Save image into images JSONB array
    let imagesArray = imageUrl ? [imageUrl] : [];
    if (galleryUrlsStr) {
      try {
        const galleryUrls = JSON.parse(galleryUrlsStr);
        if (Array.isArray(galleryUrls)) {
          imagesArray = [...imagesArray, ...galleryUrls];
        }
      } catch (e) {
        console.error("Failed to parse gallery_urls", e);
      }
    }

    const { data: destData, error: destError } = await supabase
      .from("destinations")
      .insert({
        category_id,
        name,
        slug,
        description,
        address,
        lat,
        lng,
        price_info: ticket_type ? JSON.stringify({ type: ticket_type, nominal: ticket_type === 'PAID' ? ticket_nominal : null }) : null,
        opening_hours: opening_hours ? JSON.parse(opening_hours) : null,
        content,
        founded_year,
        status,
        images: imagesArray,
        source_photo_credit,
        leaflet_url: leafletUrl || null
      })
      .select()
      .single();

    if (destError) {
      console.error(destError);
      return { error: "Gagal menyimpan data destinasi: " + destError.message };
    }

    let warning = null;
    if (destData.is_potential_duplicate) {
       warning = "Peringatan (NFR-10): Lokasi ini berada sangat dekat (<10m) dengan destinasi lain di database. Data disimpan, namun ditandai sebagai potensi duplikat untuk direview.";
    }

    revalidatePath("/kategori");
    revalidatePath("/admin/dashboard");
    
    await logAdminAction('CREATE', 'DESTINATION', name);
    return { success: true, warning, id: destData.id };
  } catch (error: any) {
    console.error(error);
    return { error: "Terjadi kesalahan internal sistem." };
  }
}

// UPDATE DESTINATION
export async function updateDestinationAction(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized. Anda harus login sebagai admin." };
  }

  try {
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const lat = formData.get("lat") ? parseFloat(formData.get("lat") as string) : null;
    const lng = formData.get("lng") ? parseFloat(formData.get("lng") as string) : null;
    const ticket_type = formData.get("ticket_type") as string;
    const ticket_nominal = formData.get("ticket_nominal") ? parseInt(formData.get("ticket_nominal") as string) : null;
    const opening_hours = formData.get("opening_hours") as string;
    const content = formData.get("content") as string;
    const founded_year = formData.get("founded_year") ? parseInt(formData.get("founded_year") as string) : null;
    const source_photo_credit = formData.get("source_photo_credit") as string;
    const status = formData.get("status") as string;
    const imageUrl = formData.get("image_url") as string;
    const leafletUrl = formData.get("leaflet_url") as string;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const updatePayload: any = {
      category_id,
      name,
      slug,
      description,
      address,
      lat,
      lng,
      price_info: ticket_type ? JSON.stringify({ type: ticket_type, nominal: ticket_type === 'PAID' ? ticket_nominal : null }) : null,
      opening_hours: opening_hours ? JSON.parse(opening_hours) : null,
      content,
      founded_year,
      status,
      source_photo_credit,
      leaflet_url: leafletUrl || null,
      updated_at: new Date().toISOString()
    };

    if (imageUrl) {
      updatePayload.images = [imageUrl];
    }

    const { data: destData, error: destError } = await supabase
      .from("destinations")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (destError) {
      console.error(destError);
      return { error: "Gagal memperbarui data destinasi: " + destError.message };
    }

    revalidatePath("/kategori");
    revalidatePath("/admin/dashboard");
    revalidatePath(`/admin/destinasi/edit/${id}`);
    revalidatePath(`/destinasi/${slug}`);
    
    await logAdminAction('UPDATE', 'DESTINATION', name);
    return { success: true, id: destData.id };
  } catch (error: any) {
    console.error(error);
    return { error: "Terjadi kesalahan internal sistem." };
  }
}

// DELETE DESTINATION
export async function deleteDestinationAction(id: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized. Anda harus login sebagai admin." };
  }

  try {
    const { data: target, error: fetchError } = await supabase
      .from("destinations")
      .select("name")
      .eq("id", id)
      .single();

    const { error } = await supabase
      .from("destinations")
      .delete()
      .eq("id", id);

    if (error) {
      return { error: "Gagal menghapus destinasi: " + error.message };
    }

    revalidatePath("/kategori");
    revalidatePath("/admin/dashboard");
    
    await logAdminAction('DELETE', 'DESTINATION', target?.name || id);
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: "Terjadi kesalahan internal sistem." };
  }
}
