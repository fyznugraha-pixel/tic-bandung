const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function run() {
  await client.connect();
  try {
    // Add status to news_articles
    await client.query(`
      ALTER TABLE news_articles 
      ADD COLUMN IF NOT EXISTS status text DEFAULT 'published' CHECK (status IN ('published', 'draft'));
    `);
    console.log('Added status to news_articles');

    // Add status to galleries
    await client.query(`
      ALTER TABLE galleries 
      ADD COLUMN IF NOT EXISTS status text DEFAULT 'published' CHECK (status IN ('published', 'draft'));
    `);
    console.log('Added status to galleries');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
