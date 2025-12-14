const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Promotions
router.get('/promotions', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, e.first_name, e.last_name, 
              old_dg.name as old_designation, new_dg.name as new_designation
       FROM promotions p
       LEFT JOIN employees e ON p.employee_id = e.id
       LEFT JOIN designations old_dg ON p.old_designation_id = old_dg.id
       LEFT JOIN designations new_dg ON p.new_designation_id = new_dg.id
       ORDER BY p.promotion_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/promotions', authenticateToken, authorizeRole(['hr', 'admin', 'manager']), async (req, res) => {
  try {
    const { employee_id, old_designation_id, new_designation_id, promotion_date, salary_increment, promotion_reason } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO promotions (id, employee_id, old_designation_id, new_designation_id, promotion_date, salary_increment, promotion_reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, employee_id, old_designation_id, new_designation_id, promotion_date, salary_increment, promotion_reason]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retention Strategies
router.get('/retention-strategies', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT rs.*, e.first_name, e.last_name
       FROM retention_strategies rs
       LEFT JOIN employees e ON rs.employee_id = e.id
       ORDER BY rs.implementation_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/retention-strategies', authenticateToken, authorizeRole(['hr', 'admin', 'manager']), async (req, res) => {
  try {
    const { employee_id, strategy_type, description, implementation_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO retention_strategies (id, employee_id, strategy_type, description, implementation_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, employee_id, strategy_type, description, implementation_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exit Interviews
router.get('/exit-interviews', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ei.*, e.first_name, e.last_name
       FROM exit_interviews ei
       LEFT JOIN employees e ON ei.employee_id = e.id
       ORDER BY ei.interview_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/exit-interviews', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { employee_id, exit_reason, feedback, would_recommend_company } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO exit_interviews (id, employee_id, interview_date, exit_reason, feedback, would_recommend_company)
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5)
       RETURNING *`,
      [id, employee_id, exit_reason, feedback, would_recommend_company]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
