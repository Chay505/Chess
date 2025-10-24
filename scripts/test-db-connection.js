/**
 * Database Connection Test Script
 * Tests PostgreSQL connection with SSL and connection pooling configuration
 */

import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: '.env.local' });

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...\n');

  // Use PUBLIC URL for local testing (internal URL only works within Railway)
  const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ ERROR: DATABASE_URL or DATABASE_PUBLIC_URL not found in .env.local');
    process.exit(1);
  }

  console.log('📊 Connection Details:');
  console.log(`   URL: ${connectionString.replace(/:[^:@]+@/, ':****@')}`); // Hide password
  console.log(`   SSL: ✅ Enabled (rejectUnauthorized: false)`);
  console.log(`   Pooling: ${connectionString.includes('pgbouncer=true') ? '✅ Enabled' : '⚠️  Disabled'}`);
  console.log('');

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false, // Railway uses self-signed certificates
    },
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connection successful!\n');

    console.log('📋 Running test query...');
    const result = await client.query('SELECT version(), current_database(), current_user');

    console.log('✅ Query successful!\n');
    console.log('Database Information:');
    console.log(`   Version: ${result.rows[0].version.split(' ').slice(0, 2).join(' ')}`);
    console.log(`   Database: ${result.rows[0].current_database}`);
    console.log(`   User: ${result.rows[0].current_user}`);
    console.log('');

    console.log('🎉 All tests passed! Database is ready for use.');

  } catch (error) {
    console.error('❌ Connection failed!');
    console.error(`   Error: ${error.message}`);

    if (error.message.includes('SSL') || error.message.includes('certificate')) {
      console.error('\n💡 Tip: Verify SSL configuration is set to { rejectUnauthorized: false } for Railway');
    }

    process.exit(1);
  } finally {
    await client.end();
  }
}

testDatabaseConnection();
