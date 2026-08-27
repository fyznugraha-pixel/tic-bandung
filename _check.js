const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Kopihitam2005@db.ntiouktlfnttwkkoclrr.supabase.co:5432/postgres'
  });
  await client.connect();

  const tables = ['destinations', 'categories', 'destination_images'];

  for (const table of tables) {
    await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`);
    await client.query(`DROP POLICY IF EXISTS ${table}_read ON ${table}`);
    await client.query(`DROP POLICY IF EXISTS ${table}_all ON ${table}`);
    await client.query(`CREATE POLICY ${table}_read ON ${table} FOR SELECT USING (true)`);
    await client.query(`CREATE POLICY ${table}_all ON ${table} FOR ALL USING (true)`);
    console.log(`RLS policies set for: ${table}`);
  }

  // Verify destinations data
  const result = await client.query('SELECT count(*) FROM destinations');
  console.log('Destinations count:', result.rows[0].count);

  await client.end();
}

main().catch(e => { console.error(e); process.exit(1); });
