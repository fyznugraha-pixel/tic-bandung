const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');

const deleteAction = `
export async function deleteSubmissionAction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized." };

  const { error } = await supabase
    .from("event_submissions")
    .delete()
    .eq("id", id);
    
  if (error) {
    console.error("Delete Error:", error);
    return { error: "Gagal menghapus data." };
  }

  revalidatePath('/admin/event-submissions');
  revalidatePath('/admin/dashboard');
  return { success: true };
}
`;

content += '\n' + deleteAction;
fs.writeFileSync('src/app/actions/eventSubmission.ts', content);
console.log('Added delete action');
