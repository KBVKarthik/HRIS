-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users/Employees Base Table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  date_of_birth DATE,
  gender VARCHAR(20),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department_id UUID,
  designation_id UUID,
  reporting_manager_id UUID,
  date_of_joining DATE NOT NULL,
  date_of_leaving DATE,
  employment_status VARCHAR(50) DEFAULT 'active', -- active, inactive, on_leave, terminated
  employment_type VARCHAR(50), -- full_time, part_time, contract
  salary DECIMAL(12, 2),
  role VARCHAR(50) DEFAULT 'employee', -- employee, manager, hr, admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  head_id UUID,
  budget DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Designations/Job Titles
CREATE TABLE designations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  department_id UUID REFERENCES departments(id),
  salary_min DECIMAL(12, 2),
  salary_max DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Designs
CREATE TABLE job_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designation_id UUID REFERENCES designations(id),
  job_description TEXT,
  key_responsibilities TEXT,
  required_skills TEXT,
  required_qualifications TEXT,
  experience_required INT,
  reporting_to_designation_id UUID REFERENCES designations(id),
  salary_range_min DECIMAL(12, 2),
  salary_range_max DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recruitment
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  designation_id UUID REFERENCES designations(id),
  department_id UUID REFERENCES departments(id),
  posted_date DATE DEFAULT CURRENT_DATE,
  closing_date DATE,
  status VARCHAR(50) DEFAULT 'open', -- open, closed, filled
  salary_min DECIMAL(12, 2),
  salary_max DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  location VARCHAR(255),
  resume_url VARCHAR(255),
  source VARCHAR(100), -- job_board, referral, website, agency
  skills TEXT,
  experience_years INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_posting_id UUID REFERENCES job_postings(id),
  candidate_id UUID REFERENCES candidates(id),
  status VARCHAR(50) DEFAULT 'applied', -- applied, screening, interview, offer, hired, rejected
  applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  screening_date DATE,
  interview_date DATE,
  feedback TEXT,
  rating INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Career Growth and Planning
CREATE TABLE career_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  designation_id UUID REFERENCES designations(id),
  start_date DATE,
  end_date DATE,
  progress_percentage INT,
  status VARCHAR(50) DEFAULT 'active', -- active, completed, paused
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE development_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  created_by UUID REFERENCES employees(id),
  goal VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  progress_percentage INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  skill_name VARCHAR(100),
  current_level INT, -- 1-5
  target_level INT,
  assessed_date DATE,
  assessment_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restructuring and M&A
CREATE TABLE organizational_changes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  change_type VARCHAR(50), -- restructuring, merger, acquisition, consolidation
  title VARCHAR(255),
  description TEXT,
  effective_date DATE,
  status VARCHAR(50) DEFAULT 'planned', -- planned, in_progress, completed
  impact_summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organizational_change_impacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  change_id UUID REFERENCES organizational_changes(id),
  employee_id UUID REFERENCES employees(id),
  impact_type VARCHAR(50), -- role_change, department_change, reporting_change, redundancy
  old_designation_id UUID REFERENCES designations(id),
  new_designation_id UUID REFERENCES designations(id),
  old_department_id UUID REFERENCES departments(id),
  new_department_id UUID REFERENCES departments(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, declined
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Motivation and Satisfaction
CREATE TABLE satisfaction_surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  survey_type VARCHAR(50), -- engagement, motivation, satisfaction
  created_by UUID REFERENCES employees(id),
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE survey_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  survey_id UUID REFERENCES satisfaction_surveys(id),
  question_text TEXT,
  question_type VARCHAR(50), -- multiple_choice, rating, text
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  survey_id UUID REFERENCES satisfaction_surveys(id),
  employee_id UUID REFERENCES employees(id),
  question_id UUID REFERENCES survey_questions(id),
  response_value VARCHAR(255),
  response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Learning and Development
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  start_date DATE,
  end_date DATE,
  duration_hours DECIMAL(5, 2),
  instructor_name VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE training_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_id UUID REFERENCES training_programs(id),
  employee_id UUID REFERENCES employees(id),
  enrolled_date DATE,
  completion_date DATE,
  status VARCHAR(50) DEFAULT 'enrolled', -- enrolled, in_progress, completed, dropped
  score DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  certification_name VARCHAR(255),
  issuing_body VARCHAR(100),
  issue_date DATE,
  expiry_date DATE,
  certificate_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Succession Planning
CREATE TABLE succession_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position_id UUID REFERENCES designations(id),
  department_id UUID REFERENCES departments(id),
  timeline_years INT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE succession_candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  succession_plan_id UUID REFERENCES succession_plans(id),
  candidate_employee_id UUID REFERENCES employees(id),
  readiness_level VARCHAR(50), -- ready_now, ready_in_1_2_years, ready_in_3_5_years, developing
  readiness_score INT, -- 1-100
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leadership and Mentoring
CREATE TABLE mentorship_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentor_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentorship_program_id UUID REFERENCES mentorship_programs(id),
  mentor_id UUID REFERENCES employees(id),
  mentee_id UUID REFERENCES employees(id),
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentor_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_relationship_id UUID REFERENCES mentor_relationships(id),
  feedback_date DATE,
  category VARCHAR(50), -- skills, attitude, performance, communication
  feedback_text TEXT,
  rating INT, -- 1-5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leadership_development_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(100), -- executive, middle_management, supervisory
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leadership_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES leadership_development_programs(id),
  employee_id UUID REFERENCES employees(id),
  enrollment_date DATE,
  completion_date DATE,
  status VARCHAR(50) DEFAULT 'enrolled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Retention and Promotion
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  old_designation_id UUID REFERENCES designations(id),
  new_designation_id UUID REFERENCES designations(id),
  promotion_date DATE,
  status VARCHAR(50) DEFAULT 'approved', -- pending, approved, rejected
  salary_increment DECIMAL(12, 2),
  promotion_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE retention_strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  strategy_type VARCHAR(50), -- salary_increase, role_change, flexible_working, training
  description TEXT,
  implementation_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exit_interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  interview_date DATE,
  exit_reason VARCHAR(100),
  feedback TEXT,
  would_recommend_company BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compensation and Benefits
CREATE TABLE compensation_structures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designation_id UUID REFERENCES designations(id),
  base_salary DECIMAL(12, 2),
  bonus_percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_compensation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  base_salary DECIMAL(12, 2),
  bonus_amount DECIMAL(12, 2),
  allowances TEXT, -- JSON format
  deductions TEXT, -- JSON format
  effective_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE benefits_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  benefit_type VARCHAR(50), -- health, dental, vision, retirement, life_insurance, etc
  coverage_details TEXT,
  premium_cost DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  benefit_program_id UUID REFERENCES benefits_programs(id),
  enrollment_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  dependents TEXT, -- JSON format
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit trail for all changes
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES employees(id),
  action VARCHAR(100),
  table_name VARCHAR(100),
  record_id UUID,
  old_values TEXT, -- JSON
  new_values TEXT, -- JSON
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign keys for employees table
ALTER TABLE employees ADD CONSTRAINT fk_employee_department 
  FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE employees ADD CONSTRAINT fk_employee_designation 
  FOREIGN KEY (designation_id) REFERENCES designations(id);
ALTER TABLE employees ADD CONSTRAINT fk_employee_manager 
  FOREIGN KEY (reporting_manager_id) REFERENCES employees(id);

-- Add foreign key for departments
ALTER TABLE departments ADD CONSTRAINT fk_department_head 
  FOREIGN KEY (head_id) REFERENCES employees(id);

-- Create indexes for performance
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_training_enrollments_employee ON training_enrollments(employee_id);
CREATE INDEX idx_survey_responses_employee ON survey_responses(employee_id);
CREATE INDEX idx_promotions_employee ON promotions(employee_id);
CREATE INDEX idx_candidates_source ON candidates(source);
CREATE INDEX idx_organizational_change_impacts_employee ON organizational_change_impacts(employee_id);
