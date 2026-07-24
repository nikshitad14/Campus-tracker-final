import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRoute, fetchSchedules, getETA } from '../utils/api';

function ETABadge({ scheduleId }) {
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = () => {
    setLoading(true);
    getETA(scheduleId)
      .then(r => setEta(r.data.data))
      .catch(() => setEta({ error: true }))
      .finally(() => setLoading(false));
  };

  if (loading) return <span style={{ fontSize: 12, color: 'var(--muted)' }}>predicting…</span>;
  if (!eta)
    return <button className="btn btn-outline btn-sm" onClick={fetchPrediction}>🤖 Get ETA</button>;
  if (eta.error)
    return <span style={{ fontSize: 12, color: 'var(--danger)' }}>ETA unavailable</span>;

  const color = eta.predicted_delay_minutes === 0 ? 'var(--success)'
              : eta.predicted_delay_minutes <= 10 ? 'var(--warning)'
              : 'var(--danger)';

  return (
    <div style={{ fontSize: 12 }}>
      <span style={{ color, fontWeight: 700 }}>
        {eta.predicted_delay_minutes === 0
          ? `✅ On time (~${eta.predicted_eta})`
          : `⚠️ ~${eta.predicted_delay_minutes} min late (${eta.predicted_eta})`}
      </span>
      <span style={{ color: 'var(--muted)', marginLeft: 6 }}>({eta.confidence} confidence)</span>
    </div>
  );
}

export default function RouteDetail() {
  const { id } = useParams();
  const [route, setRoute]       = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([fetchRoute(id), fetchSchedules(id)])
      .then(([r, s]) => {
        setRoute(r.data.data);
        setSchedules(s.data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" />;
  if (!route)  return <div className="alert alert-error">Route not found.</div>;

  return (
    <div>
      <Link to="/routes" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: 14 }}>← Back to Routes</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, marginBottom: 4 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>{route.route_name}</h1>
        <span className="badge badge-blue">{route.route_code}</span>
      </div>
      <p className="page-subtitle">{route.start_location} → {route.end_location}</p>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Stops */}
        <div className="card">
          <h2 style={{ fontWeight: 700, marginBottom: 16 }}>🚏 Stops ({route.stops?.length})</h2>
          <ul className="stop-list">
            {route.stops?.map((stop, i) => (
              <li key={stop.stop_id} className="stop-item">
                {i < route.stops.length - 1 && <div className="stop-connector" />}
                <div className={`stop-dot ${i === 0 ? 'first' : i === route.stops.length - 1 ? 'last' : ''}`} />
                <div>
                  <div style={{ fontWeight: i === 0 || i === route.stops.length - 1 ? 600 : 400 }}>
                    {stop.stop_name}
                  </div>
                  {(i === 0 || i === route.stops.length - 1) &&
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {i === 0 ? 'Starting Point' : 'Final Destination'}
                    </div>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontWeight: 700 }}>🔔 Get Delay Alerts</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            Subscribe to receive email notifications whenever this bus is delayed.
          </p>
          <Link to={`/subscribe?route=${id}`} className="btn btn-primary">
            Subscribe to this Route
          </Link>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            📏 {route.total_distance_km} km total distance
          </div>
        </div>
      </div>

      {/* Schedules */}
      <div className="card">
        <h2 style={{ fontWeight: 700, marginBottom: 16 }}>📅 Today's Schedules</h2>
        {schedules.length === 0
          ? <p style={{ color: 'var(--muted)' }}>No schedules found for today.</p>
          : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Bus No.</th>
                    <th>Driver</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Days</th>
                    <th>AI ETA Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map(s => (
                    <tr key={s.schedule_id}>
                      <td><span className="badge badge-blue">{s.bus_number}</span></td>
                      <td>{s.driver_name}<br /><span style={{ fontSize: 12, color: 'var(--muted)' }}>{s.driver_phone}</span></td>
                      <td style={{ fontWeight: 600 }}>{s.departure_time}</td>
                      <td>{s.arrival_time}</td>
                      <td style={{ fontSize: 12 }}>{s.days_of_week}</td>
                      <td><ETABadge scheduleId={s.schedule_id} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}
