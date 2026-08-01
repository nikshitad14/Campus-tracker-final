import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const DEMO_ACCOUNTS = [
  { role: 'admin',   email: 'admin@vce.ac.in',           password: 'admin123',   icon: '⚙️', color: '#1B4FE4' },
  { role: 'driver',  email: 'ramesh@vce.ac.in',          password: 'driver123',  icon: '🚌', color: '#16A34A' },
  { role: 'student', email: 'arjun@student.vce.ac.in',   password: 'student123', icon: '🎓', color: '#9333EA' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      // Redirect based on role
      if (user.role === 'admin')  navigate('/admin');
      else                        navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acc) => setForm({ email: acc.email, password: acc.password });

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0F2D8A 0%, #1B4FE4 60%, #3B6EF5 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🚌</div>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: 0 }}>Campus Bus Tracker</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6, fontSize: 14 }}>
            Vardhaman College of Engineering
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ fontWeight: 700, marginBottom: 6, fontSize: 20 }}>Welcome back 👋</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Sign in to your account</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, marginTop: 8 }}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
<p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--muted)' }}>
  New student?{' '}
  <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
    Create Account →
  </Link>
</p>

          {/* Role badges */}
          <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, textAlign: 'center' }}>
              DEMO ACCOUNTS — click to fill
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.role} onClick={() => fillDemo(acc)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                    border: `1.5px solid ${acc.color}20`, background: `${acc.color}10`,
                    color: acc.color, fontWeight: 600, fontSize: 13, fontFamily: 'inherit'
                  }}>
                  {acc.icon} {acc.role.charAt(0).toUpperCase() + acc.role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Role info */}
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { icon: '🎓', role: 'Student', desc: 'View routes & schedules' },
            { icon: '🚌', role: 'Driver',  desc: 'Report delays' },
            { icon: '⚙️', role: 'Admin',   desc: 'Full access' },
          ].map(r => (
            <div key={r.role} style={{
              flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '10px 14px', color: '#fff'
            }}>
              <div style={{ fontSize: 18 }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{r.role}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
