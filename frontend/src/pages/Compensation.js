import React, { useState } from 'react';

function Compensation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Compensation & Benefits</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'structures' ? 'active' : ''} onClick={() => setActiveTab('structures')}>Structures</button>
        <button className={activeTab === 'employee' ? 'active' : ''} onClick={() => setActiveTab('employee')}>Employee Comp</button>
        <button className={activeTab === 'benefits' ? 'active' : ''} onClick={() => setActiveTab('benefits')}>Benefits</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Total Comp Cost</div>
              <div className="metric-value">$0M</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Salary</div>
              <div className="metric-value">$0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Benefit Programs</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Enrollment Rate</div>
              <div className="metric-value">0%</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Compensation Overview</h3>
            <p>Manage employee compensation and benefits</p>
          </div>
        </div>
      )}

      {activeTab === 'structures' && (
        <div className="card">
          <h3>Compensation Structures</h3>
          <button className="btn-primary">+ Create Structure</button>
          <p style={{ marginTop: '20px' }}>Structures will appear here</p>
        </div>
      )}

      {activeTab === 'employee' && (
        <div className="card">
          <h3>Employee Compensation</h3>
          <p>View and manage individual employee compensation</p>
        </div>
      )}

      {activeTab === 'benefits' && (
        <div className="card">
          <h3>Benefits Programs</h3>
          <button className="btn-primary">+ Create Program</button>
          <p style={{ marginTop: '20px' }}>Benefits will appear here</p>
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

export default Compensation;
