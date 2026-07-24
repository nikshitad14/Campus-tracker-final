import React, { useEffect, useState }  from 'react';
import { useAuth } from '../utils/AuthContext';
import { fetchRoutes, fetchSchedules } from '../utils/api';
import axios from 'axios';

export default function DriverPanel() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [form, setForm]   = useState({ schedule_id: '', delay_minutes: '', reason: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoutes().then(r => {
      Promise.all(r.data.data.map(route => fetchSchedules(route.route_id)))
        .then(results => setSchedules(results.flatMap(r => r.data.data)));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.schedule_id || !form.delay_minutes) {
      setStatus('error:Please select a schedule and enter delay minutes.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/delays', { ...form, reported_by: 'driver' });
      setStatus('success:Delay reported! Students will be notified.');
      setForm({ schedule_id: '', delay_minutes: '', reason: '' });
    } catch (err) {
      setStatus('error:' + (err.response?.data?.message || 'Failed to report delay.'));
    } finally {
      setLoading(false);
    }
  };

  const [sType, sMsg] = status.split(':');

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <h1 className="page-title">🚌 Driver Panel</h1>
      <p className="page-subtitle">Welcome, {user?.name}! Report delays for your route.</p>

      {status && <div className={`alert alert-${sType === 'success' ? 'success' : 'error'}`}>{sMsg}</div>}

      <div className="card">
        <h2 style={{ fontWeight: 700, marginBottom: 16 }}>🚨 Report a Delay</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Schedule *</label>
            <select value={form.schedule_id}
              onChange={e => setForm({ ...form, schedule_id: e.target.value })}>
              <option value="">-- Select your schedule --</option>
              {schedules.map(s => (
                <option key={s.schedule_id} value={s.schedule_id}>
                  {s.route_name} • Bus {s.bus_number} • Dep: {s.departure_time}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Delay in Minutes *</label>
            <input type="number" min="1" max="120" value={form.delay_minutes}
              onChange={e => setForm({ ...form, delay_minutes: e.target.value })}
              placeholder="e.g. 15" />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <input value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
              placeholder="e.g. Heavy traffic near Ameerpet" />
          </div>
          <button type="submit" className="btn btn-danger" disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Reporting…' : '📢 Report Delay & Notify Students'}
          </button>
        </form>
      </div>

      <div className="card" style={{ marginTop: 16, background: '#FFF7ED', border: '1px solid #FED7AA' }}>
        <h3 style={{ fontWeight: 600, color: '#C2410C', marginBottom: 8 }}>⚠️ Driver Guidelines</h3>
        <ul style={{ paddingLeft: 20, fontSize: 14, color: '#9A3412', lineHeight: 2 }}>
          <li>Report delays as soon as you know about them</li>
          <li>Students subscribed to your route will get email alerts</li>
          <li>Enter 0 minutes if the bus is back on time</li>
          <li>Always mention the reason so admin can track patterns</li>
        </ul>
      </div>
    </div>
  );
}
