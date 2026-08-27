"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitEventFormAction(formData: FormData) {
  const supabase = await createClient();

  try {
    const pic_name = formData.get("pic_name") as string;
    const eo_name = formData.get("eo_name") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const attachment_link = formData.get("attachment_link") as string;

    const { error } = await supabase
      .from("event_submissions")
      .insert({
        pic_name,
        eo_name,
        email,
        whatsapp,
        attachment_link,
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

  const { error } = await supabase
    .from("event_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/event-submissions");
  return { success: true, status };
}
