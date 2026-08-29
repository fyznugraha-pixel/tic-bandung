const fs = require('fs');
let content = fs.readFileSync('src/app/actions/admin.ts', 'utf8');

content = content.replace(
  'const supabase = await createClient();\n  const { data: { session } } = await supabase.auth.getSession();',
  'const supabase = await createServerClient();\n  const { data: { session } } = await supabase.auth.getSession();'
);

fs.writeFileSync('src/app/actions/admin.ts', content);
console.log('Fixed createClient error');
