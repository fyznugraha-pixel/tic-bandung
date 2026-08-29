const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  const cols = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'event_submissions'
  `);
  console.log('Columns in event_submissions:');
  cols.rows.forEach(r => console.log(r.column_name, r.data_type));
  client.end();
}).catch(console.error);
