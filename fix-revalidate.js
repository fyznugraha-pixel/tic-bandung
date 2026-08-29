const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');

content = content.replace(
  /    if \(error\) \{\s*console\.error\("Supabase insert error:", error\);\s*return \{ error: "Gagal mengirim formulir\. Silakan coba lagi\." \};\s*\}/,
  `    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Gagal mengirim formulir. Silakan coba lagi." };
    }

    revalidatePath('/admin/event-submissions');
    revalidatePath('/admin/dashboard');`
);

fs.writeFileSync('src/app/actions/eventSubmission.ts', content);
console.log('Added revalidatePath');
