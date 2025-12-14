import React, { useState } from 'react';

function Leadership() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Leadership & Mentoring</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'mentorship' ? 'active' : ''} onClick={() => setActiveTab('mentorship')}>Mentorship</button>
        <button className={activeTab === 'programs' ? 'active' : ''} onClick={() => setActiveTab('programs')}>Programs</button>
        <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>Feedback</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Active Mentors</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Mentees</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Leadership Programs</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Mentee Rating</div>
              <div className="metric-value">0/5</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Leadership Development</h3>
            <p>Develop leaders and support mentorship programs</p>
          </div>
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="card">
          <h3>Mentorship Programs</h3>
          <button className="btn-primary">+ Create Program</button>
          <p style={{ marginTop: '20px' }}>Programs will appear here</p>
        </div>
      )}

      {activeTab === 'programs' && (
        <div className="card">
          <h3>Leadership Development Programs</h3>
          <button className="btn-primary">+ Create Program</button>
          <p style={{ marginTop: '20px' }}>Programs will appear here</p>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="card">
          <h3>Feedback</h3>
          <p>View mentorship feedback and evaluations</p>
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

export default Leadership;
