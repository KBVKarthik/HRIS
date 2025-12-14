import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataManagement.css';

const DataManagement = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [adminDashboard, setAdminDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [importTable, setImportTable] = useState('employees');
  const [importData, setImportData] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    checkDataStatus();
    loadAdminDashboard();
  }, []);

  const checkDataStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/demo-data-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDataStatus(response.data);
    } catch (error) {
      console.error('Error checking data status:', error);
      setMessage('Error checking data status');
    }
  };

  const loadAdminDashboard = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdminDashboard(response.data);
    } catch (error) {
      console.error('Error loading admin dashboard:', error);
    }
  };

  const populateDemoData = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        `${apiUrl}/admin/populate-demo-data`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✓ ${response.data.message}\n\nData counts:\n${Object.entries(response.data.data_counts)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
        }`);

      // Refresh status
      checkDataStatus();
      loadAdminDashboard();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = async () => {
    if (!window.confirm('⚠️ This will delete ALL data from the database. Are you sure?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        `${apiUrl}/admin/clear-all-data`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✓ ${response.data.message}`);
      checkDataStatus();
      loadAdminDashboard();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImportCSV = async () => {
    if (!csvFile) {
      setMessage('Please select a CSV file');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const text = await csvFile.text();
      const lines = text.trim().split('\n');

      if (lines.length < 2) {
        setMessage('CSV file must have header and at least one data row');
        setLoading(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const record = {};
        headers.forEach((header, index) => {
          record[header] = values[index] || null;
        });
        data.push(record);
      }

      const response = await axios.post(
        `${apiUrl}/admin/import-csv`,
        { table_name: importTable, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✓ ${response.data.message}`);
      setCsvFile(null);
      checkDataStatus();
      loadAdminDashboard();
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/import-template/${importTable}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const csvContent = [
        Object.keys(response.data.template[0]).join(','),
        ...response.data.template.map(row => Object.values(row).join(','))
      ].join('\n');

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
      element.setAttribute('download', `${importTable}_template.csv`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      setMessage(`✗ Error downloading template: ${error.message}`);
    }
  };

  return (
    <div className="data-management-container">
      <h1>📊 Data Management Panel</h1>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'populate' ? 'active' : ''}`}
          onClick={() => setActiveTab('populate')}
        >
          Populate Demo Data
        </button>
        <button
          className={`tab-button ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          Import CSV
        </button>
        <button
          className={`tab-button ${activeTab === 'clear' ? 'active' : ''}`}
          onClick={() => setActiveTab('clear')}
        >
          Clear Data
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2>Database Status</h2>

          {dataStatus && (
            <div className={`status-card ${dataStatus.has_data ? 'has-data' : 'empty'}`}>
              <p className="status-message">{dataStatus.message}</p>
              <p className="employee-count">Total Employees: <strong>{dataStatus.employee_count}</strong></p>
            </div>
          )}

          {adminDashboard && (
            <div className="admin-grid">
              <div className="admin-card">
                <h3>👥 Total Employees</h3>
                <p className="card-value">{adminDashboard.total_employees}</p>
                <p className="card-label">Active: {adminDashboard.active_employees}</p>
              </div>

              <div className="admin-card">
                <h3>🏢 Departments</h3>
                <p className="card-value">{adminDashboard.total_departments}</p>
              </div>

              <div className="admin-card">
                <h3>📋 Candidates</h3>
                <p className="card-value">{adminDashboard.total_candidates}</p>
              </div>

              <div className="admin-card">
                <h3>💼 Open Positions</h3>
                <p className="card-value">{adminDashboard.open_positions}</p>
              </div>

              <div className="admin-card">
                <h3>🎓 Training Programs</h3>
                <p className="card-value">{adminDashboard.training_programs}</p>
              </div>

              <div className="admin-card">
                <h3>🤝 Active Mentorships</h3>
                <p className="card-value">{adminDashboard.active_mentorships}</p>
              </div>

              <div className="admin-card">
                <h3>📊 Surveys</h3>
                <p className="card-value">{adminDashboard.satisfaction_surveys}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Populate Tab */}
      {activeTab === 'populate' && (
        <div className="tab-content">
          <h2>Populate with Demo Data</h2>

          <div className="info-box">
            <h3>ℹ️ What will be populated?</h3>
            <ul>
              <li>10 employees across 6 departments</li>
              <li>10 designations (CEO, Manager, Developer, etc.)</li>
              <li>3 job postings with candidates and applications</li>
              <li>Career paths and development plans</li>
              <li>Skills assessments</li>
              <li>Organizational changes and impacts</li>
              <li>Satisfaction surveys with responses</li>
              <li>Training programs and enrollments</li>
              <li>Certifications</li>
              <li>Succession plans</li>
              <li>Mentorship relationships</li>
              <li>Leadership programs</li>
              <li>Promotions and retention strategies</li>
              <li>Compensation structures and benefits</li>
            </ul>
          </div>

          <button
            onClick={populateDemoData}
            disabled={loading}
            className="action-button populate-button"
          >
            {loading ? '⏳ Populating...' : '🚀 Populate Demo Data'}
          </button>

          {message && (
            <div className={`message-box ${message.includes('✓') ? 'success' : 'error'}`}>
              <pre>{message}</pre>
            </div>
          )}
        </div>
      )}

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="tab-content">
          <h2>Import CSV Data</h2>

          <div className="import-section">
            <label htmlFor="table-select">Select Table:</label>
            <select
              id="table-select"
              value={importTable}
              onChange={(e) => setImportTable(e.target.value)}
              className="select-input"
            >
              <option value="employees">Employees</option>
              <option value="candidates">Candidates</option>
              <option value="training_programs">Training Programs</option>
              <option value="promotions">Promotions</option>
              <option value="job_postings">Job Postings</option>
            </select>

            <button
              onClick={downloadTemplate}
              className="action-button secondary-button"
            >
              📥 Download CSV Template
            </button>
          </div>

          <div className="import-section">
            <label htmlFor="csv-file">Choose CSV File:</label>
            <input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="file-input"
            />
            {csvFile && <p className="file-selected">✓ {csvFile.name}</p>}
          </div>

          <button
            onClick={handleImportCSV}
            disabled={loading || !csvFile}
            className="action-button import-button"
          >
            {loading ? '⏳ Importing...' : '📤 Import CSV Data'}
          </button>

          {message && (
            <div className={`message-box ${message.includes('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="import-guide">
            <h3>📖 Import Guide</h3>
            <ol>
              <li>Select the table you want to import data to</li>
              <li>Click "Download CSV Template" to get the correct format</li>
              <li>Fill in your data following the template structure</li>
              <li>Select your CSV file and click "Import CSV Data"</li>
              <li>Check the status for success/error messages</li>
            </ol>
          </div>
        </div>
      )}

      {/* Clear Tab */}
      {activeTab === 'clear' && (
        <div className="tab-content">
          <h2>Clear All Data</h2>

          <div className="warning-box">
            <h3>⚠️ Warning: Permanent Action</h3>
            <p>This action will <strong>permanently delete</strong> all data from the database:</p>
            <ul>
              <li>All employees and their information</li>
              <li>All candidates and job applications</li>
              <li>All training and certifications</li>
              <li>All surveys and responses</li>
              <li>All HR records and history</li>
            </ul>
            <p><strong>This action cannot be undone!</strong></p>
          </div>

          <button
            onClick={clearAllData}
            disabled={loading}
            className="action-button danger-button"
          >
            {loading ? '⏳ Clearing...' : '🗑️ Clear All Data'}
          </button>

          {message && (
            <div className={`message-box ${message.includes('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataManagement;
