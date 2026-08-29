const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function run() {
  await client.connect();
  try {
    // Modify event_submissions table
    await client.query(`
      ALTER TABLE event_submissions 
      ADD COLUMN IF NOT EXISTS title text,
      ADD COLUMN IF NOT EXISTS description text,
      ADD COLUMN IF NOT EXISTS start_date timestamptz,
      ADD COLUMN IF NOT EXISTS end_date timestamptz,
      ADD COLUMN IF NOT EXISTS location text,
      ADD COLUMN IF NOT EXISTS instagram text,
      ADD COLUMN IF NOT EXISTS kol_partner text,
      ADD COLUMN IF NOT EXISTS artist_performance text,
      ADD COLUMN IF NOT EXISTS usp text,
      ADD COLUMN IF NOT EXISTS target_visitors integer,
      ADD COLUMN IF NOT EXISTS execution_count integer,
      ADD COLUMN IF NOT EXISTS promotion_media text,
      ADD COLUMN IF NOT EXISTS commitment_letter_link text;
    `);
    console.log('Modified event_submissions table');

    // Modify events table
    await client.query(`
      ALTER TABLE events 
      ADD COLUMN IF NOT EXISTS pic_name text,
      ADD COLUMN IF NOT EXISTS whatsapp text,
      ADD COLUMN IF NOT EXISTS email text,
      ADD COLUMN IF NOT EXISTS location text,
      ADD COLUMN IF NOT EXISTS instagram text,
      ADD COLUMN IF NOT EXISTS kol_partner text,
      ADD COLUMN IF NOT EXISTS artist_performance text,
      ADD COLUMN IF NOT EXISTS usp text,
      ADD COLUMN IF NOT EXISTS target_visitors integer,
      ADD COLUMN IF NOT EXISTS execution_count integer,
      ADD COLUMN IF NOT EXISTS promotion_media text,
      ADD COLUMN IF NOT EXISTS attachment_link text,
      ADD COLUMN IF NOT EXISTS commitment_letter_link text;
    `);
    console.log('Modified events table');

    // Create a bucket for event_submissions if it doesn't exist
    // Actually, SQL for creating Supabase storage bucket requires accessing the storage schema.
    // It's safer to just use the existing 'events' or 'destinations' bucket, but we'll try to insert into storage.buckets
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('event_submissions', 'event_submissions', true)
      ON CONFLICT (id) DO NOTHING;
    `);
    
    // Create policies for the bucket
    await client.query(`
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'event_submissions');
    `).catch(() => console.log('Policy SELECT might exist'));

    await client.query(`
      CREATE POLICY "Anon Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event_submissions');
    `).catch(() => console.log('Policy INSERT might exist'));

    console.log('Created event_submissions bucket and policies');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
