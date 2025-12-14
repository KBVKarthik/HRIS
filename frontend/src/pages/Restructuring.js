import React, { useState } from 'react';

function Restructuring() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Restructuring & M&A</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'changes' ? 'active' : ''} onClick={() => setActiveTab('changes')}>Changes</button>
        <button className={activeTab === 'impacts' ? 'active' : ''} onClick={() => setActiveTab('impacts')}>Impact Analysis</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Organizational Changes</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Affected Employees</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Pending Approvals</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Completion Rate</div>
              <div className="metric-value">0%</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Restructuring Overview</h3>
            <p>Track and manage organizational changes</p>
          </div>
        </div>
      )}

      {activeTab === 'changes' && (
        <div className="card">
          <h3>Organizational Changes</h3>
          <button className="btn-primary">+ Create Change</button>
          <p style={{ marginTop: '20px' }}>Changes will appear here</p>
        </div>
      )}

      {activeTab === 'impacts' && (
        <div className="card">
          <h3>Impact Analysis</h3>
          <p>Analyze the impact of organizational changes on employees</p>
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

export default Restructuring;
