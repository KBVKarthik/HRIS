#!/usr/bin/env node

/**
 * Database Initialization Script
 * This script sets up the database with the schema and demo data
 */

const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log('🔄 Initializing HRIS Database...\n');

    // Read schema SQL
    const schemaPath = path.join(__dirname, 'src/config/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    console.log('📋 Creating database tables...');
    await client.query('BEGIN');
    await client.query(schemaSql);
    await client.query('COMMIT');
    console.log('✓ Database schema created successfully\n');

    // Get table counts
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `);

    console.log(`✓ Created ${tablesResult.rows.length} tables`);
    console.log('  Tables:', tablesResult.rows.map(r => r.tablename).join(', '));
    console.log('');

    // Read seed data SQL
    const seedPath = path.join(__dirname, 'src/config/seed-data.sql');
    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, 'utf8');

      console.log('📊 Loading seed data...');
      await client.query('BEGIN');
      await client.query(seedSql);
      await client.query('COMMIT');
      console.log('✓ Demo data loaded successfully\n');

      // Get data counts
      const counts = {
        departments: (await client.query('SELECT COUNT(*) FROM departments')).rows[0].count,
        designations: (await client.query('SELECT COUNT(*) FROM designations')).rows[0].count,
        employees: (await client.query('SELECT COUNT(*) FROM employees')).rows[0].count,
        job_postings: (await client.query('SELECT COUNT(*) FROM job_postings')).rows[0].count,
        candidates: (await client.query('SELECT COUNT(*) FROM candidates')).rows[0].count,
      };

      console.log('📈 Data Summary:');
      Object.entries(counts).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });
    }

    console.log('\n✅ Database initialization completed!\n');
    console.log('You can now start the server with: npm start');

  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Rollback error:', rollbackError);
    }
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run initialization
initializeDatabase();
