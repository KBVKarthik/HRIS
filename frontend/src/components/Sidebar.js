import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/recruitment', label: 'Recruitment', icon: '🎯' },
    { path: '/career-growth', label: 'Career Growth', icon: '📈' },
    { path: '/restructuring', label: 'Restructuring', icon: '🏢' },
    { path: '/motivation', label: 'Motivation & Satisfaction', icon: '😊' },
    { path: '/learning', label: 'Learning & Development', icon: '📚' },
    { path: '/succession', label: 'Succession Planning', icon: '👔' },
    { path: '/leadership', label: 'Leadership & Mentoring', icon: '🎓' },
    { path: '/retention', label: 'Retention & Promotion', icon: '⭐' },
    { path: '/compensation', label: 'Compensation & Benefits', icon: '💰' },
    { path: '/job-design', label: 'Job Design', icon: '📋' },
    { path: '/data-management', label: 'Data Management', icon: '⚙️' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Collapse' : 'Expand'}
      >
        {isOpen ? '◀' : '▶'}
      </button>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="nav-item"
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
