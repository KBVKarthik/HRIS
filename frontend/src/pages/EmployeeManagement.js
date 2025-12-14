import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    employee_id: '',
    department_id: '',
    designation_id: '',
    date_of_joining: '',
    employment_type: 'full_time',
    salary: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/employees`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShowForm(false);
      setFormData({
        email: '', first_name: '', last_name: '', employee_id: '',
        department_id: '', designation_id: '', date_of_joining: '',
        employment_type: 'full_time', salary: ''
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  if (loading) return <div className="loading">Loading Employees...</div>;

  // Calculate metrics
  const empByStatus = employees.reduce((acc, emp) => {
    const existing = acc.find(item => item.status === emp.employment_status);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ status: emp.employment_status, count: 1 });
    }
    return acc;
  }, []);

  const empByDept = employees.reduce((acc, emp) => {
    const existing = acc.find(item => item.name === emp.department_name);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: emp.department_name || 'Unassigned', count: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c'];

  return (
    <div className="module-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Employee Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Employee'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Add New Employee</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date of Joining</label>
              <input type="date" name="date_of_joining" value={formData.date_of_joining} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Employment Type</label>
              <select name="employment_type" value={formData.employment_type} onChange={handleChange}>
                <option>full_time</option>
                <option>part_time</option>
                <option>contract</option>
              </select>
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn-success">Create Employee</button>
            </div>
          </form>
        </div>
      )}

      {/* Metrics */}
      <div className="grid" style={{ marginBottom: '20px' }}>
        <div className="metric-card">
          <div className="metric-label">Total Employees</div>
          <div className="metric-value">{employees.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Salary</div>
          <div className="metric-value">${(employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid" style={{ marginBottom: '20px' }}>
        <div className="chart-container">
          <div className="chart-title">Employees by Status</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={empByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
                {empByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">Employees by Department</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={empByDept}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card">
        <h3>Employee List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department_name || '-'}</td>
                <td>{emp.designation_name || '-'}</td>
                <td><span className={`badge badge-${emp.employment_status === 'active' ? 'success' : 'danger'}`}>{emp.employment_status}</span></td>
                <td>${emp.salary ? emp.salary.toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeManagement;
