# HRIS System - Complete Running Guide

This guide covers all ways to run the HRIS system with dummy data populated.

## 🚀 Quick Start (5 minutes)

### Prerequisites

- Node.js 14+ (Download from https://nodejs.org)
- npm (comes with Node.js)
- PostgreSQL 12+ (if using PostgreSQL) OR SQLite (comes with Node.js)

### Step 1: Install All Dependencies

```powershell
# From the HRIS root directory
npm run install:all
```

This installs dependencies for:

- Root package
- Backend server
- Frontend application

### Step 2: Initialize Database with Demo Data

**With PostgreSQL:**

```powershell
cd backend
npm run init:db
cd ..
```

**Without PostgreSQL (Using Built-in Endpoint):**
You'll populate data through the web interface (see step 4).

### Step 3: Start Both Servers

```powershell
# From root directory - starts both servers
npm run dev
```

Or run them separately:

**Terminal 1 - Backend:**

```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm start
```

### Step 4: Access the Application

Open your browser:

- **Application:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

### Step 5: Populate Demo Data

1. Login with your credentials (create an account first if needed)
2. Click the **⚙️ Data Management** icon in the sidebar
3. Click **"🚀 Populate Demo Data"**
4. Wait for the data to load (should complete in a few seconds)
5. Explore all modules with real data!

## 📊 What Gets Populated

The demo data includes:

### Core Data

- ✅ 10 employees across 6 departments
- ✅ 10 job designations (CEO to Analyst)
- ✅ 11 job designs with salary ranges

### Recruitment

- ✅ 3 job postings (Open, Closed)
- ✅ 4 candidates (various statuses)
- ✅ 4 applications (Applied to Hired)

### Career & Skills

- ✅ 4 career paths
- ✅ 4 development plans (In Progress & Completed)
- ✅ 5 skill assessments (Level 1-5)

### Organizational Changes

- ✅ 3 organizational changes (Planned, Approved, In Progress)
- ✅ 4 impact assessments (Critical to Medium severity)

### Employee Engagement

- ✅ 3 satisfaction surveys (Engagement, Motivation, General)
- ✅ 4 survey questions (Rating & Text)
- ✅ 4 survey responses

### Learning & Development

- ✅ 4 training programs
- ✅ 4 training enrollments (In Progress & Completed)
- ✅ 4 employee certifications (AWS, GCP, PMP, etc.)

### Succession Planning

- ✅ 3 succession plans
- ✅ 3 successor candidates (Ready Now, 1-2 Years, 3-5 Years)

### Leadership & Mentoring

- ✅ 3 mentorship programs
- ✅ 3 mentor relationships (Active)
- ✅ 4 mentor feedback ratings (Skills, Attitude, Performance, Communication)
- ✅ 3 leadership development programs

### Retention

- ✅ 3 promotions (All approved with salary increments)
- ✅ 3 retention strategies (Salary, Development, Flexibility)
- ✅ 2 exit interviews with rehire recommendations

### Compensation & Benefits

- ✅ 6 compensation structures (CEO to Junior Dev)
- ✅ 11 employee compensation records
- ✅ 4 benefits programs
- ✅ 11 employee benefit enrollments (with dependents)

**Total: 100+ data records across all modules**

## 🎮 Interactive Data Management

The Data Management page provides:

### Populate Demo Data

- One-click population with 100+ records
- Shows count of each entity type
- Real data for testing all modules

### Import CSV Data

- Download CSV templates for each table
- Upload your own data
- Bulk import employees, candidates, training, promotions, and more

### Clear All Data

- Remove all data from database
- Useful for testing and resetting

### Status Dashboard

- View current data counts
- Monitor total employees, departments, candidates, positions, etc.

## 🔧 Individual Component Commands

### Backend Commands

```powershell
cd backend

# Start production server
npm start

# Start with auto-reload (development)
npm run dev

# Initialize database with schema and demo data
npm run init:db

# Run tests
npm test
```

### Frontend Commands

```powershell
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Root Commands

```powershell
# Install all dependencies in all packages
npm run install:all

# Start both servers (requires concurrently)
npm run dev

# Or start servers individually
npm run backend:dev      # Terminal 1
npm run frontend:start   # Terminal 2
```

## 📱 Using the Application

### First Time Login

1. Create an account with:
   - Email
   - Password (min 6 characters)
2. Login with your credentials

### Dashboard

- View key metrics: employees, turnover, open positions, etc.
- Quick overview of all modules
- Access to all 10 HR modules

### Modules (with Demo Data)

Each module has:

- Data visualization and charts
- Metrics cards showing key stats
- Detailed tables with data
- Forms to add/edit records
- Status filters and search

### Data Management (Admin)

- Populate demo data
- Import CSV files
- Clear database
- View database statistics

## 🐛 Troubleshooting

### Port Already in Use

```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Node Modules Not Found

```powershell
# Clear and reinstall
npm cache clean --force
npm run install:all
```

### Database Connection Error

```powershell
# Check if PostgreSQL is running
# On Windows, verify PostgreSQL service in Services.msc

# If using default settings, connection should work
# If not, update .env with your database credentials
```

### Dependencies Installation Fails

```powershell
# Try with admin rights or:
npm install --no-optional
npm install --legacy-peer-deps
```

## 🌐 API Documentation

Backend API available at: http://localhost:5000/api

### Key Endpoints

**Authentication**

- POST `/api/auth/register` - Create account
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

**Modules** (with demo data)

- GET/POST `/api/employees` - Employee management
- GET/POST `/api/recruitment/*` - Recruitment & candidates
- GET/POST `/api/career/*` - Career paths & development
- GET/POST `/api/learning/*` - Training & certifications
- And 6 more modules...

**Admin**

- GET `/api/admin/demo-data-status` - Check if data loaded
- POST `/api/admin/populate-demo-data` - Load demo data
- POST `/api/admin/import-csv` - Import CSV
- GET `/api/admin/dashboard` - Admin stats

## 📈 Metrics & Analytics

Each module includes:

- Overview cards with key metrics
- Interactive charts (pie, bar, line)
- Trend analysis
- Detailed metrics dashboard

Example metrics available:

- Employee turnover rate
- Recruitment funnel
- Training completion rate
- Mentorship ratios
- Salary distribution
- And 40+ more...

## 🔐 Security

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Employee, Manager, HR, Admin)
- CORS protection
- Input validation

## 📚 Additional Resources

- **README.md** - Complete API documentation and feature list
- **SETUP.md** - Detailed installation and production deployment
- **PROJECT_SUMMARY.md** - System architecture and file structure
- **FILE_GUIDE.md** - Complete file reference guide
- **QUICKSTART.md** - 5-minute quick start (PostgreSQL)
- **QUICKSTART_SQLITE.md** - SQLite version without PostgreSQL

## 🚀 Production Deployment

See SETUP.md for deploying to:

- Heroku
- AWS (EC2, RDS)
- DigitalOcean
- Docker

## ✅ Checklist

- [ ] Node.js 14+ installed
- [ ] npm installed
- [ ] Clone/download HRIS project
- [ ] Run `npm run install:all`
- [ ] Start servers (`npm run dev` or separate terminals)
- [ ] Open http://localhost:3000
- [ ] Create account and login
- [ ] Go to Data Management
- [ ] Click "Populate Demo Data"
- [ ] Explore modules with demo data!

## 💡 Tips

1. **Data Management page** - One-click populate with 100+ records
2. **CSV Import** - Download templates and import your own data
3. **Responsive Design** - Works great on mobile/tablet too
4. **API First** - Build on top of 80+ backend endpoints
5. **Metrics** - 50+ metrics across all modules

## 📞 Support

If you encounter issues:

1. Check troubleshooting section above
2. Review the documentation files
3. Ensure all prerequisites are installed
4. Check database connection settings in .env
5. Review backend logs for error details

---

**You're now ready to use the complete HRIS system!** 🎉

Start with the Quick Start section above and you'll be up and running in minutes!
