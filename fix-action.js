const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');

// Inside submitEventFormAction, replace createClient with a direct service role client
content = content.replace(
  /export async function submitEventFormAction\(formData: FormData\) \{\s*const supabase = await createClient\(\);/,
  `import { createClient as createSupabaseClient } from "@supabase/supabase-js";\n
export async function submitEventFormAction(formData: FormData) {
  // Use service role for public submission to bypass RLS issues if user is logged in as an admin testing the public page
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );`
);

fs.writeFileSync('src/app/actions/eventSubmission.ts', content);
console.log('Fixed submitEventFormAction');
