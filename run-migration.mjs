import pg from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = "postgresql://postgres.ntiouktlfnttwkkoclrr:Kopihitam2005@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

const client = new pg.Client({ connectionString });

async function run() {
  try {
    await client.connect();
    console.log("Connected to Supabase.");

    const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql');
    const seedPath = path.join(process.cwd(), 'supabase', 'seed_dev.sql');

    console.log("Reading schema.sql...");
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log("Executing schema.sql...");
    await client.query(schemaSql);
    console.log("schema.sql executed successfully.");

    console.log("Reading seed_dev.sql...");
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    
    console.log("Executing seed_dev.sql...");
    await client.query(seedSql);
    console.log("seed_dev.sql executed successfully.");

  } catch (err) {
    console.error("Error executing migration:", err);
  } finally {
    await client.end();
  }
}

run();
