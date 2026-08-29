const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  const category = await client.query(`SELECT id, slug FROM categories WHERE slug = 'museum'`);
  console.log('Category museum:', category.rows);
  
  if (category.rows.length > 0) {
    const cid = category.rows[0].id;
    const dests = await client.query(`SELECT name, category_id, status FROM destinations WHERE category_id = $1`, [cid]);
    console.log('Destinations in category:', dests.rows);
  }
  
  const sate = await client.query(`SELECT name, category_id, status FROM destinations WHERE name ILIKE '%sate%'`);
  console.log('Gedung Sate:', sate.rows);
  
  client.end();
}).catch(e => console.error(e));
