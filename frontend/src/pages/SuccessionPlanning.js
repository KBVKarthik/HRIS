import React, { useState } from 'react';

function SuccessionPlanning() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Succession Planning</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'plans' ? 'active' : ''} onClick={() => setActiveTab('plans')}>Plans</button>
        <button className={activeTab === 'candidates' ? 'active' : ''} onClick={() => setActiveTab('candidates')}>Candidates</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Succession Plans</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Ready Now</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Ready in 1-2 Years</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Readiness Score</div>
              <div className="metric-value">0%</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Succession Overview</h3>
            <p>Plan for leadership continuity and critical positions</p>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="card">
          <h3>Succession Plans</h3>
          <button className="btn-primary">+ Create Plan</button>
          <p style={{ marginTop: '20px' }}>Plans will appear here</p>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="card">
          <h3>Successor Candidates</h3>
          <p>Identify and develop successor candidates</p>
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

export default SuccessionPlanning;
