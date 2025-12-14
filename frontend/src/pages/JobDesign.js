import React, { useState } from 'react';

function JobDesign() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Job Design</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'designs' ? 'active' : ''} onClick={() => setActiveTab('designs')}>Job Designs</button>
        <button className={activeTab === 'analysis' ? 'active' : ''} onClick={() => setActiveTab('analysis')}>Analysis</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Job Designs</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Designations</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Salary Range</div>
              <div className="metric-value">$0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Unique Skills</div>
              <div className="metric-value">0</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Job Design Overview</h3>
            <p>Manage job descriptions and role specifications</p>
          </div>
        </div>
      )}

      {activeTab === 'designs' && (
        <div className="card">
          <h3>Job Designs</h3>
          <button className="btn-primary">+ Create Job Design</button>
          <p style={{ marginTop: '20px' }}>Job designs will appear here</p>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="card">
          <h3>Job Analysis</h3>
          <p>Analyze job roles, skills, and compensation</p>
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

export default JobDesign;
