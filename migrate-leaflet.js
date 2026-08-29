const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function run() {
  await client.connect();
  try {
    await client.query(`
      ALTER TABLE destinations 
      ADD COLUMN IF NOT EXISTS leaflet_url text;
    `);
    console.log('Added leaflet_url to destinations');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
