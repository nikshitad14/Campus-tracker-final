import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRoutes } from '../utils/api';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    fetchRoutes()
      .then(r => setRoutes(r.data.data))
      .catch(() => setError('Could not load routes. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;
  if (error)   return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <h1 className="page-title">🛣️ Bus Routes</h1>
      <p className="page-subtitle">Select a route to see schedule, stops, and AI ETA predictions.</p>

      <div className="grid-2">
        {routes.map(r => (
          <Link key={r.route_id} to={`/routes/${r.route_id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span className="badge badge-blue">{r.route_code}</span>
                <span className={`badge ${r.is_active ? 'badge-green' : 'badge-red'}`}>
                  {r.is_active ? '● Active' : '● Inactive'}
                </span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{r.route_name}</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 12 }}>
                📍 {r.start_location} → {r.end_location}
              </p>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--muted)' }}>
                <span>🚏 {r.total_stops} stops</span>
                {r.total_distance_km && <span>📏 {r.total_distance_km} km</span>}
              </div>
              <div style={{ marginTop: 14, textAlign: 'right' }}>
                <span className="btn btn-outline btn-sm">View Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
