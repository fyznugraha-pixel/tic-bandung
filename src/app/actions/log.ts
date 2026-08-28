"use server";

import { createClient } from "@/utils/supabase/server";

export async function logAdminAction(
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  entity: string,
  entity_name: string
) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Allow anonymous admin actions fallback for dev if needed
    const admin_email = user?.email || "admin@ticbandung.com";

    const { error } = await supabase
      .from('admin_logs')
      .insert({
        admin_email,
        action,
        entity,
        entity_name
      });

    if (error) {
      console.error("Failed to insert admin log:", error);
    }
  } catch (err) {
    console.error("Error in logAdminAction:", err);
  }
}

export async function getAdminLogs() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('admin_logs')
    .select('*')
    .neq('entity', 'ADMIN')
    .order('created_at', { ascending: false })
    .limit(100);
    
  return { data, error };
}
