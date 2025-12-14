# HRIS System - Quick Start Guide (SQLite Version)

This guide helps you run the HRIS system with SQLite (no PostgreSQL installation needed).

## Prerequisites

- Node.js 14+ installed
- npm installed
- Windows PowerShell or Command Prompt

## Installation & Quick Start

### Step 1: Install Dependencies

**Backend:**

```powershell
cd backend
npm install
cd ..
```

**Frontend:**

```powershell
cd frontend
npm install
cd ..
```

### Step 2: Configure Environment

The system comes pre-configured in `.env`. You can keep the defaults for SQLite.

### Step 3: Initialize Database

For SQLite (automatic):

```powershell
cd backend
npm run init:db
cd ..
```

The database file will be created as `hris.sqlite` in the backend directory.

### Step 4: Run the System

#### Option A: Run both servers together (Recommended)

```powershell
npm run dev
```

#### Option B: Run servers separately

**Terminal 1 - Start Backend:**

```powershell
cd backend
npm start
```

**Terminal 2 - Start Frontend (wait for backend to start):**

```powershell
cd frontend
npm start
```

## Access the Application

- **Web App:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Docs:** http://localhost:5000/api/docs

## Demo Credentials

Once logged in, use the Data Management page to:

1. **Populate Demo Data:** Click "Populate Demo Data" to load example data

   - 10 employees
   - 6 departments
   - 10 job designations
   - Job postings and candidates
   - Career paths and development plans
   - Training programs and enrollments
   - And much more!

2. **Import CSV:** Upload your own data in CSV format

3. **Clear Data:** Remove all data from the database

## First Time Setup

After launching the system:

1. Login with temporary credentials (create account)
2. Navigate to "Data Management" (⚙️) in the sidebar
3. Click "Populate Demo Data" to load example data
4. Explore all 10 HR modules with real data

## Key Features

✅ 10 HR modules (Recruitment, Career, Learning, etc.)
✅ 80+ API endpoints
✅ 50+ metrics and analytics
✅ 30+ database tables
✅ User authentication & role-based access
✅ Data visualization with charts
✅ CSV import/export functionality
✅ Responsive mobile-friendly design

## Troubleshooting

**Port 3000 already in use:**

```powershell
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Port 5000 already in use:**

```powershell
# Kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Dependencies not installing:**

```powershell
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

**Module not found errors:**

- Make sure all npm dependencies are installed
- Delete `node_modules` folder and run `npm install` again

## Database (SQLite)

The SQLite database file `hris.sqlite` will be created automatically in the backend directory.

**To reset the database:**

1. Delete `hris.sqlite` file
2. Run `npm run init:db` again

## PostgreSQL Setup (Optional)

If you prefer PostgreSQL:

1. Install PostgreSQL from https://www.postgresql.org/download/windows/
2. Create database: `createdb hris_db`
3. Update `.env` file with PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hris_db
   DB_USER=postgres
   DB_PASSWORD=<your_password>
   DB_TYPE=postgresql
   ```
4. Initialize schema: `npm run init:db`

## Production Deployment

See SETUP.md for production deployment instructions on:

- Heroku
- AWS
- DigitalOcean
- Docker

## Support & Documentation

- **README.md:** Complete API documentation
- **SETUP.md:** Detailed installation & deployment
- **PROJECT_SUMMARY.md:** System architecture overview
- **FILE_GUIDE.md:** Complete file structure reference

## Next Steps

1. Run the application
2. Explore the Data Management page
3. Populate with demo data
4. Try the different HR modules
5. Review the metrics and analytics
6. Import your own data as needed

Happy using HRIS! 🎉
