const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Career Paths
router.get('/paths', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cp.*, e.first_name, e.last_name, dg.name as designation_name
       FROM career_paths cp
       LEFT JOIN employees e ON cp.employee_id = e.id
       LEFT JOIN designations dg ON cp.designation_id = dg.id
       ORDER BY cp.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/paths', authenticateToken, authorizeRole(['hr', 'admin', 'manager']), async (req, res) => {
  try {
    const { employee_id, designation_id, start_date, end_date, progress_percentage } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO career_paths (id, employee_id, designation_id, start_date, end_date, progress_percentage)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, employee_id, designation_id, start_date, end_date, progress_percentage]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Development Plans
router.get('/plans', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT dp.*, e.first_name, e.last_name
       FROM development_plans dp
       LEFT JOIN employees e ON dp.employee_id = e.id
       ORDER BY dp.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/plans', authenticateToken, async (req, res) => {
  try {
    const { employee_id, goal, description, start_date, end_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO development_plans (id, employee_id, created_by, goal, description, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, employee_id, req.user.id, goal, description, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skill Assessments
router.get('/skills', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sa.*, e.first_name, e.last_name
       FROM skill_assessments sa
       LEFT JOIN employees e ON sa.employee_id = e.id
       ORDER BY sa.assessed_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/skills', authenticateToken, async (req, res) => {
  try {
    const { employee_id, skill_name, current_level, target_level, assessment_type } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO skill_assessments (id, employee_id, skill_name, current_level, target_level, assessment_type, assessed_date)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
       RETURNING *`,
      [id, employee_id, skill_name, current_level, target_level, assessment_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
