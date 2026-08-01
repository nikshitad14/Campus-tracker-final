import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://campus-tracker-final-1.onrender.com/api';
const BRANCHES = ['CSE','CSE-AIML','CSE-DS','IT','ECE','EEE','MECH','CIVIL','MBA'];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm_password:'', branch:'', year:'', phone:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.branch || !form.year)
      return setError('Please fill in all required fields.');
    if (form.password !== form.confirm_password)
      return setError('Passwords do not match!');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        name: form.name, email: form.email, password: form.password,
        branch: form.branch, year: parseInt(form.year), phone: form.phone, role: 'student'
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, #0F2D8A 0%, #1B4FE4 60%, #3B6EF5 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:480 }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🚌</div>
          <h1 style={{ color:'#fff', fontSize:24, fontWeight:700, margin:0 }}>Campus Bus Tracker</h1>
          <p style={{ color:'rgba(255,255,255,0.7)', marginTop:6, fontSize:13 }}>Vardhaman College of Engineering</p>
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:32, boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontWeight:700, marginBottom:4, fontSize:20 }}>Create Account 🎓</h2>
          <p style={{ color:'var(--muted)', fontSize:13, marginBottom:20 }}>Register with your college email</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" placeholder="e.g. Arjun Sharma" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Branch *</label>
                <select name="branch" value={form.branch} onChange={handleChange}>
                  <option value="">-- Select --</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Year *</label>
                <select name="year" value={form.year} onChange={handleChange}>
                  <option value="">-- Select --</option>
                  <option