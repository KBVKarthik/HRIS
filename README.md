# HRIS - Human Resources Information System

A comprehensive web-based Human Resources Information System (HRIS) built with modern technologies for managing all aspects of human resources.

## Features Overview

### 1. **Recruitment & Selection**

- Post job openings and manage vacancies
- Track candidate applications through the hiring funnel
- Candidate sourcing and screening
- Interview scheduling and feedback
- Job offer management
- Metrics: Job posting status, application funnel, candidate source distribution, time to hire

### 2. **Career Growth & Planning**

- Create and track individual career paths
- Development plan management
- Skill assessment and gap analysis
- Career progression tracking
- Metrics: Career path progress, skill gaps, employee development stage

### 3. **Restructuring & M&A**

- Plan and execute organizational changes
- Track impact on employee roles and departments
- Change approval workflow
- Impact analysis and reporting
- Metrics: Change types, affected employees, pending approvals

### 4. **Employee Motivation & Satisfaction**

- Create and manage satisfaction surveys
- Employee engagement tracking
- Sentiment analysis
- Survey response analytics
- Metrics: Survey response rates, satisfaction scores, engagement trends

### 5. **Employee Learning & Development**

- Training program management
- Course enrollment and tracking
- Completion rate monitoring
- Certification management
- Metrics: Enrollment status, completion rates, training hours, certifications

### 6. **Succession Planning**

- Identify successors for critical roles
- Track readiness levels
- Succession pipeline management
- Position coverage analysis
- Metrics: Readiness distribution, critical positions coverage, readiness scores

### 7. **Leadership & Mentoring**

- Mentorship program management
- Mentor-mentee matching
- Feedback collection and analysis
- Leadership development programs
- Metrics: Mentorship relationships, feedback ratings, program enrollments

### 8. **Employee Retention & Promotion**

- Track promotions and career advancements
- Implement retention strategies
- Exit interview management
- Turnover analysis
- Metrics: Promotion trends, salary increments, exit reasons, turnover rate

### 9. **Compensation & Benefits**

- Salary structure management
- Employee compensation tracking
- Benefits program administration
- Cost analysis
- Metrics: Salary ranges by role, benefit enrollment rates, total compensation

### 10. **Job Design**

- Create detailed job descriptions
- Define role requirements and skills
- Salary range specifications
- Reporting structures
- Metrics: Job designs, skill requirements, experience levels

## Technology Stack

### Backend

- **Node.js & Express.js** - REST API server
- **PostgreSQL** - Relational database
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing

### Frontend

- **React 18** - User interface
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS3** - Styling

### Database

- PostgreSQL with comprehensive schema
- 20+ tables with relationships
- Audit logging capabilities

## Project Structure

```
HRIS/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express server
│   │   ├── config/
│   │   │   ├── database.js        # Database connection
│   │   │   └── schema.sql         # Database schema
│   │   ├── middleware/
│   │   │   └── auth.js            # Authentication middleware
│   │   └── routes/
│   │       ├── auth.js            # Authentication
│   │       ├── employees.js       # Employee management
│   │       ├── recruitment.js     # Recruitment module
│   │       ├── career.js          # Career growth
│   │       ├── restructuring.js   # M&A
│   │       ├── motivation.js      # Satisfaction surveys
│   │       ├── learning.js        # L&D
│   │       ├── succession.js      # Succession planning
│   │       ├── leadership.js      # Leadership & mentoring
│   │       ├── retention.js       # Retention & promotion
│   │       ├── compensation.js    # Compensation & benefits
│   │       ├── jobDesign.js       # Job design
│   │       └── metrics.js         # Analytics & metrics
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js                 # Main app component
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── Navbar.js          # Top navigation
│   │   │   ├── Sidebar.js         # Side menu
│   │   │   └── *.css
│   │   └── pages/
│   │       ├── LoginPage.js       # Authentication
│   │       ├── Dashboard.js       # Main dashboard
│   │       ├── EmployeeManagement.js
│   │       ├── Recruitment.js
│   │       ├── CareerGrowth.js
│   │       ├── Restructuring.js
│   │       ├── EmployeeMotivation.js
│   │       ├── LearningDevelopment.js
│   │       ├── SuccessionPlanning.js
│   │       ├── Leadership.js
│   │       ├── Retention.js
│   │       ├── Compensation.js
│   │       └── JobDesign.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── docs/
    └── README.md (this file)
```

## Installation & Setup

### Prerequisites

- Node.js v14+
- PostgreSQL 12+
- npm or yarn

### Step 1: Set Up PostgreSQL Database

1. Install PostgreSQL if not already installed
2. Create a new database:

```bash
createdb hris_db
```

3. Run the schema file:

```bash
psql -U postgres -d hris_db -f backend/src/config/schema.sql
```

### Step 2: Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example` and update values):

```bash
copy .env.example .env
```

4. Update the `.env` file with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hris_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

5. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will open in your browser at `http://localhost:3000`

## Default Credentials

For initial testing, create a user with:

- Email: admin@hris.com
- Password: admin123
- Employee ID: EMP001

Or register a new account through the registration form.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Employees

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Recruitment

- `GET /api/recruitment/postings` - Get job postings
- `POST /api/recruitment/postings` - Create job posting
- `GET /api/recruitment/candidates` - Get candidates
- `POST /api/recruitment/candidates` - Add candidate
- `GET /api/recruitment/applications` - Get applications
- `POST /api/recruitment/applications` - Submit application
- `PUT /api/recruitment/applications/:id` - Update application

### Career Growth

- `GET /api/career/paths` - Get career paths
- `POST /api/career/paths` - Create career path
- `GET /api/career/plans` - Get development plans
- `POST /api/career/plans` - Create development plan
- `GET /api/career/skills` - Get skill assessments
- `POST /api/career/skills` - Create skill assessment

### Restructuring

- `GET /api/restructuring/changes` - Get organizational changes
- `POST /api/restructuring/changes` - Create change
- `GET /api/restructuring/impacts` - Get change impacts
- `POST /api/restructuring/impacts` - Create impact
- `PUT /api/restructuring/impacts/:id` - Update impact

### Motivation & Satisfaction

- `GET /api/motivation/surveys` - Get surveys
- `POST /api/motivation/surveys` - Create survey
- `GET /api/motivation/surveys/:id/questions` - Get survey questions
- `POST /api/motivation/surveys/:id/questions` - Add question
- `POST /api/motivation/surveys/:id/responses` - Submit response
- `GET /api/motivation/surveys/:id/responses` - Get responses

### Learning & Development

- `GET /api/learning/programs` - Get training programs
- `POST /api/learning/programs` - Create program
- `GET /api/learning/enrollments` - Get enrollments
- `POST /api/learning/enrollments` - Enroll in training
- `PUT /api/learning/enrollments/:id` - Update enrollment
- `GET /api/learning/certifications` - Get certifications
- `POST /api/learning/certifications` - Add certification

### Succession Planning

- `GET /api/succession/plans` - Get succession plans
- `POST /api/succession/plans` - Create plan
- `GET /api/succession/candidates` - Get candidates
- `POST /api/succession/candidates` - Add candidate
- `PUT /api/succession/candidates/:id` - Update candidate

### Leadership & Mentoring

- `GET /api/leadership/programs` - Get mentorship programs
- `POST /api/leadership/programs` - Create program
- `GET /api/leadership/relationships` - Get mentor-mentee relationships
- `POST /api/leadership/relationships` - Create relationship
- `POST /api/leadership/feedback` - Add feedback
- `GET /api/leadership/leadership-programs` - Get leadership programs
- `POST /api/leadership/leadership-programs` - Create program
- `POST /api/leadership/leadership-enrollments` - Enroll

### Retention & Promotion

- `GET /api/retention/promotions` - Get promotions
- `POST /api/retention/promotions` - Create promotion
- `GET /api/retention/retention-strategies` - Get strategies
- `POST /api/retention/retention-strategies` - Create strategy
- `GET /api/retention/exit-interviews` - Get exit interviews
- `POST /api/retention/exit-interviews` - Create exit interview

### Compensation & Benefits

- `GET /api/compensation/structures` - Get compensation structures
- `POST /api/compensation/structures` - Create structure
- `GET /api/compensation/employee-compensation` - Get employee compensation
- `POST /api/compensation/employee-compensation` - Create compensation
- `GET /api/compensation/benefits-programs` - Get benefit programs
- `POST /api/compensation/benefits-programs` - Create program
- `GET /api/compensation/employee-benefits` - Get enrollments
- `POST /api/compensation/employee-benefits` - Enroll benefit

### Job Design

- `GET /api/job-design/designs` - Get job designs
- `POST /api/job-design/designs` - Create job design
- `PUT /api/job-design/designs/:id` - Update job design

### Analytics & Metrics

- `GET /api/metrics/dashboard` - Dashboard metrics
- `GET /api/metrics/recruitment` - Recruitment metrics
- `GET /api/metrics/career-growth` - Career growth metrics
- `GET /api/metrics/restructuring` - Restructuring metrics
- `GET /api/metrics/motivation` - Motivation metrics
- `GET /api/metrics/learning-development` - L&D metrics
- `GET /api/metrics/succession` - Succession metrics
- `GET /api/metrics/leadership` - Leadership metrics
- `GET /api/metrics/retention` - Retention metrics
- `GET /api/metrics/compensation` - Compensation metrics
- `GET /api/metrics/job-design` - Job design metrics

## Key Features by Module

### Recruitment & Selection

- **Job Postings**: Create, edit, and manage job openings
- **Candidate Tracking**: Track candidates through the pipeline
- **Application Management**: Review and rate applications
- **Offer Management**: Generate and track job offers

### Career Growth & Planning

- **Career Paths**: Define career progression for employees
- **Development Plans**: Create individual development goals
- **Skill Assessments**: Track skill levels and gaps
- **Career Roadmaps**: Visualize career progression

### Restructuring & M&A

- **Org Changes**: Plan and execute organizational changes
- **Impact Tracking**: Monitor impact on roles and departments
- **Change Approval**: Manage change approvals
- **Analytics**: Analyze restructuring impact

### Employee Motivation & Satisfaction

- **Surveys**: Create custom satisfaction surveys
- **Response Tracking**: Track survey responses
- **Sentiment Analysis**: Analyze employee sentiment
- **Engagement Metrics**: Measure engagement levels

### Learning & Development

- **Training Catalog**: Maintain training program library
- **Enrollment Management**: Track employee enrollments
- **Completion Tracking**: Monitor completion rates
- **Certifications**: Track professional certifications

### Succession Planning

- **Succession Plans**: Create plans for critical positions
- **Candidate Readiness**: Assess successor readiness
- **Talent Pipelines**: Identify talent pools
- **Coverage Analysis**: Analyze position coverage

### Leadership & Mentoring

- **Mentorship Programs**: Create and manage programs
- **Mentor Matching**: Match mentors with mentees
- **Feedback Collection**: Gather and track feedback
- **Leadership Development**: Track leader development

### Retention & Promotion

- **Promotion Tracking**: Track career advancements
- **Retention Strategies**: Implement retention initiatives
- **Turnover Analysis**: Analyze turnover patterns
- **Exit Interviews**: Conduct and analyze exit interviews

### Compensation & Benefits

- **Salary Structures**: Define compensation structures
- **Payroll Integration**: Track employee compensation
- **Benefit Administration**: Manage benefit programs
- **Cost Analysis**: Analyze total compensation costs

### Job Design

- **Job Descriptions**: Create detailed job descriptions
- **Role Specifications**: Define role requirements
- **Salary Ranges**: Set competitive salary ranges
- **Org Charts**: Define reporting structures

## Database Schema Highlights

The HRIS database includes 20+ tables covering:

- Employee core data
- Organizational structure (departments, designations)
- Recruitment pipeline
- Career development
- Training and certifications
- Succession planning
- Compensation and benefits
- Audit logging

All tables include timestamp tracking and relationships for data integrity.

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (employee, manager, HR, admin)
- SQL injection prevention with parameterized queries
- CORS protection
- Secure environment variable handling

## Performance Optimization

- Indexed database queries
- Efficient relationship queries with joins
- Pagination support for large datasets
- Database connection pooling
- Cached user authentication tokens

## Future Enhancements

1. Advanced analytics and reporting
2. Dashboards with real-time metrics
3. Document management for HR records
4. Employee self-service portal
5. Mobile application
6. Integration with payroll systems
7. Advanced search and filtering
8. Bulk operations
9. PDF report generation
10. Email notifications

## Troubleshooting

### Backend won't start

- Check PostgreSQL is running
- Verify database credentials in `.env`
- Check port 5000 is not in use

### Frontend won't load

- Check Node modules are installed: `npm install`
- Check backend is running
- Clear browser cache and hard refresh

### Database connection error

- Verify PostgreSQL service is running
- Check database exists: `psql -l`
- Verify credentials in `.env`

## Support & Documentation

For more information, refer to:

- API documentation in this README
- Code comments in source files
- Individual module documentation

## License

MIT License - Feel free to use for personal and commercial projects.

## Contributing

Contributions are welcome! Please submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for HR Excellence**
