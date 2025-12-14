import React, { useState } from 'react';

function EmployeeMotivation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Employee Motivation & Satisfaction</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'surveys' ? 'active' : ''} onClick={() => setActiveTab('surveys')}>Surveys</button>
        <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Analytics</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Active Surveys</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Response Rate</div>
              <div className="metric-value">0%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Satisfaction</div>
              <div className="metric-value">0/5</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Respondents</div>
              <div className="metric-value">0</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Employee Engagement</h3>
            <p>Monitor employee satisfaction and engagement levels</p>
          </div>
        </div>
      )}

      {activeTab === 'surveys' && (
        <div className="card">
          <h3>Surveys</h3>
          <button className="btn-primary">+ Create Survey</button>
          <p style={{ marginTop: '20px' }}>Surveys will appear here</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h3>Analytics Dashboard</h3>
          <p>View detailed survey analytics and trends</p>
        </div>
      )}

      <style>{`
        .tabs {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          border-bottom: 2px solid #eee;
        }
        .tabs button {
          padding: 12px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          color: #666;
          font-weight: 500;
          transition: all 0.3s;
        }
        .tabs button.active {
          color: #3498db;
          border-bottom-color: #3498db;
        }
        .tabs button:hover {
          color: #3498db;
        }
      `}</style>
    </div>
  );
}

export default EmployeeMotivation;
