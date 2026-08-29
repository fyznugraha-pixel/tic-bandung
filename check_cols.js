const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  const cols = await client.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'destinations'
  `);
  console.log('Columns in destinations:', cols.rows.map(r => r.column_name));
  client.end();
}).catch(console.error);
