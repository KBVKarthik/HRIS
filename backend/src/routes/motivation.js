const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Satisfaction Surveys
router.get('/surveys', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ss.*, e.first_name, e.last_name
       FROM satisfaction_surveys ss
       LEFT JOIN employees e ON ss.created_by = e.id
       ORDER BY ss.start_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/surveys', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, survey_type, start_date, end_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO satisfaction_surveys (id, title, description, survey_type, created_by, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, title, description, survey_type, req.user.id, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Survey Questions
router.get('/surveys/:id/questions', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM survey_questions WHERE survey_id = $1 ORDER BY display_order',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/surveys/:id/questions', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { question_text, question_type, display_order } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO survey_questions (id, survey_id, question_text, question_type, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, req.params.id, question_text, question_type, display_order]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Survey Responses
router.post('/surveys/:id/responses', authenticateToken, async (req, res) => {
  try {
    const { question_id, response_value } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO survey_responses (id, survey_id, employee_id, question_id, response_value)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, req.params.id, req.user.id, question_id, response_value]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get survey responses for analysis
router.get('/surveys/:id/responses', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sr.*, e.first_name, e.last_name, sq.question_text
       FROM survey_responses sr
       LEFT JOIN employees e ON sr.employee_id = e.id
       LEFT JOIN survey_questions sq ON sr.question_id = sq.id
       WHERE sr.survey_id = $1
       ORDER BY sr.response_date DESC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
