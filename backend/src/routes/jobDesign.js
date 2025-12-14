const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Job Designs
router.get('/designs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT jd.*, dg.name as designation_name, dt.name as reporting_designation
       FROM job_designs jd
       LEFT JOIN designations dg ON jd.designation_id = dg.id
       LEFT JOIN designations dt ON jd.reporting_to_designation_id = dt.id
       ORDER BY jd.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/designs', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const {
      designation_id,
      job_description,
      key_responsibilities,
      required_skills,
      required_qualifications,
      experience_required,
      reporting_to_designation_id,
      salary_range_min,
      salary_range_max
    } = req.body;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO job_designs (
        id, designation_id, job_description, key_responsibilities, required_skills,
        required_qualifications, experience_required, reporting_to_designation_id,
        salary_range_min, salary_range_max
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, designation_id, job_description, key_responsibilities, required_skills,
        required_qualifications, experience_required, reporting_to_designation_id,
        salary_range_min, salary_range_max]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/designs/:id', authenticateToken, authorizeRole(['hr', 'admin']), async (req, res) => {
  try {
    const {
      job_description,
      key_responsibilities,
      required_skills,
      required_qualifications,
      experience_required,
      salary_range_min,
      salary_range_max
    } = req.body;

    const result = await pool.query(
      `UPDATE job_designs 
       SET job_description = COALESCE($2, job_description),
           key_responsibilities = COALESCE($3, key_responsibilities),
           required_skills = COALESCE($4, required_skills),
           required_qualifications = COALESCE($5, required_qualifications),
           experience_required = COALESCE($6, experience_required),
           salary_range_min = COALESCE($7, salary_range_min),
           salary_range_max = COALESCE($8, salary_range_max),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id, job_description, key_responsibilities, required_skills,
        required_qualifications, experience_required, salary_range_min, salary_range_max]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job design not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
