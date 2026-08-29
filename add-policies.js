const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  try {
    await client.query(`CREATE POLICY "Enable read access for authenticated users" ON public.event_submissions FOR SELECT USING (auth.role() = 'authenticated');`);
    console.log("SELECT policy added.");
  } catch(e) { console.log(e.message) }
  
  try {
    await client.query(`CREATE POLICY "Enable update for authenticated users" ON public.event_submissions FOR UPDATE USING (auth.role() = 'authenticated');`);
    console.log("UPDATE policy added.");
  } catch(e) { console.log(e.message) }
  
  client.end();
}).catch(console.error);
