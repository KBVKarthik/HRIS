const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Organizational Changes
router.get('/changes', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM organizational_changes ORDER BY effective_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/changes', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { change_type, title, description, effective_date, impact_summary } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO organizational_changes (id, change_type, title, description, effective_date, impact_summary)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, change_type, title, description, effective_date, impact_summary]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change Impacts
router.get('/impacts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT oci.*, oc.title as change_title, e.first_name, e.last_name
       FROM organizational_change_impacts oci
       LEFT JOIN organizational_changes oc ON oci.change_id = oc.id
       LEFT JOIN employees e ON oci.employee_id = e.id
       ORDER BY oci.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/impacts', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const {
      change_id,
      employee_id,
      impact_type,
      old_designation_id,
      new_designation_id,
      old_department_id,
      new_department_id,
      status
    } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO organizational_change_impacts (
        id, change_id, employee_id, impact_type, old_designation_id, 
        new_designation_id, old_department_id, new_department_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, change_id, employee_id, impact_type, old_designation_id,
        new_designation_id, old_department_id, new_department_id, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/impacts/:id', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE organizational_change_impacts 
       SET status = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id, status]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Impact not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
