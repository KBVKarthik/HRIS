const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Succession Plans
router.get('/plans', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sp.*, dg.name as designation_name, dp.name as department_name
       FROM succession_plans sp
       LEFT JOIN designations dg ON sp.position_id = dg.id
       LEFT JOIN departments dp ON sp.department_id = dp.id
       ORDER BY sp.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/plans', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { position_id, department_id, timeline_years } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO succession_plans (id, position_id, department_id, timeline_years)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, position_id, department_id, timeline_years]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Succession Candidates
router.get('/candidates', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sc.*, sp.id as plan_id, e.first_name, e.last_name
       FROM succession_candidates sc
       LEFT JOIN succession_plans sp ON sc.succession_plan_id = sp.id
       LEFT JOIN employees e ON sc.candidate_employee_id = e.id
       ORDER BY sc.readiness_score DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/candidates', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { succession_plan_id, candidate_employee_id, readiness_level, readiness_score, feedback } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO succession_candidates (id, succession_plan_id, candidate_employee_id, readiness_level, readiness_score, feedback)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, succession_plan_id, candidate_employee_id, readiness_level, readiness_score, feedback]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/candidates/:id', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { readiness_level, readiness_score, feedback } = req.body;

    const result = await pool.query(
      `UPDATE succession_candidates 
       SET readiness_level = $2, readiness_score = COALESCE($3, readiness_score), feedback = COALESCE($4, feedback),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id, readiness_level, readiness_score, feedback]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
