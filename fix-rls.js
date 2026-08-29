const fs = require('fs');
let content = fs.readFileSync('src/app/actions/admin.ts', 'utf8');

const target = `  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return { error: "Not logged in" };
  
  const { error } = await supabase
    .from('admin_roles')
    .update({ last_seen: new Date().toISOString() })
    .eq('user_id', session.user.id);`;

const replacement = `  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return { error: "Not logged in" };
  
  const adminSupabase = getAdminSupabase();
  const { error } = await adminSupabase
    .from('admin_roles')
    .update({ last_seen: new Date().toISOString() })
    .eq('user_id', session.user.id);`;

content = content.replace(target, replacement);

fs.writeFileSync('src/app/actions/admin.ts', content);
console.log('Fixed RLS in updateLastSeen');
