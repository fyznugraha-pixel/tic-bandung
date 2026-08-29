const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  const check = await client.query(`
    SELECT table_name FROM information_schema.tables WHERE table_name = 'destination_images'
  `);
  console.log('destination_images exists:', check.rows.length > 0);
  client.end();
}).catch(console.error);
