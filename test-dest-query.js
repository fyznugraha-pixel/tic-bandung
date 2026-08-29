const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase
    .from('destinations')
    .select(`
      *,
      categories (
        name,
        slug,
        cluster_color
      )
    `)
    .eq('slug', 'gedung-sate')
    .single();
  console.log("Error:", error);
  console.log("Data:", !!data);
}
run();
