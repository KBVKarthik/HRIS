import React from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>HRIS</h1>
          <p>Human Resources Information System</p>
        </div>
        <div className="navbar-user">
          {user && (
            <>
              <span className="user-name">
                Welcome, {user.first_name} {user.last_name}
              </span>
              <button onClick={onLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
