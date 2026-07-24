import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ROLE_COLOR = { admin: '#FF6B35', driver: '#16A34A', student: '#9333EA' };
const ROLE_ICON  = { admin: '⚙️', driver: '🚌', student: '🎓' };

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/',          label: '🏠 Home',      roles: ['student','driver','admin'] },
    { to: '/routes',    label: '🛣️ Routes',    roles: ['student','driver','admin'] },
    { to: '/map',       label: '🗺️ Map',       roles: ['student','driver','admin'] },
    { to: '/subscribe', label: '🔔 Subscribe', roles: ['student','admin'] },
    { to: '/admin',     label: '⚙️ Admin',     roles: ['admin'] },
    { to: '/driver',    label: '🚌 Driver',    roles: ['driver'] },
  ].filter(l => user && l.roles.includes(user.role));

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#1B4FE4', color: '#fff', padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 60, position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 12px rgba(27,79,228,0.3)'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>🚌</span>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Campus Bus Tracker</span>
        <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 99 }}>VCE</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            color: pathname === l.to ? '#fff' : 'rgba(255,255,255,0.75)',
            textDecoration: 'none', padding: '6px 14px', borderRadius: 8,
            fontSize: 14, fontWeight: 500,
            background: pathname === l.to ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}>{l.label}</Link>
        ))}

        {/* User badge + logout */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12 }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)', borderRadius: 99,
              padding: '4px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span>{ROLE_ICON[user.role]}</span>
              <span style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              <span style={{
                background: ROLE_COLOR[user.role], borderRadius: 99,
                padding: '1px 8px', fontSize: 11, fontWeight: 700
              }}>{user.role}</span>
            </div>
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
              borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit'
            }}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
