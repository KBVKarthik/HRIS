import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_URL}/metrics/dashboard`);
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {dashboardData && (
        <>
          {/* Key Metrics Grid */}
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Total Employees</div>
              <div className="metric-value">{dashboardData.totalEmployees}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Job Postings</div>
              <div className="metric-value">{dashboardData.activeJobPostings}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Pending Applications</div>
              <div className="metric-value">{dashboardData.pendingApplications}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Trainings</div>
              <div className="metric-value">{dashboardData.enrolledTrainings}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Departments</div>
              <div className="metric-value">{dashboardData.totalDepartments}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Mentorships</div>
              <div className="metric-value">{dashboardData.activeMentorships}</div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid" style={{ marginTop: '20px' }}>
            <div className="metric-card">
              <div className="metric-label">Average Salary</div>
              <div className="metric-value">${dashboardData.averageSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Turnover Rate</div>
              <div className="metric-value">{dashboardData.turnoverRate}%</div>
            </div>
          </div>
        </>
      )}

      {/* Quick Start Guide */}
      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-title">Quick Start Guide</div>
        <div className="quick-start-list">
          <h3>Welcome to HRIS! Here's what you can do:</h3>
          <ul>
            <li><strong>Recruitment & Selection:</strong> Post job openings, track candidates, manage applications</li>
            <li><strong>Career Growth:</strong> Plan career paths, manage development plans, track skill assessments</li>
            <li><strong>M&A & Restructuring:</strong> Track organizational changes and their impact on employees</li>
            <li><strong>Employee Motivation:</strong> Conduct surveys to measure satisfaction and engagement</li>
            <li><strong>Learning & Development:</strong> Manage training programs, certifications, and enrollments</li>
            <li><strong>Succession Planning:</strong> Identify successors and track their readiness</li>
            <li><strong>Leadership & Mentoring:</strong> Establish mentorship programs and leadership development</li>
            <li><strong>Retention & Promotion:</strong> Track promotions, retention strategies, and exit interviews</li>
            <li><strong>Compensation & Benefits:</strong> Manage salary structures and employee benefits</li>
            <li><strong>Job Design:</strong> Create and maintain job descriptions and specifications</li>
          </ul>
        </div>
      </div>

      <style>{`
        .dashboard {
          padding: 0;
        }

        .dashboard h2 {
          margin-bottom: 30px;
          color: #2c3e50;
        }

        .quick-start-list {
          padding: 0 20px;
        }

        .quick-start-list h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .quick-start-list ul {
          list-style: none;
          padding: 0;
        }

        .quick-start-list li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          color: #666;
        }

        .quick-start-list li:last-child {
          border-bottom: none;
        }

        .quick-start-list strong {
          color: #3498db;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
