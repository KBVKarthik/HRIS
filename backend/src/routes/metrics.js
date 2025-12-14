const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Dashboard Summary Metrics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const metricsQueries = {
      totalEmployees: pool.query("SELECT COUNT(*) FROM employees WHERE employment_status = 'active'"),
      activeJobs: pool.query("SELECT COUNT(*) FROM job_postings WHERE status = 'open'"),
      pendingApplications: pool.query("SELECT COUNT(*) FROM applications WHERE status = 'applied'"),
      enrolledTrainings: pool.query("SELECT COUNT(*) FROM training_enrollments WHERE status = 'in_progress'"),
      totalDepartments: pool.query("SELECT COUNT(*) FROM departments"),
      activeMentorships: pool.query("SELECT COUNT(*) FROM mentor_relationships WHERE status = 'active'"),
      averageSalary: pool.query("SELECT ROUND(AVG(salary), 2) FROM employees WHERE employment_status = 'active'"),
      turnoverRate: pool.query(`
        SELECT ROUND(COUNT(CASE WHEN date_of_leaving IS NOT NULL AND EXTRACT(YEAR FROM date_of_leaving) = EXTRACT(YEAR FROM NOW()) THEN 1 END)::numeric / 
        NULLIF(COUNT(*), 0) * 100, 2) as turnover_percentage
        FROM employees
      `)
    };

    const results = await Promise.all(Object.values(metricsQueries));

    res.json({
      totalEmployees: parseInt(results[0].rows[0].count),
      activeJobPostings: parseInt(results[1].rows[0].count),
      pendingApplications: parseInt(results[2].rows[0].count),
      enrolledTrainings: parseInt(results[3].rows[0].count),
      totalDepartments: parseInt(results[4].rows[0].count),
      activeMentorships: parseInt(results[5].rows[0].count),
      averageSalary: parseFloat(results[6].rows[0].round || 0),
      turnoverRate: parseFloat(results[7].rows[0].turnover_percentage || 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recruitment Metrics
router.get('/recruitment', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Job postings by status
    const jobStatus = await pool.query(`
      SELECT status, COUNT(*) as count FROM job_postings GROUP BY status
    `);
    metrics.jobPostingsByStatus = jobStatus.rows;

    // Application funnel
    const appFunnel = await pool.query(`
      SELECT status, COUNT(*) as count FROM applications GROUP BY status ORDER BY 
      CASE status 
        WHEN 'applied' THEN 1
        WHEN 'screening' THEN 2
        WHEN 'interview' THEN 3
        WHEN 'offer' THEN 4
        WHEN 'hired' THEN 5
        WHEN 'rejected' THEN 6
      END
    `);
    metrics.applicationFunnel = appFunnel.rows;

    // Candidate source distribution
    const candSource = await pool.query(`
      SELECT source, COUNT(*) as count FROM candidates GROUP BY source
    `);
    metrics.candidateSource = candSource.rows;

    // Average time to hire
    const timeToHire = await pool.query(`
      SELECT ROUND(AVG(EXTRACT(DAY FROM (a.applied_date::timestamp - c.created_at))))::integer as avg_days_to_hire
      FROM applications a
      JOIN candidates c ON a.candidate_id = c.id
      WHERE a.status = 'hired'
    `);
    metrics.averageTimeToHire = timeToHire.rows[0];

    // Hiring rate by month
    const hiringTrend = await pool.query(`
      SELECT DATE_TRUNC('month', a.applied_date)::date as month, COUNT(*) as hires
      FROM applications a
      WHERE a.status = 'hired'
      GROUP BY DATE_TRUNC('month', a.applied_date)
      ORDER BY month DESC
      LIMIT 12
    `);
    metrics.hiringTrend = hiringTrend.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Career Growth Metrics
router.get('/career-growth', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Career path progress distribution
    const pathProgress = await pool.query(`
      SELECT 
        CASE 
          WHEN progress_percentage = 0 THEN 'Not Started'
          WHEN progress_percentage < 50 THEN '1-50%'
          WHEN progress_percentage < 100 THEN '50-99%'
          ELSE 'Completed'
        END as progress_range,
        COUNT(*) as count
      FROM career_paths
      GROUP BY progress_range
    `);
    metrics.careerPathProgress = pathProgress.rows;

    // Development plans by status
    const devPlanStatus = await pool.query(`
      SELECT status, COUNT(*) as count FROM development_plans GROUP BY status
    `);
    metrics.developmentPlanStatus = devPlanStatus.rows;

    // Average skill gaps
    const skillGaps = await pool.query(`
      SELECT skill_name, ROUND(AVG(target_level - current_level), 2) as avg_gap
      FROM skill_assessments
      WHERE current_level < target_level
      GROUP BY skill_name
      ORDER BY avg_gap DESC
      LIMIT 10
    `);
    metrics.skillGaps = skillGaps.rows;

    // Employees by development stage
    const empByStage = await pool.query(`
      SELECT 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(date_of_joining)) < 1 THEN 'Entry Level (< 1yr)'
          WHEN EXTRACT(YEAR FROM AGE(date_of_joining)) < 3 THEN 'Developing (1-3yrs)'
          WHEN EXTRACT(YEAR FROM AGE(date_of_joining)) < 5 THEN 'Experienced (3-5yrs)'
          ELSE 'Senior (>5yrs)'
        END as career_stage,
        COUNT(*) as count
      FROM employees
      WHERE employment_status = 'active'
      GROUP BY career_stage
    `);
    metrics.employeesByCareerStage = empByStage.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Restructuring Metrics
router.get('/restructuring', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Changes by type
    const changeTypes = await pool.query(`
      SELECT change_type, COUNT(*) as count FROM organizational_changes GROUP BY change_type
    `);
    metrics.changesByType = changeTypes.rows;

    // Impact distribution
    const impacts = await pool.query(`
      SELECT impact_type, COUNT(*) as count FROM organizational_change_impacts GROUP BY impact_type
    `);
    metrics.impactDistribution = impacts.rows;

    // Change status distribution
    const changeStatus = await pool.query(`
      SELECT status, COUNT(*) as count FROM organizational_changes GROUP BY status
    `);
    metrics.changeStatus = changeStatus.rows;

    // Pending approvals
    const pendingImpacts = await pool.query(`
      SELECT status, COUNT(*) as count FROM organizational_change_impacts GROUP BY status
    `);
    metrics.pendingApprovals = pendingImpacts.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee Motivation & Satisfaction Metrics
router.get('/motivation', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Survey responses count
    const surveyStats = await pool.query(`
      SELECT ss.id, ss.title, COUNT(DISTINCT sr.employee_id) as respondents
      FROM satisfaction_surveys ss
      LEFT JOIN survey_responses sr ON ss.id = sr.survey_id
      GROUP BY ss.id, ss.title
      ORDER BY ss.start_date DESC
      LIMIT 5
    `);
    metrics.surveyStats = surveyStats.rows;

    // Average satisfaction by survey type
    const satisfactionByType = await pool.query(`
      SELECT ss.survey_type,
             COUNT(DISTINCT sr.employee_id) as total_responses,
             ROUND(AVG(CASE WHEN sr.response_value ~ '^[0-9]+$' THEN CAST(sr.response_value AS INTEGER) END), 2) as avg_score
      FROM satisfaction_surveys ss
      LEFT JOIN survey_responses sr ON ss.id = sr.survey_id
      GROUP BY ss.survey_type
    `);
    metrics.satisfactionByType = satisfactionByType.rows;

    // Response rate trends
    const responseRate = await pool.query(`
      SELECT DATE_TRUNC('month', sr.response_date)::date as month,
             COUNT(DISTINCT sr.employee_id) as respondents
      FROM survey_responses sr
      GROUP BY DATE_TRUNC('month', sr.response_date)
      ORDER BY month DESC
      LIMIT 12
    `);
    metrics.responseRateTrend = responseRate.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Learning & Development Metrics
router.get('/learning-development', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Training enrollment status
    const trainingStatus = await pool.query(`
      SELECT status, COUNT(*) as count FROM training_enrollments GROUP BY status
    `);
    metrics.trainingEnrollmentStatus = trainingStatus.rows;

    // Popular training programs
    const popularPrograms = await pool.query(`
      SELECT tp.title, COUNT(te.id) as enrollment_count, ROUND(AVG(te.score), 2) as avg_score
      FROM training_programs tp
      LEFT JOIN training_enrollments te ON tp.id = te.training_id
      GROUP BY tp.id, tp.title
      ORDER BY enrollment_count DESC
      LIMIT 10
    `);
    metrics.popularPrograms = popularPrograms.rows;

    // Completion rate
    const completionRate = await pool.query(`
      SELECT ROUND(
        COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / 
        NULLIF(COUNT(*), 0) * 100, 2) as completion_rate
      FROM training_enrollments
    `);
    metrics.completionRate = completionRate.rows[0];

    // Certifications by employee
    const certifications = await pool.query(`
      SELECT COUNT(DISTINCT employee_id) as certified_employees, COUNT(*) as total_certifications
      FROM certifications
      WHERE expiry_date IS NULL OR expiry_date > CURRENT_DATE
    `);
    metrics.activeCertifications = certifications.rows[0];

    // Learning hours by department
    const learningByDept = await pool.query(`
      SELECT d.name as department, ROUND(SUM(tp.duration_hours), 2) as total_hours
      FROM training_programs tp
      JOIN training_enrollments te ON tp.id = te.training_id
      JOIN employees e ON te.employee_id = e.id
      JOIN departments d ON e.department_id = d.id
      WHERE te.status = 'completed'
      GROUP BY d.id, d.name
      ORDER BY total_hours DESC
    `);
    metrics.learningByDepartment = learningByDept.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Succession Planning Metrics
router.get('/succession', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Readiness distribution
    const readiness = await pool.query(`
      SELECT readiness_level, COUNT(*) as count FROM succession_candidates GROUP BY readiness_level
    `);
    metrics.readinessDistribution = readiness.rows;

    // Critical positions coverage
    const coverage = await pool.query(`
      SELECT sp.position_id, dg.name as position,
             COUNT(sc.id) as candidate_count,
             MAX(sc.readiness_score) as top_readiness_score
      FROM succession_plans sp
      LEFT JOIN designations dg ON sp.position_id = dg.id
      LEFT JOIN succession_candidates sc ON sp.id = sc.succession_plan_id
      GROUP BY sp.position_id, dg.name
    `);
    metrics.criticalPositionsCoverage = coverage.rows;

    // Average readiness score
    const avgReadiness = await pool.query(`
      SELECT ROUND(AVG(readiness_score), 2) as avg_readiness_score
      FROM succession_candidates
    `);
    metrics.averageReadinessScore = avgReadiness.rows[0];

    // Succession timeline analysis
    const timeline = await pool.query(`
      SELECT sp.timeline_years, COUNT(sc.id) as candidates
      FROM succession_plans sp
      LEFT JOIN succession_candidates sc ON sp.id = sc.succession_plan_id
      GROUP BY sp.timeline_years
      ORDER BY sp.timeline_years
    `);
    metrics.timelineAnalysis = timeline.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leadership & Mentoring Metrics
router.get('/leadership', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Mentorship relationships status
    const mentorStatus = await pool.query(`
      SELECT status, COUNT(*) as count FROM mentor_relationships GROUP BY status
    `);
    metrics.mentorshipStatus = mentorStatus.rows;

    // Mentor-to-mentee ratio
    const mentorRatio = await pool.query(`
      SELECT COUNT(DISTINCT mentor_id) as mentors, COUNT(DISTINCT mentee_id) as mentees
      FROM mentor_relationships
      WHERE status = 'active'
    `);
    metrics.mentorRatio = mentorRatio.rows[0];

    // Feedback distribution by category
    const feedback = await pool.query(`
      SELECT category, COUNT(*) as count, ROUND(AVG(rating), 2) as avg_rating
      FROM mentor_feedback
      GROUP BY category
    `);
    metrics.feedbackByCategory = feedback.rows;

    // Leadership program enrollment
    const ldpEnroll = await pool.query(`
      SELECT ldp.category, COUNT(le.id) as enrollments, COUNT(DISTINCT le.employee_id) as unique_employees
      FROM leadership_development_programs ldp
      LEFT JOIN leadership_enrollments le ON ldp.id = le.program_id
      GROUP BY ldp.category
    `);
    metrics.leadershipEnrollmentByCategory = ldpEnroll.rows;

    // Active mentorship programs
    const activeMentorships = await pool.query(`
      SELECT mp.title, COUNT(mr.id) as relationships
      FROM mentorship_programs mp
      LEFT JOIN mentor_relationships mr ON mp.id = mr.mentorship_program_id AND mr.status = 'active'
      WHERE mp.status = 'active'
      GROUP BY mp.id, mp.title
    `);
    metrics.activeMentorshipPrograms = activeMentorships.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retention & Promotion Metrics
router.get('/retention', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Promotion trends
    const promotionTrend = await pool.query(`
      SELECT DATE_TRUNC('month', promotion_date)::date as month, COUNT(*) as promotions
      FROM promotions
      GROUP BY DATE_TRUNC('month', promotion_date)
      ORDER BY month DESC
      LIMIT 12
    `);
    metrics.promotionTrend = promotionTrend.rows;

    // Average salary increment
    const avgIncrement = await pool.query(`
      SELECT ROUND(AVG(salary_increment), 2) as avg_increment, ROUND(AVG(salary_increment) / 100 * 2, 2) as avg_percent
      FROM promotions
    `);
    metrics.averageSalaryIncrement = avgIncrement.rows[0];

    // Exit reasons analysis
    const exitReasons = await pool.query(`
      SELECT exit_reason, COUNT(*) as count FROM exit_interviews GROUP BY exit_reason
    `);
    metrics.exitReasons = exitReasons.rows;

    // Retention strategies impact
    const strategies = await pool.query(`
      SELECT strategy_type, COUNT(*) as count FROM retention_strategies GROUP BY strategy_type
    `);
    metrics.retentionStrategies = strategies.rows;

    // Employee turnover by department
    const turnoverByDept = await pool.query(`
      SELECT d.name, 
             COUNT(CASE WHEN e.employment_status = 'active' THEN 1 END) as active_employees,
             COUNT(CASE WHEN e.date_of_leaving IS NOT NULL THEN 1 END) as left_employees,
             ROUND(COUNT(CASE WHEN e.date_of_leaving IS NOT NULL THEN 1 END)::numeric / 
                   NULLIF(COUNT(*), 0) * 100, 2) as turnover_percentage
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      GROUP BY d.id, d.name
      ORDER BY turnover_percentage DESC
    `);
    metrics.turnoverByDepartment = turnoverByDept.rows;

    // Recommendation to rehire
    const rehireRec = await pool.query(`
      SELECT 
        COUNT(CASE WHEN would_recommend_company = true THEN 1 END) as would_recommend,
        COUNT(CASE WHEN would_recommend_company = false THEN 1 END) as would_not_recommend,
        COUNT(*) as total_interviews
      FROM exit_interviews
    `);
    metrics.rehireRecommendation = rehireRec.rows[0];

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Compensation & Benefits Metrics
router.get('/compensation', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Salary range by designation
    const salaryRange = await pool.query(`
      SELECT d.name as designation,
             ROUND(MIN(ec.base_salary), 2) as min_salary,
             ROUND(AVG(ec.base_salary), 2) as avg_salary,
             ROUND(MAX(ec.base_salary), 2) as max_salary,
             COUNT(*) as employee_count
      FROM employee_compensation ec
      JOIN designations d ON ec.employee_id IN (
        SELECT id FROM employees WHERE designation_id = d.id
      )
      GROUP BY d.id, d.name
      ORDER BY avg_salary DESC
    `);
    metrics.salaryByDesignation = salaryRange.rows;

    // Benefit enrollment rates
    const benefitEnrollment = await pool.query(`
      SELECT bp.title as benefit_name, bp.benefit_type,
             COUNT(DISTINCT eb.employee_id) as enrolled_employees,
             ROUND(COUNT(DISTINCT eb.employee_id)::numeric / 
                   (SELECT COUNT(*) FROM employees WHERE employment_status = 'active') * 100, 2) as enrollment_rate
      FROM benefits_programs bp
      LEFT JOIN employee_benefits eb ON bp.id = eb.benefit_program_id
      GROUP BY bp.id, bp.title, bp.benefit_type
      ORDER BY enrollment_rate DESC
    `);
    metrics.benefitEnrollmentRates = benefitEnrollment.rows;

    // Benefits cost analysis
    const benefitsCost = await pool.query(`
      SELECT bp.benefit_type,
             ROUND(SUM(bp.premium_cost), 2) as total_cost,
             COUNT(DISTINCT eb.employee_id) as beneficiaries
      FROM benefits_programs bp
      LEFT JOIN employee_benefits eb ON bp.id = eb.benefit_program_id
      GROUP BY bp.benefit_type
    `);
    metrics.benefitsCostAnalysis = benefitsCost.rows;

    // Compensation structure overview
    const compStructure = await pool.query(`
      SELECT d.name as designation,
             ROUND(cs.base_salary, 2) as base_salary,
             ROUND(cs.bonus_percentage, 2) as bonus_percent,
             COUNT(DISTINCT e.id) as employees_count
      FROM compensation_structures cs
      JOIN designations d ON cs.designation_id = d.id
      LEFT JOIN employees e ON d.id = e.designation_id AND e.employment_status = 'active'
      GROUP BY d.id, d.name, cs.base_salary, cs.bonus_percentage
    `);
    metrics.compensationStructure = compStructure.rows;

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Job Design Metrics
router.get('/job-design', authenticateToken, async (req, res) => {
  try {
    const metrics = {};

    // Jobs designed
    const jobDesigns = await pool.query(`
      SELECT COUNT(*) as total_designs FROM job_designs
    `);
    metrics.totalJobDesigns = jobDesigns.rows[0];

    // Average salary ranges
    const salaryDistribution = await pool.query(`
      SELECT d.name as designation,
             ROUND(AVG(jd.salary_range_min), 2) as min_range,
             ROUND(AVG(jd.salary_range_max), 2) as max_range,
             ROUND(AVG((jd.salary_range_min + jd.salary_range_max) / 2), 2) as mid_range
      FROM job_designs jd
      JOIN designations d ON jd.designation_id = d.id
      GROUP BY d.id, d.name
    `);
    metrics.salaryDistribution = salaryDistribution.rows;

    // Required experience distribution
    const experienceNeeded = await pool.query(`
      SELECT experience_required, COUNT(*) as count
      FROM job_designs
      WHERE experience_required IS NOT NULL
      GROUP BY experience_required
      ORDER BY experience_required
    `);
    metrics.experienceDistribution = experienceNeeded.rows;

    // Skill requirements analysis
    const skillsRequired = await pool.query(`
      SELECT COUNT(DISTINCT jd.id) as total_roles, 
             COUNT(DISTINCT STRING_AGG(jd.required_skills, ',')) as unique_skill_requirements
      FROM job_designs jd
    `);
    metrics.skillsMetrics = skillsRequired.rows[0];

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
