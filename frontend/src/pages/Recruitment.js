import React, { useState } from 'react';

function Recruitment() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Recruitment & Selection</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}>Job Postings</button>
        <button className={activeTab === 'candidates' ? 'active' : ''} onClick={() => setActiveTab('candidates')}>Candidates</button>
        <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>Applications</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Open Positions</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Candidates</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Pending Applications</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Time to Hire</div>
              <div className="metric-value">0 days</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Recruitment Funnel</h3>
            <p>Visualizes the recruitment pipeline from applications to hiring</p>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="card">
          <h3>Job Postings</h3>
          <button className="btn-primary">+ Post New Job</button>
          <p style={{ marginTop: '20px' }}>Job postings will appear here</p>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="card">
          <h3>Candidates</h3>
          <button className="btn-primary">+ Add Candidate</button>
          <p style={{ marginTop: '20px' }}>Candidates will appear here</p>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="card">
          <h3>Applications</h3>
          <p>Application tracking system</p>
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

export default Recruitment;
