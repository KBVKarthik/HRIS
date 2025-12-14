const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Job Postings
router.get('/postings', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT jp.*, d.name as designation_name, dp.name as department_name
       FROM job_postings jp
       LEFT JOIN designations d ON jp.designation_id = d.id
       LEFT JOIN departments dp ON jp.department_id = dp.id
       ORDER BY jp.posted_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/postings', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, designation_id, department_id, closing_date, salary_min, salary_max } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO job_postings (id, title, description, designation_id, department_id, closing_date, salary_min, salary_max)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, title, description, designation_id, department_id, closing_date, salary_min, salary_max]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Candidates
router.get('/candidates', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM candidates ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/candidates', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { first_name, last_name, email, phone, location, skills, experience_years, source } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO candidates (id, first_name, last_name, email, phone, location, skills, experience_years, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, first_name, last_name, email, phone, location, skills, experience_years, source]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Applications
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, jp.title as job_title, c.first_name, c.last_name, c.email
       FROM applications a
       LEFT JOIN job_postings jp ON a.job_posting_id = jp.id
       LEFT JOIN candidates c ON a.candidate_id = c.id
       ORDER BY a.applied_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/applications', authenticateToken, async (req, res) => {
  try {
    const { job_posting_id, candidate_id } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO applications (id, job_posting_id, candidate_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, job_posting_id, candidate_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/applications/:id', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { status, feedback, rating } = req.body;

    const result = await pool.query(
      `UPDATE applications 
       SET status = $2, feedback = COALESCE($3, feedback), rating = COALESCE($4, rating),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id, status, feedback, rating]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
