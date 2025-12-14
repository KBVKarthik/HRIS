const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Mentorship Programs
router.get('/programs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM mentorship_programs ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/programs', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, start_date, end_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO mentorship_programs (id, title, description, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, title, description, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mentor Relationships
router.get('/relationships', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT mr.*, m.first_name as mentor_first_name, m.last_name as mentor_last_name,
              mnty.first_name as mentee_first_name, mnty.last_name as mentee_last_name, mp.title
       FROM mentor_relationships mr
       LEFT JOIN employees m ON mr.mentor_id = m.id
       LEFT JOIN employees mnty ON mr.mentee_id = mnty.id
       LEFT JOIN mentorship_programs mp ON mr.mentorship_program_id = mp.id
       ORDER BY mr.start_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/relationships', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { mentorship_program_id, mentor_id, mentee_id, start_date, end_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO mentor_relationships (id, mentorship_program_id, mentor_id, mentee_id, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, mentorship_program_id, mentor_id, mentee_id, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mentor Feedback
router.post('/feedback', authenticateToken, async (req, res) => {
  try {
    const { mentor_relationship_id, category, feedback_text, rating } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO mentor_feedback (id, mentor_relationship_id, category, feedback_text, rating, feedback_date)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
       RETURNING *`,
      [id, mentor_relationship_id, category, feedback_text, rating]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leadership Development Programs
router.get('/leadership-programs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM leadership_development_programs ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/leadership-programs', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, category, start_date, end_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO leadership_development_programs (id, title, description, category, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, title, description, category, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leadership Enrollments
router.post('/leadership-enrollments', authenticateToken, async (req, res) => {
  try {
    const { program_id } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO leadership_enrollments (id, program_id, employee_id, enrollment_date)
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING *`,
      [id, program_id, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
