import React, { useState } from 'react';

function Retention() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="module-page">
      <h2>Retention & Promotion</h2>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'promotions' ? 'active' : ''} onClick={() => setActiveTab('promotions')}>Promotions</button>
        <button className={activeTab === 'retention' ? 'active' : ''} onClick={() => setActiveTab('retention')}>Retention</button>
        <button className={activeTab === 'exits' ? 'active' : ''} onClick={() => setActiveTab('exits')}>Exit Interviews</button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="metric-card">
              <div className="metric-label">Promotions (YTD)</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Turnover Rate</div>
              <div className="metric-value">0%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Salary Increase</div>
              <div className="metric-value">0%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Retention Strategies</div>
              <div className="metric-value">0</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '20px' }}>
            <h3>Retention Metrics</h3>
            <p>Track employee retention and promotion patterns</p>
          </div>
        </div>
      )}

      {activeTab === 'promotions' && (
        <div className="card">
          <h3>Promotions</h3>
          <button className="btn-primary">+ Create Promotion</button>
          <p style={{ marginTop: '20px' }}>Promotions will appear here</p>
        </div>
      )}

      {activeTab === 'retention' && (
        <div className="card">
          <h3>Retention Strategies</h3>
          <button className="btn-primary">+ Create Strategy</button>
          <p style={{ marginTop: '20px' }}>Strategies will appear here</p>
        </div>
      )}

      {activeTab === 'exits' && (
        <div className="card">
          <h3>Exit Interviews</h3>
          <button className="btn-primary">+ New Interview</button>
          <p style={{ marginTop: '20px' }}>Exit interviews will appear here</p>
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

export default Retention;
