const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Compensation Structures
router.get('/structures', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cs.*, dg.name as designation_name
       FROM compensation_structures cs
       LEFT JOIN designations dg ON cs.designation_id = dg.id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/structures', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { designation_id, base_salary, bonus_percentage } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO compensation_structures (id, designation_id, base_salary, bonus_percentage)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, designation_id, base_salary, bonus_percentage]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee Compensation
router.get('/employee-compensation', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ec.*, e.first_name, e.last_name
       FROM employee_compensation ec
       LEFT JOIN employees e ON ec.employee_id = e.id
       ORDER BY ec.effective_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/employee-compensation', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { employee_id, base_salary, bonus_amount, allowances, deductions, effective_date } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO employee_compensation (id, employee_id, base_salary, bonus_amount, allowances, deductions, effective_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, employee_id, base_salary, bonus_amount, JSON.stringify(allowances), JSON.stringify(deductions), effective_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Benefits Programs
router.get('/benefits-programs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM benefits_programs ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/benefits-programs', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { title, description, benefit_type, coverage_details, premium_cost } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO benefits_programs (id, title, description, benefit_type, coverage_details, premium_cost)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, title, description, benefit_type, coverage_details, premium_cost]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee Benefits
router.get('/employee-benefits', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT eb.*, e.first_name, e.last_name, bp.title as benefit_name
       FROM employee_benefits eb
       LEFT JOIN employees e ON eb.employee_id = e.id
       LEFT JOIN benefits_programs bp ON eb.benefit_program_id = bp.id
       ORDER BY eb.enrollment_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/employee-benefits', authenticateToken, async (req, res) => {
  try {
    const { benefit_program_id, dependents } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO employee_benefits (id, employee_id, benefit_program_id, enrollment_date, dependents)
       VALUES ($1, $2, $3, CURRENT_DATE, $4)
       RETURNING *`,
      [id, req.user.id, benefit_program_id, JSON.stringify(dependents)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
