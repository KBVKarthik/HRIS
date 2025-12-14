const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const recruitmentRoutes = require('./routes/recruitment');
const careerRoutes = require('./routes/career');
const restructuringRoutes = require('./routes/restructuring');
const motivationRoutes = require('./routes/motivation');
const learningRoutes = require('./routes/learning');
const successionRoutes = require('./routes/succession');
const leadershipRoutes = require('./routes/leadership');
const retentionRoutes = require('./routes/retention');
const compensationRoutes = require('./routes/compensation');
const jobDesignRoutes = require('./routes/jobDesign');
const metricsRoutes = require('./routes/metrics');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/restructuring', restructuringRoutes);
app.use('/api/motivation', motivationRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/succession', successionRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/retention', retentionRoutes);
app.use('/api/compensation', compensationRoutes);
app.use('/api/job-design', jobDesignRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HRIS Backend running on port ${PORT}`);
});

module.exports = app;
