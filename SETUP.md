# HRIS Setup and Deployment Instructions

## Step-by-Step Installation Guide

### System Requirements

- Node.js v14.0 or higher
- PostgreSQL 12 or higher
- npm v6 or higher
- Windows, Mac, or Linux OS
- Minimum 2GB RAM
- 500MB disk space

---

## PART 1: DATABASE SETUP

### 1.1 Install PostgreSQL

**Windows:**

1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. Note the password you set for 'postgres' user
4. Keep default port 5432

**Mac:**

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### 1.2 Create Database

Open PowerShell/Terminal and run:

```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL prompt:
CREATE DATABASE hris_db;
\quit
```

### 1.3 Initialize Schema

From the HRIS root folder:

```bash
# Windows PowerShell
psql -U postgres -d hris_db -f backend/src/config/schema.sql

# Or manually run SQL file content in pgAdmin
```

---

## PART 2: BACKEND SETUP

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:

- express (web server)
- pg (PostgreSQL driver)
- jsonwebtoken (authentication)
- bcryptjs (password encryption)
- axios (HTTP client)
- cors (cross-origin support)

### 2.2 Configure Environment Variables

Create `.env` file in backend folder:

```bash
copy .env.example .env
```

Edit `.env` with your settings:

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hris_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=choose_a_random_secret_key_here
JWT_EXPIRE=7d
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### 2.3 Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Expected output:

```
HRIS Backend running on port 5000
Connected to PostgreSQL database
```

✅ Backend is ready at http://localhost:5000

---

## PART 3: FRONTEND SETUP

### 3.1 Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs:

- react (UI framework)
- react-router (navigation)
- axios (API client)
- recharts (data visualization)

### 3.2 Start Frontend Development Server

```bash
npm start
```

This will:

- Compile React code
- Start development server
- Open browser at http://localhost:3000
- Enable hot-reload on code changes

Expected: Login page appears in browser

---

## PART 4: INITIAL CONFIGURATION

### 4.1 Create First User

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   - Email: admin@hris.com
   - Password: admin123
   - First Name: Admin
   - Last Name: User
   - Employee ID: EMP001
4. Click Register

### 4.2 Login

1. Go back to Login page
2. Enter:
   - Email: admin@hris.com
   - Password: admin123
3. Click Login

✅ You're now in the HRIS dashboard!

---

## PART 5: TEST THE SYSTEM

### 5.1 Employee Module

1. Click "Employees" in sidebar
2. Click "Add Employee"
3. Fill in form and submit
4. View charts and table

### 5.2 Recruitment Module

1. Click "Recruitment" in sidebar
2. Switch between tabs
3. Try adding a job posting
4. Add candidates

### 5.3 Other Modules

- Explore each module in the sidebar
- View metrics and overview data
- Navigate tabs within modules

---

## PART 6: IMPORTANT PASSWORDS & CREDENTIALS

**Database (PostgreSQL)**

- Host: localhost
- Port: 5432
- Database: hris_db
- User: postgres
- Password: (the one you set during PostgreSQL installation)

**Application (HRIS)**

- URL: http://localhost:3000
- Default Email: admin@hris.com
- Default Password: admin123

**JWT Secret** (in .env)

- Change this to something unique in production!

---

## PART 7: COMMON ISSUES & SOLUTIONS

### Issue: "Connection refused" at 5432

**Solution:** PostgreSQL not running

```bash
# Windows: Start service from Services app
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

### Issue: "Database does not exist"

**Solution:** Run schema setup

```bash
psql -U postgres -d hris_db -f backend/src/config/schema.sql
```

### Issue: "Port 5000 already in use"

**Solution:** Change port in `.env` file

```
PORT=5001
```

### Issue: "Cannot find module"

**Solution:** Reinstall dependencies

```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Issue: Frontend blank or errors

**Solution:** Clear cache and restart

```bash
# In frontend folder
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## PART 8: PRODUCTION DEPLOYMENT

### 8.1 Build Frontend

```bash
cd frontend
npm build
```

Creates optimized `build/` folder

### 8.2 Backend Production

```bash
cd backend
npm start
```

### 8.3 Environment Variables for Production

Update `.env`:

```
NODE_ENV=production
JWT_SECRET=generate_a_very_secure_random_string
DB_HOST=your_production_db_host
DB_USER=your_prod_user
DB_PASSWORD=your_prod_password
```

### 8.4 Deploy Options

- **Heroku**: Deploy Node.js app, use Heroku Postgres
- **AWS**: Use EC2 for backend, RDS for PostgreSQL
- **DigitalOcean**: App Platform for easy deployment
- **Docker**: Containerize both backend and database

---

## PART 9: BACKUP & RESTORE

### Backup Database

```bash
pg_dump -U postgres hris_db > hris_backup.sql
```

### Restore Database

```bash
createdb hris_db_restored
psql -U postgres hris_db_restored < hris_backup.sql
```

---

## PART 10: MONITORING & MAINTENANCE

### Check Backend Health

```bash
curl http://localhost:5000/api/health
```

### View Logs

- Backend console shows request logs and errors
- Check browser console (F12) for frontend errors

### Update Dependencies

```bash
cd backend
npm update

cd ../frontend
npm update
```

---

## FOLDER REFERENCE

```
HRIS/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── index.js      # Main server
│   │   ├── config/       # Database config
│   │   ├── middleware/   # Auth middleware
│   │   └── routes/       # API endpoints
│   ├── package.json      # Dependencies
│   ├── .env              # Environment config
│   └── .env.example      # Template
│
├── frontend/             # React web app
│   ├── src/
│   │   ├── App.js        # Main component
│   │   ├── pages/        # Route pages
│   │   ├── components/   # Reusable components
│   │   └── index.js      # Entry point
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── package.json      # Dependencies
│   └── build/            # Production build
│
├── README.md             # Full documentation
├── QUICKSTART.md         # Quick guide
└── SETUP.md              # This file
```

---

## NEXT STEPS

1. ✅ Complete the steps above
2. 📖 Read README.md for full API documentation
3. 🔍 Explore each HR module
4. 📊 Customize fields and workflows
5. 🔐 Change default passwords
6. 🚀 Deploy to production when ready

---

## SUPPORT RESOURCES

- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Node.js Docs**: https://nodejs.org/docs/
- **React Docs**: https://react.dev/
- **Express Docs**: https://expressjs.com/

---

**You're all set! Happy HR Managing! 🎉**

For questions, refer to README.md in the root directory.
