import React, { useState } from 'react';

function CareerGrowth() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Career Growth & Planning</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'paths' ? 'active' : ''} onClick={() => setActiveTab('paths')}>Career Paths</button>
        <button className={activeTab === 'plans' ? 'active' : ''} onClick={() => setActiveTab('plans')}>Development Plans</button>
        <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>Skill Assessments</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Active Career Paths</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Development Plans</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Skill Assessments</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Progress</div>
              <div className="metric-value">0%</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Career Growth Metrics</h3>
            <p>Track employee development and career progression</p>
          </div>
        </div>
      )}

      {activeTab === 'paths' && (
        <div className="card">
          <h3>Career Paths</h3>
          <button className="btn-primary">+ Create Career Path</button>
          <p style={{ marginTop: '20px' }}>Career paths will appear here</p>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="card">
          <h3>Development Plans</h3>
          <button className="btn-primary">+ Create Development Plan</button>
          <p style={{ marginTop: '20px' }}>Development plans will appear here</p>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="card">
          <h3>Skill Assessments</h3>
          <button className="btn-primary">+ New Assessment</button>
          <p style={{ marginTop: '20px' }}>Skill assessments will appear here</p>
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

export default CareerGrowth;
