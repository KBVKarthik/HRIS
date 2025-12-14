const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get all employees
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.*, d.name as department_name, dg.name as designation_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.id
       LEFT JOIN designations dg ON e.designation_id = dg.id
       WHERE e.employment_status = 'active'
       ORDER BY e.first_name`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.*, d.name as department_name, dg.name as designation_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.id
       LEFT JOIN designations dg ON e.designation_id = dg.id
       WHERE e.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create employee
router.post('/', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const {
      email,
      first_name,
      last_name,
      employee_id,
      department_id,
      designation_id,
      date_of_joining,
      employment_type,
      salary
    } = req.body;

    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO employees (
        id, email, first_name, last_name, employee_id, 
        department_id, designation_id, date_of_joining,
        employment_type, salary, password_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [id, email, first_name, last_name, employee_id, department_id, designation_id,
        date_of_joining, employment_type, salary, '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update employee
router.put('/:id', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { first_name, last_name, department_id, designation_id, salary, employment_status } = req.body;

    const result = await pool.query(
      `UPDATE employees 
       SET first_name = COALESCE($2, first_name),
           last_name = COALESCE($3, last_name),
           department_id = COALESCE($4, department_id),
           designation_id = COALESCE($5, designation_id),
           salary = COALESCE($6, salary),
           employment_status = COALESCE($7, employment_status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id, first_name, last_name, department_id, designation_id, salary, employment_status]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete employee
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
