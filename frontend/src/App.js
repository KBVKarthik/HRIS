import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Recruitment from './pages/Recruitment';
import CareerGrowth from './pages/CareerGrowth';
import Restructuring from './pages/Restructuring';
import EmployeeMotivation from './pages/EmployeeMotivation';
import LearningDevelopment from './pages/LearningDevelopment';
import SuccessionPlanning from './pages/SuccessionPlanning';
import Leadership from './pages/Leadership';
import Retention from './pages/Retention';
import Compensation from './pages/Compensation';
import JobDesign from './pages/JobDesign';
import DataManagement from './pages/DataManagement';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get(`${API_URL}/auth/me`)
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/career-growth" element={<CareerGrowth />} />
              <Route path="/restructuring" element={<Restructuring />} />
              <Route path="/motivation" element={<EmployeeMotivation />} />
              <Route path="/learning" element={<LearningDevelopment />} />
              <Route path="/succession" element={<SuccessionPlanning />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/retention" element={<Retention />} />
              <Route path="/compensation" element={<Compensation />} />
              <Route path="/job-design" element={<JobDesign />} />
              <Route path="/data-management" element={<DataManagement />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
