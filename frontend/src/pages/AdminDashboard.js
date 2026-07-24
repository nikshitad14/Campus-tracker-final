import React, { useEffect, useState } from 'react';
import { fetchRoutes, fetchSchedules, fetchRidershipAnalytics } from '../utils/api';
import axios from 'axios';

export default function AdminDashboard() {
  const [routes, setRoutes]       = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [delayForm, setDelayForm] = useState({ schedule_id: '', delay_minutes: '', reason: '', reported_by: 'admin' });
  const [status, setStatus]       = useState('');
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    fetchRoutes().then(r => {
      const data = r.data.data;
      setRoutes(data);
      // Load all schedules
      Promise.all(data.map(route => fetchSchedules(route.route_id)))
        .then(results => {
          const all = results.flatMap(r => r.data.data);
          setSchedules(all);
        });
    });
    fetchRidershipAnalytics().then(r => setAnalytics(r.data.data)).catch(() => {});
  }, []);

  const handleDelayReport = async (e) => {
    e.preventDefault();
    if (!delayForm.schedule_id || !delayForm.delay_minutes) {
      setStatus('error:Please select a schedule and enter delay minutes.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/delays', delayForm);
      // Also trigger notification
      const sched = schedules.find(s => s.schedule_id === parseInt(delayForm.schedule_id));
      if (sched) {
        await axios.post('/api/subscriptions/notify', {
          route_id: sched.route_id,
          schedule_id: delayForm.schedule_id,
          delay_minutes: parseInt(delayForm.delay_minutes),
          reason: delayForm.reason
        }).catch(() => {});
      }
      setStatus('success:Delay reported and notifications sent!');
      setDelayForm({ schedule_id: '', delay_minutes: '', reason: '', reported_by: 'admin' });
    } catch (err) {
      setStatus('error:Failed to report delay.');
    } finally {
      setLoading(false);
    }
  };

  const [sType, sMsg] = status.split(':');

  return (
    <div>
      <h1 className="page-title">⚙️ Admin Dashboard</h1>
      <p className="page-subtitle">Manage schedules, report delays, and view analytics.</p>

      {/* Analytics */}
      {analytics.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 12 }}>📊 Ridership Analytics</h2>
          <div className="grid-4">
            {analytics.map(a => (
              <div key={a.route_code} className="card stat-card">
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{a.route_code}</div>
                <div className="stat-value">{a.active_subscribers}</div>
                <div className="stat-label">Active Subscribers</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{a.total_subscribers} total</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid-2">
        {/* Delay Report Form */}
        <div className="card">
          <h2 style={{ fontWeight: 700, marginBottom: 16 }}>🚨 Report a Delay</h2>
          {status && <div className={`alert alert-${sType === 'success' ? 'success' : 'error'}`}>{sMsg}</div>}
          <form onSubmit={handleDelayReport}>
            <div className="form-group">
              <label>Select Schedule *</label>
              <select value={delayForm.schedule_id}
                onChange={e => setDelayForm({ ...delayForm, schedule_id: e.target.value })}>
                <option value="">-- Choose schedule --</option>
                {schedules.map(s => (
                  <option key={s.schedule_id} value={s.schedule_id}>
                    {s.route_name} • Bus {s.bus_number} • Dep: {s.departure_time}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Delay (minutes) *</label>
              <input type="number" min="0" max="120" value={delayForm.delay_minutes}
                onChange={e => setDelayForm({ ...delayForm, delay_minutes: e.target.value })}
                placeholder="e.g. 15" />
            </div>
            <div className="form-group">
              <label>Reason</label>
              <input value={delayForm.reason}
                onChange={e => setDelayForm({ ...delayForm, reason: e.target.value })}
                placeholder="e.g. Heavy traffic near Ameerpet" />
            </div>
            <div className="form-group">
              <label>Reported By</label>
              <select value={delayForm.reported_by}
                onChange={e => setDelayForm({ ...delayForm, reported_by: e.target.value })}>
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            <button className="btn btn-danger" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Reporting…' : '📢 Report & Notify Students'}
            </button>
          </form>
        </div>

        {/* Active routes summary */}
        <div className="card">
          <h2 style={{ fontWeight: 700, marginBottom: 16 }}>🛣️ Routes Overview</h2>
          <table>
            <thead>
              <tr><th>Code</th><th>Route</th><th>Distance</th><th>Status</th></tr>
            </thead>
            <tbody>
              {routes.map(r => (
                <tr key={r.route_id}>
                  <td><span className="badge badge-blue">{r.route_code}</span></td>
                  <td style={{ fontSize: 13 }}>{r.route_name}</td>
                  <td style={{ fontSize: 13 }}>{r.total_distance_km} km</td>
                  <td><span className={`badge ${r.is_active ? 'badge-green' : 'badge-red'}`}>
                    {r.is_active ? 'Active' : 'Off'}
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
