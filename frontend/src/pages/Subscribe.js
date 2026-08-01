import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRoutes } from '../utils/api';
import axios from 'axios';

const BASE_URL = 'https://campus-tracker-final-1.onrender.com/api';

export default function Subscribe() {
  const [searchParams] = useSearchParams();
  const defaultRoute = searchParams.get('route') || '';

  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    student_name: '', student_email: '', student_phone: '',
    route_id: defaultRoute, notification_type: 'email'
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoutes().then(r => setRoutes(r.data.data)).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.student_name || !form.student_email || !form.route_id) {
      setStatus('error:Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/subscriptions`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus('success:Subscribed successfully!');
      setForm({ student_name: '', student_email: '', student_phone: '', route_id: '', notification_type: 'email' });
    } catch (err) {
      setStatus('error:' + (err.response?.data?.message || 'Failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const [statusType, statusMsg] = (status || ':').split(':');

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <h1 className="page-title">🔔 Subscribe to Route</h1>
      <p className="page-subtitle">Get email notifications when your bus is delayed.</p>

      {status && (
        <div className={`alert alert-${statusType === 'success' ? 'success' : 'error'}`}>
          {statusMsg}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input name="student_name" value={form.student_name} onChange={handleChange} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input type="email" name="student_email" value={form.student_email} onChange={handleChange} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Phone Number (optional)</label>
            <input name="student_phone" value={form.student_phone} onChange={handleChange} placeholder="9876543210" />
          </div>
          <div className="form-group">
            <label>Select Route *</label>
            <select name="route_id" value={form.route_id} onChange={handleChange}>
              <option value="">-- Choose a route --</option>
              {routes.map(r => (
                <option key={r.route_id} value={r.route_id}>
                  {r.route_code}: {r.route_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Notification Type</label>
            <select name="notification_type" value={form.notification_type} onChange={handleChange}>
              <option value="email">Email Only</option>
              <option value="sms">SMS Only</option>
              <option value="both">Both Email and SMS</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? 'Subscribing...' : '🔔 Subscribe Now'}
          </button>
        </form>
      </div>
    </div>
  );
}