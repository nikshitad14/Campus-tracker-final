import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRoutes } from '../utils/api';

const features = [
  { icon: '🛣️', title: 'Live Routes',         desc: 'View all bus routes, stops, and timings in one place.',       link: '/routes' },
  { icon: '🗺️', title: 'Interactive Map',     desc: 'See bus routes visualized on a campus map.',                  link: '/map' },
  { icon: '🔔', title: 'Delay Notifications', desc: 'Subscribe to your route and get email alerts on delays.',     link: '/subscribe' },
  { icon: '🤖', title: 'AI ETA Predictor',    desc: 'Rule-based predictor estimates arrival using past delay data.', link: '/routes' },
];

export default function Home() {
  const [stats, setStats] = useState([
    { value: '...', label: 'Active Routes' },
    { value: '...', label: 'Bus Stops' },
    { value: '...', label: 'Buses' },
    { value: '~0', label: 'Avg. Delay (min)' },
  ]);

  useEffect(() => {
    fetchRoutes().then(r => {
      const routes = r.data.data;
      const totalStops = routes.reduce((sum, r) => sum + (parseInt(r.total_stops) || 0), 0);
      setStats([
        { value: routes.length,  label: 'Active Routes' },
        { value: totalStops,     label: 'Bus Stops' },
        { value: routes.length,  label: 'Buses' },
        { value: '~0',           label: 'Avg. Delay (min)' },
      ]);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1A2B6B 0%, #0D1640 100%)',
        borderRadius: 16, padding: '48px 32px', color: '#fff',
        marginBottom: 32, textAlign: 'center'
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🚌</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
          Campus Bus Tracker
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
          Know exactly when your bus arrives — no more guessing at the stop.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/routes" className="btn btn-primary" style={{ background: '#2E8B4A', fontSize: 16, padding: '12px 28px' }}>
            View Routes →
          </Link>
          <Link to="/map" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff', fontSize: 16, padding: '12px 28px' }}>
            Open Map 🗺️
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} className="card stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>What can you do?</h2>
      <div className="grid-2">
        {features.map(f => (
          <Link key={f.title} to={f.link} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', cursor: 'pointer', transition: 'box-shadow 0.15s' }}>
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{f.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 40, fontSize: 13 }}>
        Vardhaman College of Engineering • CSE Summer Project 2024-25
      </p>
    </div>
  );
}
