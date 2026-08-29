const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DIRECT_URL });
client.connect().then(async () => {
  const policies = await client.query(`
    select policyname, permissive, roles, cmd, qual, with_check 
    from pg_policies 
    where tablename = 'event_submissions'
  `);
  console.log('Policies for event_submissions:');
  console.log(policies.rows);
  client.end();
}).catch(console.error);
