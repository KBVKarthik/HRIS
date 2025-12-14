-- HRIS Seed Data - Dummy/Example Data Population
-- This script populates the HRIS database with realistic example data

-- Disable foreign key constraints temporarily
SET session_replication_role = 'replica';

-- 1. DEPARTMENTS
INSERT INTO departments (id, name, description, budget) VALUES
('1e4a1234-1234-1234-1234-111111111111', 'Human Resources', 'HR Department', 500000),
('1e4a2222-2222-2222-2222-222222222222', 'Finance', 'Finance Department', 1000000),
('1e4a3333-3333-3333-3333-333333333333', 'Engineering', 'Software Engineering', 2000000),
('1e4a4444-4444-4444-4444-444444444444', 'Sales', 'Sales Department', 1500000),
('1e4a5555-5555-5555-5555-555555555555', 'Marketing', 'Marketing Department', 800000),
('1e4a6666-6666-6666-6666-666666666666', 'Operations', 'Operations Department', 900000)
ON CONFLICT (id) DO NOTHING;

-- 2. DESIGNATIONS
INSERT INTO designations (id, name, level, description) VALUES
('2e4a1111-1111-1111-1111-111111111111', 'CEO', 1, 'Chief Executive Officer'),
('2e4a2222-2222-2222-2222-222222222222', 'Director', 2, 'Department Director'),
('2e4a3333-3333-3333-3333-333333333333', 'Manager', 3, 'Team Manager'),
('2e4a4444-4444-4444-4444-444444444444', 'Senior Developer', 4, 'Senior Software Developer'),
('2e4a5555-5555-5555-5555-555555555555', 'Developer', 5, 'Software Developer'),
('2e4a6666-6666-6666-6666-666666666666', 'Junior Developer', 6, 'Junior Software Developer'),
('2e4a7777-7777-7777-7777-777777777777', 'Senior Sales Executive', 4, 'Senior Sales Executive'),
('2e4a8888-8888-8888-8888-888888888888', 'Sales Executive', 5, 'Sales Executive'),
('2e4a9999-9999-9999-9999-999999999999', 'HR Manager', 3, 'Human Resources Manager'),
('2e4aaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Analyst', 5, 'Data Analyst')
ON CONFLICT (id) DO NOTHING;

-- 3. EMPLOYEES
INSERT INTO employees (id, first_name, last_name, email, phone, hire_date, salary, department_id, designation_id, employment_status, password_hash) VALUES
('3e4a1111-1111-1111-1111-111111111111', 'John', 'Anderson', 'john.anderson@hris.com', '9876543210', '2015-01-15', 200000, '1e4a1234-1234-1234-1234-111111111111', '2e4a1111-1111-1111-1111-111111111111', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a2222-2222-2222-2222-222222222222', 'Sarah', 'Johnson', 'sarah.johnson@hris.com', '9876543211', '2018-03-20', 120000, '1e4a2222-2222-2222-2222-222222222222', '2e4a2222-2222-2222-2222-222222222222', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a3333-3333-3333-3333-333333333333', 'Michael', 'Chen', 'michael.chen@hris.com', '9876543212', '2019-06-10', 95000, '1e4a3333-3333-3333-3333-333333333333', '2e4a3333-3333-3333-3333-333333333333', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a4444-4444-4444-4444-444444444444', 'Emily', 'Rodriguez', 'emily.rodriguez@hris.com', '9876543213', '2020-01-15', 85000, '1e4a3333-3333-3333-3333-333333333333', '2e4a4444-4444-4444-4444-444444444444', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a5555-5555-5555-5555-555555555555', 'David', 'Kim', 'david.kim@hris.com', '9876543214', '2020-05-01', 75000, '1e4a3333-3333-3333-3333-333333333333', '2e4a5555-5555-5555-5555-555555555555', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a6666-6666-6666-6666-666666666666', 'Jessica', 'Patel', 'jessica.patel@hris.com', '9876543215', '2021-02-10', 65000, '1e4a3333-3333-3333-3333-333333333333', '2e4a6666-6666-6666-6666-666666666666', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a7777-7777-7777-7777-777777777777', 'Robert', 'Brown', 'robert.brown@hris.com', '9876543216', '2019-08-20', 110000, '1e4a4444-4444-4444-4444-444444444444', '2e4a7777-7777-7777-7777-777777777777', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a8888-8888-8888-8888-888888888888', 'Lisa', 'Taylor', 'lisa.taylor@hris.com', '9876543217', '2021-07-01', 75000, '1e4a4444-4444-4444-4444-444444444444', '2e4a8888-8888-8888-8888-888888888888', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4a9999-9999-9999-9999-999999999999', 'James', 'Wilson', 'james.wilson@hris.com', '9876543218', '2020-03-15', 80000, '1e4a5555-5555-5555-5555-555555555555', '2e4aaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4abbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Amanda', 'Garcia', 'amanda.garcia@hris.com', '9876543219', '2021-09-01', 70000, '1e4a1234-1234-1234-1234-111111111111', '2e4a9999-9999-9999-9999-999999999999', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4'),
('3e4acccc-cccc-cccc-cccc-cccccccccccc', 'Richard', 'Martinez', 'richard.martinez@hris.com', '9876543220', '2019-11-05', 105000, '1e4a3333-3333-3333-3333-333333333333', '2e4a3333-3333-3333-3333-333333333333', 'active', '$2a$10$YW5lbzEyMzQ1Njc4QTEyMzQ1Njc4QTEyMzQ1Njc4')
ON CONFLICT (id) DO NOTHING;

-- 4. JOB DESIGNS
INSERT INTO job_designs (id, job_title, designation_id, description, required_skills, required_qualifications, experience_required) VALUES
('4e4a1111-1111-1111-1111-111111111111', 'Senior Software Developer', '2e4a4444-4444-4444-4444-444444444444', 'Develop and maintain software applications', '["Java", "Spring Boot", "PostgreSQL", "REST APIs"]', '["Bachelor in CS", "5+ years experience"]', 5),
('4e4a2222-2222-2222-2222-222222222222', 'Junior Developer', '2e4a6666-6666-6666-6666-666666666666', 'Assist in development projects', '["Python", "JavaScript", "HTML/CSS"]', '["Bachelor in CS", "0-2 years experience"]', 0),
('4e4a3333-3333-3333-3333-333333333333', 'Sales Executive', '2e4a8888-8888-8888-8888-888888888888', 'Sell company products and services', '["Sales", "Communication", "Negotiation"]', '["Graduate", "Sales background"]', 2),
('4e4a4444-4444-4444-4444-444444444444', 'HR Manager', '2e4a9999-9999-9999-9999-999999999999', 'Manage HR functions and employee relations', '["HR Management", "Employee Relations", "Recruitment"]', '["HR Diploma/MBA", "5+ years HR experience"]', 5)
ON CONFLICT (id) DO NOTHING;

-- 5. JOB POSTINGS
INSERT INTO job_postings (id, job_design_id, title, description, location, salary_min, salary_max, status, posted_date) VALUES
('5e4a1111-1111-1111-1111-111111111111', '4e4a1111-1111-1111-1111-111111111111', 'Senior Developer - Backend', 'We are looking for an experienced backend developer', 'Remote', 100000, 140000, 'open', '2025-11-01'),
('5e4a2222-2222-2222-2222-222222222222', '4e4a2222-2222-2222-2222-222222222222', 'Junior Developer Needed', 'Great opportunity for fresh graduates', 'Office - NYC', 50000, 65000, 'open', '2025-11-15'),
('5e4a3333-3333-3333-3333-333333333333', '4e4a3333-3333-3333-3333-333333333333', 'Sales Executive - Enterprise', 'Sell enterprise solutions', 'Hybrid', 70000, 100000, 'closed', '2025-10-01')
ON CONFLICT (id) DO NOTHING;

-- 6. CANDIDATES
INSERT INTO candidates (id, first_name, last_name, email, phone, position_applied, source, status, applied_date) VALUES
('6e4a1111-1111-1111-1111-111111111111', 'Alice', 'Thompson', 'alice.thompson@email.com', '5551234567', 'Senior Developer', 'LinkedIn', 'interview_scheduled', '2025-11-10'),
('6e4a2222-2222-2222-2222-222222222222', 'Bob', 'Harrison', 'bob.harrison@email.com', '5551234568', 'Junior Developer', 'College Portal', 'screening', '2025-11-20'),
('6e4a3333-3333-3333-3333-333333333333', 'Carol', 'Bennett', 'carol.bennett@email.com', '5551234569', 'Sales Executive', 'Referral', 'rejected', '2025-11-05'),
('6e4a4444-4444-4444-4444-444444444444', 'Daniel', 'Cooper', 'daniel.cooper@email.com', '5551234570', 'Senior Developer', 'Indeed', 'offer_extended', '2025-10-30')
ON CONFLICT (id) DO NOTHING;

-- 7. APPLICATIONS
INSERT INTO applications (id, candidate_id, job_posting_id, applied_date, status) VALUES
('7e4a1111-1111-1111-1111-111111111111', '6e4a1111-1111-1111-1111-111111111111', '5e4a1111-1111-1111-1111-111111111111', '2025-11-10', 'interview_scheduled'),
('7e4a2222-2222-2222-2222-222222222222', '6e4a2222-2222-2222-2222-222222222222', '5e4a2222-2222-2222-2222-222222222222', '2025-11-20', 'screening'),
('7e4a3333-3333-3333-3333-333333333333', '6e4a3333-3333-3333-3333-333333333333', '5e4a3333-3333-3333-3333-333333333333', '2025-11-05', 'rejected'),
('7e4a4444-4444-4444-4444-444444444444', '6e4a4444-4444-4444-4444-444444444444', '5e4a1111-1111-1111-1111-111111111111', '2025-10-30', 'hired')
ON CONFLICT (id) DO NOTHING;

-- 8. CAREER PATHS
INSERT INTO career_paths (id, employee_id, designation_id, start_date, expected_promotion_date, description) VALUES
('8e4a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', '2e4a4444-4444-4444-4444-444444444444', '2020-01-15', '2026-01-15', 'Fast track to senior developer'),
('8e4a2222-2222-2222-2222-222222222222', '3e4a5555-5555-5555-5555-555555555555', '2e4a5555-5555-5555-5555-555555555555', '2020-05-01', '2027-05-01', 'Standard developer career path'),
('8e4a3333-3333-3333-3333-333333333333', '3e4a6666-6666-6666-6666-666666666666', '2e4a6666-6666-6666-6666-666666666666', '2021-02-10', '2024-02-10', 'Junior to mid-level developer'),
('8e4a4444-4444-4444-4444-444444444444', '3e4a8888-8888-8888-8888-888888888888', '2e4a7777-7777-7777-7777-777777777777', '2021-07-01', '2025-07-01', 'Sales career path')
ON CONFLICT (id) DO NOTHING;

-- 9. DEVELOPMENT PLANS
INSERT INTO development_plans (id, employee_id, plan_name, start_date, end_date, status, progress_percentage) VALUES
('9e4a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', 'Kubernetes Mastery', '2025-01-01', '2025-12-31', 'in_progress', 65),
('9e4a2222-2222-2222-2222-222222222222', '3e4a5555-5555-5555-5555-555555555555', 'Python Advanced', '2025-02-01', '2025-09-01', 'completed', 100),
('9e4a3333-3333-3333-3333-333333333333', '3e4a6666-6666-6666-6666-666666666666', 'Web Development Bootcamp', '2025-03-01', '2025-12-31', 'in_progress', 45),
('9e4a4444-4444-4444-4444-444444444444', '3e4a8888-8888-8888-8888-888888888888', 'Sales Excellence', '2025-01-15', '2025-08-15', 'completed', 100)
ON CONFLICT (id) DO NOTHING;

-- 10. SKILL ASSESSMENTS
INSERT INTO skill_assessments (id, employee_id, skill_name, level, assessment_date) VALUES
('10a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', 'Java', 5, '2025-10-15'),
('10a2222-2222-2222-2222-222222222222', '3e4a4444-4444-4444-4444-444444444444', 'Spring Boot', 4, '2025-10-15'),
('10a3333-3333-3333-3333-333333333333', '3e4a5555-5555-5555-5555-555555555555', 'Python', 4, '2025-10-10'),
('10a4444-4444-4444-4444-444444444444', '3e4a6666-6666-6666-6666-666666666666', 'JavaScript', 3, '2025-11-01'),
('10a5555-5555-5555-5555-555555555555', '3e4a8888-8888-8888-8888-888888888888', 'Sales Negotiation', 4, '2025-11-05')
ON CONFLICT (id) DO NOTHING;

-- 11. ORGANIZATIONAL CHANGES
INSERT INTO organizational_changes (id, change_type, description, affected_departments, implementation_date, status) VALUES
('11a1111-1111-1111-1111-111111111111', 'department_restructure', 'Engineering department split', ARRAY['1e4a3333-3333-3333-3333-333333333333'], '2025-12-01', 'planned'),
('11a2222-2222-2222-2222-222222222222', 'merger', 'Sales and Marketing merger', ARRAY['1e4a4444-4444-4444-4444-444444444444', '1e4a5555-5555-5555-5555-555555555555'], '2026-01-15', 'approved'),
('11a3333-3333-3333-3333-333333333333', 'downsizing', 'Operations optimization', ARRAY['1e4a6666-6666-6666-6666-666666666666'], '2025-11-30', 'in_progress')
ON CONFLICT (id) DO NOTHING;

-- 12. ORGANIZATIONAL CHANGE IMPACTS
INSERT INTO organizational_change_impacts (id, change_id, affected_role, impact_description, severity, status) VALUES
('12a1111-1111-1111-1111-111111111111', '11a1111-1111-1111-1111-111111111111', 'Senior Developer', 'New team assignment', 'medium', 'approved'),
('12a2222-2222-2222-2222-222222222222', '11a1111-1111-1111-1111-111111111111', 'Manager', 'Reporting line change', 'high', 'pending'),
('12a3333-3333-3333-3333-333333333333', '11a2222-2222-2222-2222-222222222222', 'Sales Executive', 'Merged sales team', 'medium', 'approved'),
('12a4444-4444-4444-4444-444444444444', '11a3333-3333-3333-3333-333333333333', 'Operations Staff', 'Potential layoff', 'critical', 'under_review')
ON CONFLICT (id) DO NOTHING;

-- 13. SATISFACTION SURVEYS
INSERT INTO satisfaction_surveys (id, survey_type, description, created_date, status) VALUES
('13a1111-1111-1111-1111-111111111111', 'engagement', 'Q4 2025 Engagement Survey', '2025-10-01', 'active'),
('13a2222-2222-2222-2222-222222222222', 'motivation', 'Team Motivation Survey', '2025-11-01', 'active'),
('13a3333-3333-3333-3333-333333333333', 'satisfaction', 'Employee Satisfaction Survey', '2025-09-01', 'completed')
ON CONFLICT (id) DO NOTHING;

-- 14. SURVEY QUESTIONS
INSERT INTO survey_questions (id, survey_id, question_text, question_type) VALUES
('14a1111-1111-1111-1111-111111111111', '13a1111-1111-1111-1111-111111111111', 'I am satisfied with my work environment', 'rating'),
('14a2222-2222-2222-2222-222222222222', '13a1111-1111-1111-1111-111111111111', 'I have adequate tools to do my job', 'rating'),
('14a3333-3333-3333-3333-333333333333', '13a2222-2222-2222-2222-222222222222', 'Do you feel motivated at work?', 'yes_no'),
('14a4444-4444-4444-4444-444444444444', '13a3333-3333-3333-3333-333333333333', 'What could improve your satisfaction?', 'text')
ON CONFLICT (id) DO NOTHING;

-- 15. SURVEY RESPONSES
INSERT INTO survey_responses (id, question_id, employee_id, response_value, response_date) VALUES
('15a1111-1111-1111-1111-111111111111', '14a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', '4', '2025-11-10'),
('15a2222-2222-2222-2222-222222222222', '14a2222-2222-2222-2222-222222222222', '3e4a4444-4444-4444-4444-444444444444', '5', '2025-11-10'),
('15a3333-3333-3333-3333-333333333333', '14a3333-3333-3333-3333-333333333333', '3e4a5555-5555-5555-5555-555555555555', 'yes', '2025-11-12'),
('15a4444-4444-4444-4444-444444444444', '14a4444-4444-4444-4444-444444444444', '3e4a6666-6666-6666-6666-666666666666', 'Better work-life balance', '2025-09-15')
ON CONFLICT (id) DO NOTHING;

-- 16. TRAINING PROGRAMS
INSERT INTO training_programs (id, program_name, description, duration_days, provider, category, start_date) VALUES
('16a1111-1111-1111-1111-111111111111', 'Kubernetes Mastery', 'Advanced container orchestration', 30, 'Linux Academy', 'technical', '2025-01-15'),
('16a2222-2222-2222-2222-222222222222', 'Leadership Fundamentals', 'Core leadership skills', 15, 'LinkedIn Learning', 'soft_skills', '2025-02-01'),
('16a3333-3333-3333-3333-333333333333', 'Sales Excellence', 'Advanced sales techniques', 20, 'Salesforce Academy', 'sales', '2025-03-01'),
('16a4444-4444-4444-4444-444444444444', 'Python Advanced', 'Advanced Python programming', 25, 'DataCamp', 'technical', '2025-02-15')
ON CONFLICT (id) DO NOTHING;

-- 17. TRAINING ENROLLMENTS
INSERT INTO training_enrollments (id, employee_id, training_program_id, enrollment_date, status, completion_score) VALUES
('17a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', '16a1111-1111-1111-1111-111111111111', '2025-01-15', 'in_progress', NULL),
('17a2222-2222-2222-2222-222222222222', '3e4a5555-5555-5555-5555-555555555555', '16a4444-4444-4444-4444-444444444444', '2025-02-15', 'completed', 92),
('17a3333-3333-3333-3333-333333333333', '3e4a7777-7777-7777-7777-777777777777', '16a2222-2222-2222-2222-222222222222', '2025-02-01', 'completed', 88),
('17a4444-4444-4444-4444-444444444444', '3e4a8888-8888-8888-8888-888888888888', '16a3333-3333-3333-3333-333333333333', '2025-03-01', 'in_progress', NULL)
ON CONFLICT (id) DO NOTHING;

-- 18. CERTIFICATIONS
INSERT INTO certifications (id, employee_id, certification_name, issued_date, expiry_date, issuing_body) VALUES
('18a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', 'AWS Certified Solutions Architect', '2024-01-15', '2027-01-15', 'Amazon Web Services'),
('18a2222-2222-2222-2222-222222222222', '3e4a5555-5555-5555-5555-555555555555', 'Google Cloud Professional', '2023-06-20', '2026-06-20', 'Google Cloud'),
('18a3333-3333-3333-3333-333333333333', '3e4a7777-7777-7777-7777-777777777777', 'PMP', '2022-03-10', '2025-03-10', 'PMI'),
('18a4444-4444-4444-4444-444444444444', '3e4a8888-8888-8888-8888-888888888888', 'Certified Sales Professional', '2024-09-05', '2027-09-05', 'National Association of Sales Professionals')
ON CONFLICT (id) DO NOTHING;

-- 19. SUCCESSION PLANS
INSERT INTO succession_plans (id, position_id, position_title, created_date, planned_retirement_date) VALUES
('19a1111-1111-1111-1111-111111111111', '2e4a1111-1111-1111-1111-111111111111', 'CEO', '2024-01-01', '2028-12-31'),
('19a2222-2222-2222-2222-222222222222', '2e4a2222-2222-2222-2222-222222222222', 'Director', '2024-06-01', '2030-06-30'),
('19a3333-3333-3333-3333-333333333333', '2e4a3333-3333-3333-3333-333333333333', 'Manager', '2025-01-01', '2027-12-31')
ON CONFLICT (id) DO NOTHING;

-- 20. SUCCESSION CANDIDATES
INSERT INTO succession_candidates (id, succession_plan_id, employee_id, readiness_level, readiness_score, timeline) VALUES
('20a1111-1111-1111-1111-111111111111', '19a1111-1111-1111-1111-111111111111', '3e4a2222-2222-2222-2222-222222222222', 'ready_in_3_5_years', 75, '3_5_years'),
('20a2222-2222-2222-2222-222222222222', '19a2222-2222-2222-2222-222222222222', '3e4a3333-3333-3333-3333-333333333333', 'ready_in_1_2_years', 85, '1_2_years'),
('20a3333-3333-3333-3333-333333333333', '19a3333-3333-3333-3333-333333333333', '3e4a4444-4444-4444-4444-444444444444', 'ready_now', 95, 'immediate')
ON CONFLICT (id) DO NOTHING;

-- 21. MENTORSHIP PROGRAMS
INSERT INTO mentorship_programs (id, program_name, description, start_date, status) VALUES
('21a1111-1111-1111-1111-111111111111', 'Junior Developer Mentorship', 'Mentorship for junior developers', '2025-01-15', 'active'),
('21a2222-2222-2222-2222-222222222222', 'Sales Excellence Program', 'Sales mentorship program', '2025-02-01', 'active'),
('21a3333-3333-3333-3333-333333333333', 'Management Readiness', 'Preparing managers', '2025-03-01', 'planned')
ON CONFLICT (id) DO NOTHING;

-- 22. MENTOR RELATIONSHIPS
INSERT INTO mentor_relationships (id, mentorship_program_id, mentor_id, mentee_id, start_date, status) VALUES
('22a1111-1111-1111-1111-111111111111', '21a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', '3e4a6666-6666-6666-6666-666666666666', '2025-01-15', 'active'),
('22a2222-2222-2222-2222-222222222222', '21a1111-1111-1111-1111-111111111111', '3e4acccc-cccc-cccc-cccc-cccccccccccc', '3e4a5555-5555-5555-5555-555555555555', '2025-01-20', 'active'),
('22a3333-3333-3333-3333-333333333333', '21a2222-2222-2222-2222-222222222222', '3e4a7777-7777-7777-7777-777777777777', '3e4a8888-8888-8888-8888-888888888888', '2025-02-01', 'active')
ON CONFLICT (id) DO NOTHING;

-- 23. MENTOR FEEDBACK
INSERT INTO mentor_feedback (id, mentor_relationship_id, mentor_id, feedback_category, rating, feedback_date) VALUES
('23a1111-1111-1111-1111-111111111111', '22a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', 'skills', 4, '2025-11-01'),
('23a2222-2222-2222-2222-222222222222', '22a1111-1111-1111-1111-111111111111', '3e4a4444-4444-4444-4444-444444444444', 'attitude', 5, '2025-11-01'),
('23a3333-3333-3333-3333-333333333333', '22a2222-2222-2222-2222-222222222222', '3e4acccc-cccc-cccc-cccc-cccccccccccc', 'performance', 4, '2025-11-05'),
('23a4444-4444-4444-4444-444444444444', '22a3333-3333-3333-3333-333333333333', '3e4a7777-7777-7777-7777-777777777777', 'communication', 3, '2025-11-10')
ON CONFLICT (id) DO NOTHING;

-- 24. LEADERSHIP DEVELOPMENT PROGRAMS
INSERT INTO leadership_development_programs (id, program_name, description, start_date, end_date, focus_area) VALUES
('24a1111-1111-1111-1111-111111111111', 'Executive Leadership', 'For senior managers and above', '2025-01-15', '2025-12-31', 'executive'),
('24a2222-2222-2222-2222-222222222222', 'First-Time Manager', 'For new managers', '2025-02-01', '2025-08-31', 'management'),
('24a3333-3333-3333-3333-333333333333', 'Team Lead Essentials', 'For team leads', '2025-03-01', '2025-09-30', 'team_lead')
ON CONFLICT (id) DO NOTHING;

-- 25. LEADERSHIP ENROLLMENTS
INSERT INTO leadership_enrollments (id, employee_id, program_id, enrollment_date, status) VALUES
('25a1111-1111-1111-1111-111111111111', '3e4a2222-2222-2222-2222-222222222222', '24a1111-1111-1111-1111-111111111111', '2025-01-15', 'in_progress'),
('25a2222-2222-2222-2222-222222222222', '3e4a3333-3333-3333-3333-333333333333', '24a2222-2222-2222-2222-222222222222', '2025-02-01', 'in_progress'),
('25a3333-3333-3333-3333-333333333333', '3e4a4444-4444-4444-4444-444444444444', '24a2222-2222-2222-2222-222222222222', '2025-02-15', 'in_progress')
ON CONFLICT (id) DO NOTHING;

-- 26. PROMOTIONS
INSERT INTO promotions (id, employee_id, from_designation_id, to_designation_id, promotion_date, salary_increment, status) VALUES
('26a1111-1111-1111-1111-111111111111', '3e4a5555-5555-5555-5555-555555555555', '2e4a5555-5555-5555-5555-555555555555', '2e4a4444-4444-4444-4444-444444444444', '2025-08-01', 20000, 'approved'),
('26a2222-2222-2222-2222-222222222222', '3e4a6666-6666-6666-6666-666666666666', '2e4a6666-6666-6666-6666-666666666666', '2e4a5555-5555-5555-5555-555555555555', '2025-09-15', 12000, 'approved'),
('26a3333-3333-3333-3333-333333333333', '3e4a8888-8888-8888-8888-888888888888', '2e4a8888-8888-8888-8888-888888888888', '2e4a7777-7777-7777-7777-777777777777', '2025-07-01', 25000, 'approved')
ON CONFLICT (id) DO NOTHING;

-- 27. RETENTION STRATEGIES
INSERT INTO retention_strategies (id, strategy_name, description, target_group, start_date, expected_outcome) VALUES
('27a1111-1111-1111-1111-111111111111', 'Competitive Salaries', 'Maintain market-competitive salaries', 'engineering', '2025-01-01', 'Reduce attrition by 20%'),
('27a2222-2222-2222-2222-222222222222', 'Career Development', 'Structured career paths and growth', 'all', '2025-02-01', 'Improve engagement by 30%'),
('27a3333-3333-3333-3333-333333333333', 'Flexible Working', 'Remote work options', 'all', '2025-03-01', 'Increase satisfaction by 25%')
ON CONFLICT (id) DO NOTHING;

-- 28. EXIT INTERVIEWS
INSERT INTO exit_interviews (id, employee_id, exit_date, reason_for_leaving, destination_company, rehire_recommendation) VALUES
('28a1111-1111-1111-1111-111111111111', '3e4a9999-9999-9999-9999-999999999999', '2025-06-30', 'pursuing_higher_education', 'Self-Employed', 'yes'),
('28a2222-2222-2222-2222-222222222222', '3e4abbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-05-15', 'better_opportunity', 'Google', 'yes')
ON CONFLICT (id) DO NOTHING;

-- 29. COMPENSATION STRUCTURES
INSERT INTO compensation_structures (id, designation_id, salary_min, salary_max, salary_avg) VALUES
('29a1111-1111-1111-1111-111111111111', '2e4a1111-1111-1111-1111-111111111111', 180000, 220000, 200000),
('29a2222-2222-2222-2222-222222222222', '2e4a2222-2222-2222-2222-222222222222', 100000, 140000, 120000),
('29a3333-3333-3333-3333-333333333333', '2e4a3333-3333-3333-3333-333333333333', 80000, 110000, 95000),
('29a4444-4444-4444-4444-444444444444', '2e4a4444-4444-4444-4444-444444444444', 90000, 130000, 110000),
('29a5555-5555-5555-5555-555555555555', '2e4a5555-5555-5555-5555-555555555555', 70000, 95000, 82000),
('29a6666-6666-6666-6666-666666666666', '2e4a6666-6666-6666-6666-666666666666', 55000, 75000, 65000)
ON CONFLICT (id) DO NOTHING;

-- 30. EMPLOYEE COMPENSATION
INSERT INTO employee_compensation (id, employee_id, base_salary, allowances, deductions) VALUES
('30a1111-1111-1111-1111-111111111111', '3e4a1111-1111-1111-1111-111111111111', 200000, '{"hra": 20000, "dearness": 5000}', '{"tax": 35000, "insurance": 2000}'),
('30a2222-2222-2222-2222-222222222222', '3e4a2222-2222-2222-2222-222222222222', 120000, '{"hra": 12000, "dearness": 3000}', '{"tax": 18000, "insurance": 1500}'),
('30a3333-3333-3333-3333-333333333333', '3e4a3333-3333-3333-3333-333333333333', 95000, '{"hra": 10000, "dearness": 2500}', '{"tax": 14000, "insurance": 1200}'),
('30a4444-4444-4444-4444-444444444444', '3e4a4444-4444-4444-4444-444444444444', 85000, '{"hra": 9000, "dearness": 2000}', '{"tax": 12000, "insurance": 1000}'),
('30a5555-5555-5555-5555-555555555555', '3e4a5555-5555-5555-5555-555555555555', 75000, '{"hra": 8000, "dearness": 1500}', '{"tax": 10000, "insurance": 900}'),
('30a6666-6666-6666-6666-666666666666', '3e4a6666-6666-6666-6666-666666666666', 65000, '{"hra": 7000, "dearness": 1500}', '{"tax": 9000, "insurance": 800}'),
('30a7777-7777-7777-7777-777777777777', '3e4a7777-7777-7777-7777-777777777777', 110000, '{"hra": 11000, "dearness": 3000}', '{"tax": 16000, "insurance": 1300}'),
('30a8888-8888-8888-8888-888888888888', '3e4a8888-8888-8888-8888-888888888888', 75000, '{"hra": 8000, "dearness": 1500}', '{"tax": 10000, "insurance": 900}'),
('30a9999-9999-9999-9999-999999999999', '3e4a9999-9999-9999-9999-999999999999', 80000, '{"hra": 8500, "dearness": 2000}', '{"tax": 11000, "insurance": 950}'),
('30aabbb-bbbb-bbbb-bbbb-abbbbbbbbbb', '3e4abbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 70000, '{"hra": 7500, "dearness": 1500}', '{"tax": 10000, "insurance": 850}'),
('30acccc-cccc-cccc-cccc-cccccccccccc', '3e4acccc-cccc-cccc-cccc-cccccccccccc', 105000, '{"hra": 11000, "dearness": 3000}', '{"tax": 15000, "insurance": 1200}')
ON CONFLICT (id) DO NOTHING;

-- 31. BENEFITS PROGRAMS
INSERT INTO benefits_programs (id, program_name, description, coverage_type) VALUES
('31a1111-1111-1111-1111-111111111111', 'Health Insurance', 'Comprehensive health coverage', 'employee_and_dependent'),
('31a2222-2222-2222-2222-222222222222', 'Dental Insurance', 'Dental coverage', 'employee_and_dependent'),
('31a3333-3333-3333-3333-333333333333', 'Life Insurance', 'Term life insurance', 'employee_only'),
('31a4444-4444-4444-4444-444444444444', '401k Plan', 'Retirement savings plan', 'employee_only')
ON CONFLICT (id) DO NOTHING;

-- 32. EMPLOYEE BENEFITS
INSERT INTO employee_benefits (id, employee_id, benefits_program_id, enrollment_date, status, dependents) VALUES
('32a1111-1111-1111-1111-111111111111', '3e4a1111-1111-1111-1111-111111111111', '31a1111-1111-1111-1111-111111111111', '2015-01-15', 'active', '{"spouse": true, "children": 2}'),
('32a2222-2222-2222-2222-222222222222', '3e4a2222-2222-2222-2222-222222222222', '31a1111-1111-1111-1111-111111111111', '2018-03-20', 'active', '{"spouse": true, "children": 1}'),
('32a3333-3333-3333-3333-333333333333', '3e4a3333-3333-3333-3333-333333333333', '31a1111-1111-1111-1111-111111111111', '2019-06-10', 'active', '{"spouse": false, "children": 0}'),
('32a4444-4444-4444-4444-444444444444', '3e4a4444-4444-4444-4444-444444444444', '31a1111-1111-1111-1111-111111111111', '2020-01-15', 'active', '{"spouse": true, "children": 1}'),
('32a5555-5555-5555-5555-555555555555', '3e4a5555-5555-5555-5555-555555555555', '31a1111-1111-1111-1111-111111111111', '2020-05-01', 'active', '{"spouse": false, "children": 0}'),
('32a6666-6666-6666-6666-666666666666', '3e4a6666-6666-6666-6666-666666666666', '31a1111-1111-1111-1111-111111111111', '2021-02-10', 'active', '{"spouse": false, "children": 0}'),
('32a7777-7777-7777-7777-777777777777', '3e4a7777-7777-7777-7777-777777777777', '31a1111-1111-1111-1111-111111111111', '2019-08-20', 'active', '{"spouse": true, "children": 2}'),
('32a8888-8888-8888-8888-888888888888', '3e4a8888-8888-8888-8888-888888888888', '31a1111-1111-1111-1111-111111111111', '2021-07-01', 'active', '{"spouse": false, "children": 1}'),
('32a9999-9999-9999-9999-999999999999', '3e4a9999-9999-9999-9999-999999999999', '31a1111-1111-1111-1111-111111111111', '2020-03-15', 'active', '{"spouse": true, "children": 0}'),
('32aabbb-bbbb-bbbb-bbbb-abbbbbbbbbb', '3e4abbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '31a1111-1111-1111-1111-111111111111', '2021-09-01', 'active', '{"spouse": false, "children": 2}'),
('32acccc-cccc-cccc-cccc-cccccccccccc', '3e4acccc-cccc-cccc-cccc-cccccccccccc', '31a1111-1111-1111-1111-111111111111', '2019-11-05', 'active', '{"spouse": true, "children": 1}')
ON CONFLICT (id) DO NOTHING;

-- Re-enable foreign key constraints
SET session_replication_role = 'default';

-- Confirm data insertion
SELECT 'Seed data insertion completed successfully!' as status;
