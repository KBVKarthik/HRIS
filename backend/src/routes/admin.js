// Admin Routes - Data Management and System Configuration
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// GET - Check if demo data already exists
router.get('/demo-data-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM employees');
    const count = parseInt(result.rows[0].count);

    res.json({
      has_data: count > 0,
      employee_count: count,
      message: count > 0 ? 'Demo data already loaded' : 'No data in database'
    });
  } catch (error) {
    console.error('Error checking demo data:', error);
    res.status(500).json({ error: 'Failed to check demo data status' });
  }
});

// POST - Populate database with demo data
router.post('/populate-demo-data', isAdmin, async (req, res) => {
  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Read seed data SQL
    const seedDataPath = path.join(__dirname, '../config/seed-data.sql');
    const seedSql = fs.readFileSync(seedDataPath, 'utf8');

    // Execute seed data
    await client.query(seedSql);

    // Commit transaction
    await client.query('COMMIT');

    // Get counts of inserted data
    const counts = {
      departments: (await client.query('SELECT COUNT(*) FROM departments')).rows[0].count,
      designations: (await client.query('SELECT COUNT(*) FROM designations')).rows[0].count,
      employees: (await client.query('SELECT COUNT(*) FROM employees')).rows[0].count,
      job_postings: (await client.query('SELECT COUNT(*) FROM job_postings')).rows[0].count,
      candidates: (await client.query('SELECT COUNT(*) FROM candidates')).rows[0].count,
      applications: (await client.query('SELECT COUNT(*) FROM applications')).rows[0].count,
      career_paths: (await client.query('SELECT COUNT(*) FROM career_paths')).rows[0].count,
      development_plans: (await client.query('SELECT COUNT(*) FROM development_plans')).rows[0].count,
      organizational_changes: (await client.query('SELECT COUNT(*) FROM organizational_changes')).rows[0].count,
      satisfaction_surveys: (await client.query('SELECT COUNT(*) FROM satisfaction_surveys')).rows[0].count,
      training_programs: (await client.query('SELECT COUNT(*) FROM training_programs')).rows[0].count,
      training_enrollments: (await client.query('SELECT COUNT(*) FROM training_enrollments')).rows[0].count,
      certifications: (await client.query('SELECT COUNT(*) FROM certifications')).rows[0].count,
      succession_plans: (await client.query('SELECT COUNT(*) FROM succession_plans')).rows[0].count,
      mentorship_programs: (await client.query('SELECT COUNT(*) FROM mentorship_programs')).rows[0].count,
      promotions: (await client.query('SELECT COUNT(*) FROM promotions')).rows[0].count,
      compensation_structures: (await client.query('SELECT COUNT(*) FROM compensation_structures')).rows[0].count,
      benefits_programs: (await client.query('SELECT COUNT(*) FROM benefits_programs')).rows[0].count
    };

    res.json({
      success: true,
      message: 'Demo data populated successfully',
      data_counts: counts
    });

  } catch (error) {
    // Rollback on error
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Rollback error:', rollbackError);
    }

    console.error('Error populating demo data:', error);
    res.status(500).json({
      error: 'Failed to populate demo data',
      details: error.message
    });
  } finally {
    client.release();
  }
});

// POST - Clear all data (careful!)
router.post('/clear-all-data', isAdmin, async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Disable foreign key checks
    await client.query("SET session_replication_role = 'replica'");

    // Get list of tables
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `);

    // Delete all data from all tables
    for (const table of tablesResult.rows) {
      await client.query(`DELETE FROM ${table.tablename}`);
    }

    // Re-enable foreign key checks
    await client.query("SET session_replication_role = 'default'");

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'All data cleared successfully'
    });

  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Rollback error:', rollbackError);
    }

    console.error('Error clearing data:', error);
    res.status(500).json({
      error: 'Failed to clear data',
      details: error.message
    });
  } finally {
    client.release();
  }
});

// POST - Import CSV data (bulk import)
router.post('/import-csv', isAdmin, async (req, res) => {
  try {
    const { table_name, data } = req.body;

    if (!table_name || !data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid request: table_name and data array required' });
    }

    if (data.length === 0) {
      return res.status(400).json({ error: 'No data to import' });
    }

    // Validate table name (basic security)
    const validTables = [
      'employees', 'job_postings', 'candidates', 'applications',
      'career_paths', 'development_plans', 'training_programs',
      'satisfaction_surveys', 'promotions'
    ];

    if (!validTables.includes(table_name)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    // Build insert query dynamically
    const firstRecord = data[0];
    const columns = Object.keys(firstRecord).join(', ');
    const placeholders = Object.keys(firstRecord).map((_, i) => `$${i + 1}`).join(', ');

    let insertedCount = 0;

    for (const record of data) {
      const values = Object.values(record);
      try {
        await pool.query(
          `INSERT INTO ${table_name} (${columns}) VALUES (${placeholders})`,
          values
        );
        insertedCount++;
      } catch (error) {
        console.error(`Error inserting record into ${table_name}:`, error);
      }
    }

    res.json({
      success: true,
      message: `${insertedCount} of ${data.length} records imported`,
      inserted_count: insertedCount,
      total_count: data.length
    });

  } catch (error) {
    console.error('Error importing CSV:', error);
    res.status(500).json({
      error: 'Failed to import CSV',
      details: error.message
    });
  }
});

// GET - Get admin dashboard summary
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const summary = {
      total_employees: (await pool.query('SELECT COUNT(*) FROM employees')).rows[0].count,
      active_employees: (await pool.query("SELECT COUNT(*) FROM employees WHERE employment_status = 'active'")).rows[0].count,
      total_departments: (await pool.query('SELECT COUNT(*) FROM departments')).rows[0].count,
      total_candidates: (await pool.query('SELECT COUNT(*) FROM candidates')).rows[0].count,
      open_positions: (await pool.query("SELECT COUNT(*) FROM job_postings WHERE status = 'open'")).rows[0].count,
      training_programs: (await pool.query('SELECT COUNT(*) FROM training_programs')).rows[0].count,
      active_mentorships: (await pool.query("SELECT COUNT(*) FROM mentor_relationships WHERE status = 'active'")).rows[0].count,
      satisfaction_surveys: (await pool.query('SELECT COUNT(*) FROM satisfaction_surveys')).rows[0].count
    };

    res.json(summary);

  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET - Get template for bulk import
router.get('/import-template/:table_name', (req, res) => {
  const { table_name } = req.params;

  const templates = {
    employees: {
      description: 'Import employees',
      template: [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@company.com',
          phone: '1234567890',
          hire_date: '2025-01-15',
          salary: 75000,
          department_id: 'uuid-here',
          designation_id: 'uuid-here',
          employment_status: 'active'
        }
      ]
    },
    candidates: {
      description: 'Import job candidates',
      template: [
        {
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@email.com',
          phone: '9876543210',
          position_applied: 'Developer',
          source: 'LinkedIn',
          status: 'screening',
          applied_date: '2025-11-20'
        }
      ]
    },
    training_programs: {
      description: 'Import training programs',
      template: [
        {
          program_name: 'Advanced Python',
          description: 'Learn advanced Python concepts',
          duration_days: 30,
          provider: 'Udemy',
          category: 'technical',
          start_date: '2025-01-15'
        }
      ]
    },
    promotions: {
      description: 'Import promotions',
      template: [
        {
          employee_id: 'uuid-here',
          from_designation_id: 'uuid-here',
          to_designation_id: 'uuid-here',
          promotion_date: '2025-12-01',
          salary_increment: 15000,
          status: 'pending'
        }
      ]
    }
  };

  if (templates[table_name]) {
    res.json(templates[table_name]);
  } else {
    res.status(400).json({ error: 'Invalid table name or no template available' });
  }
});

module.exports = router;
