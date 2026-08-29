const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { error } = await supabase
      .from("event_submissions")
      .insert({
        title: "Test Event Anon",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        eo_name: "Test EO",
        location: "Test Location",
        description: "Test Desc",
        pic_name: "Test PIC",
        whatsapp: "0812345678",
        email: "test@test.com",
        status: "PENDING"
      });
  console.log('Insert Error (Anon):', error);
}
run();
