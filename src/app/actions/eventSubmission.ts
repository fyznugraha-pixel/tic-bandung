"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitEventFormAction(formData: FormData) {
  const supabase = await createClient();

  try {
    const title = formData.get("title") as string;
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const eo_name = formData.get("eo_name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const pic_name = formData.get("pic_name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const instagram = formData.get("instagram") as string;
    const kol_partner = formData.get("kol_partner") as string;
    const artist_performance = formData.get("artist_performance") as string;
    const usp = formData.get("usp") as string;
    const target_visitors = formData.get("target_visitors") ? parseInt(formData.get("target_visitors") as string) : null;
    const execution_count = formData.get("execution_count") ? parseInt(formData.get("execution_count") as string) : null;
    const promotion_media = formData.get("promotion_media") as string;

    const attachment_link = formData.get("attachment_link") as string;
    const commitment_letter_link = formData.get("commitment_letter_link") as string;

    const { error } = await supabase
      .from("event_submissions")
      .insert({
        title,
        start_date: start_date ? new Date(start_date).toISOString() : null,
        end_date: end_date ? new Date(end_date).toISOString() : null,
        eo_name,
        location,
        description,
        pic_name,
        whatsapp,
        email,
        instagram,
        kol_partner,
        artist_performance,
        usp,
        target_visitors,
        execution_count,
        promotion_media,
        attachment_link,
        commitment_letter_link,
        status: "PENDING"
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Gagal mengirim formulir. Silakan coba lagi." };
    }

    return { success: true };
  } catch (error) {
    console.error("Submit error:", error);
    return { error: "Terjadi kesalahan internal sistem." };
  }
}

export async function updateSubmissionStatusAction(id: string, status: "APPROVED" | "REJECTED") {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized." };
  }

  if (status === "APPROVED") {
    const { data: submission } = await supabase
      .from("event_submissions")
      .select("*")
      .eq("id", id)
      .single();
      
    if (submission) {
      const slug = submission.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      const imagesArray = submission.attachment_link ? [submission.attachment_link] : [];
      
      const { error: insertError } = await supabase
        .from("events")
        .insert({
          title: submission.title,
          slug: slug,
          description: submission.description,
          start_date: submission.start_date,
          end_date: submission.end_date,
          organizer: submission.eo_name,
          location: submission.location,
          pic_name: submission.pic_name,
          whatsapp: submission.whatsapp,
          email: submission.email,
          instagram: submission.instagram,
          kol_partner: submission.kol_partner,
          artist_performance: submission.artist_performance,
          usp: submission.usp,
          target_visitors: submission.target_visitors,
          execution_count: submission.execution_count,
          promotion_media: submission.promotion_media,
          attachment_link: submission.attachment_link,
          commitment_letter_link: submission.commitment_letter_link,
          status: "published",
          images: imagesArray
        });
        
      if (insertError) {
        console.error("Failed to copy to events:", insertError);
      }
    }
  }

  const { error } = await supabase
    .from("event_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/event-submissions");
  revalidatePath("/admin/event");
  revalidatePath("/event");
  return { success: true, status };
}
