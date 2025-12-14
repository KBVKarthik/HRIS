# HRIS Installation and Quick Start Guide

## Quick Overview

HRIS is a comprehensive Human Resources Information System with 10 major modules covering all aspects of HR management. This guide will get you up and running in minutes.

## What You Need

- Windows 10+ or any OS with Node.js
- PostgreSQL database
- Modern web browser (Chrome, Firefox, Edge)

## 5-Minute Setup

### 1. Database Setup

```bash
# Create database
createdb hris_db

# Initialize schema (run in database folder)
psql -U postgres -d hris_db -f backend/src/config/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend opens on http://localhost:3000

## Login

Use demo credentials or create a new account:

- **Email**: admin@hris.com
- **Password**: admin123

## What You Can Do

### 🎯 Recruitment & Selection

- Post job openings
- Track candidates
- Manage applications
- View hiring funnel analytics

### 📈 Career Growth & Planning

- Create career paths
- Set development goals
- Assess skills
- Track progress

### 🏢 Restructuring & M&A

- Plan organizational changes
- Track employee impacts
- Manage approvals
- Analyze changes

### 😊 Employee Motivation & Satisfaction

- Create surveys
- Measure engagement
- Track satisfaction
- View trends

### 📚 Learning & Development

- Manage training programs
- Track enrollments
- Monitor certifications
- Measure completion

### 👔 Succession Planning

- Create succession plans
- Identify successors
- Track readiness
- Analyze coverage

### 🎓 Leadership & Mentoring

- Run mentorship programs
- Match mentors/mentees
- Collect feedback
- Develop leaders

### ⭐ Retention & Promotion

- Track promotions
- Implement retention strategies
- Conduct exit interviews
- Analyze turnover

### 💰 Compensation & Benefits

- Manage salary structures
- Track compensation
- Administer benefits
- Analyze costs

### 📋 Job Design

- Create job descriptions
- Define requirements
- Set salary ranges
- Manage org structure

## Key Features

✅ **10 Integrated HR Modules**  
✅ **Real-time Analytics & Dashboards**  
✅ **Data Visualization with Charts**  
✅ **Employee Management**  
✅ **Recruitment Pipeline**  
✅ **Training & Development**  
✅ **Performance & Succession**  
✅ **Compensation Management**  
✅ **Secure Authentication**  
✅ **Responsive Design**

## File Structure

```
HRIS/
├── backend/          # Node.js API server
├── frontend/         # React web application
├── docs/             # Documentation
└── README.md        # This file
```

## Common Commands

**Backend**

```bash
cd backend
npm install      # Install dependencies
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

**Frontend**

```bash
cd frontend
npm install      # Install dependencies
npm start        # Start dev server
npm build        # Build for production
npm test         # Run tests
```

**Database**

```bash
# Create backup
pg_dump hris_db > hris_backup.sql

# Restore from backup
psql hris_db < hris_backup.sql

# Connect to database
psql -U postgres -d hris_db
```

## Environment Variables

Create a `.env` file in backend folder:

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hris_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

## Troubleshooting

### PostgreSQL Not Running

```bash
# Windows
# Start PostgreSQL service from Services app

# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Port Already in Use

```bash
# Backend (change PORT in .env)
# Frontend (use different port: npm start -- --port 3001)
```

### Dependencies Issues

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## API Testing

Use Postman or cURL to test API:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hris.com","password":"admin123"}'

# Get employees
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Support

Refer to `README.md` in root for:

- Complete API documentation
- Detailed module descriptions
- Advanced features
- Database schema

## Next Steps

1. **Explore Modules**: Navigate through all 10 HR modules
2. **Add Data**: Create employees, job postings, surveys, etc.
3. **View Analytics**: Check metrics and visualizations
4. **Customize**: Modify colors, fields, and workflows
5. **Integrate**: Connect with other systems via API

---

**Happy HR Managing! 🚀**
