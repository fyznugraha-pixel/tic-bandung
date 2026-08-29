const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("Fetching destinations with ANON key...");
  const { data, error } = await supabase
    .from('destinations')
    .select('id, name')
    .eq('status', 'published');
    
  if (error) console.error("Error:", error);
  else console.log("Anon fetched destinations count:", data.length);
}

check();
