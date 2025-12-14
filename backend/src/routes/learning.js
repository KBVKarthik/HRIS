const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Training Programs
router.get('/programs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM training_programs ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/programs', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, category, start_date, end_date, duration_hours, instructor_name } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO training_programs (id, title, description, category, start_date, end_date, duration_hours, instructor_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, title, description, category, start_date, end_date, duration_hours, instructor_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Training Enrollments
router.get('/enrollments', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT te.*, tp.title as training_title, e.first_name, e.last_name
       FROM training_enrollments te
       LEFT JOIN training_programs tp ON te.training_id = tp.id
       LEFT JOIN employees e ON te.employee_id = e.id
       ORDER BY te.enrolled_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/enrollments', authenticateToken, async (req, res) => {
  try {
    const { training_id } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO training_enrollments (id, training_id, employee_id, enrolled_date)
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING *`,
      [id, training_id, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/enrollments/:id', authenticateToken, async (req, res) => {
  try {
    const { status, score, completion_date } = req.body;

    const result = await pool.query(
      `UPDATE training_enrollments 
       SET status = $2, score = COALESCE($3, score), completion_date = COALESCE($4, completion_date)
       WHERE id = $1
       RETURNING *`,
      [req.params.id, status, score, completion_date]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Certifications
router.get('/certifications', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, e.first_name, e.last_name
       FROM certifications c
       LEFT JOIN employees e ON c.employee_id = e.id
       ORDER BY c.issue_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/certifications', authenticateToken, async (req, res) => {
  try {
    const { certification_name, issuing_body, issue_date, expiry_date, certificate_url } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO certifications (id, employee_id, certification_name, issuing_body, issue_date, expiry_date, certificate_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, req.user.id, certification_name, issuing_body, issue_date, expiry_date, certificate_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
