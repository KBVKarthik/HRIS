import React, { useState } from 'react';

function LearningDevelopment() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Learning & Development</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'programs' ? 'active' : ''} onClick={() => setActiveTab('programs')}>Programs</button>
        <button className={activeTab === 'enrollments' ? 'active' : ''} onClick={() => setActiveTab('enrollments')}>Enrollments</button>
        <button className={activeTab === 'certifications' ? 'active' : ''} onClick={() => setActiveTab('certifications')}>Certifications</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Training Programs</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Enrollments</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Completion Rate</div>
              <div className="metric-value">0%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Hours</div>
              <div className="metric-value">0</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Learning Metrics</h3>
            <p>Track employee development and training progress</p>
          </div>
        </div>
      )}

      {activeTab === 'programs' && (
        <div className="card">
          <h3>Training Programs</h3>
          <button className="btn-primary">+ Create Program</button>
          <p style={{ marginTop: '20px' }}>Programs will appear here</p>
        </div>
      )}

      {activeTab === 'enrollments' && (
        <div className="card">
          <h3>Enrollments</h3>
          <p>View and manage training enrollments</p>
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="card">
          <h3>Certifications</h3>
          <button className="btn-primary">+ Add Certification</button>
          <p style={{ marginTop: '20px' }}>Certifications will appear here</p>
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

export default LearningDevelopment;
