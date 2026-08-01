import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const COLORS = {
  primary: '#3F4B76',
  secondary: '#768A93',
  light: '#AEB8C4',
  background: "linear-gradient(135deg, #14213D 0%, #1F2D5A 45%, #3F4B76 100%)",
  white: '#FFFFFF',
  hover: '#313B60'
};

const DEMO_ACCOUNTS = [
  {
    role: 'admin',
    email: 'admin@vce.ac.in',
    password: 'admin123',
    icon: '⚙️',
    color: COLORS.primary,
  },
  {
    role: 'driver',
    email: 'ramesh@vce.ac.in',
    password: 'driver123',
    icon: '🚌',
    color: COLORS.secondary,
  },
  {
    role: 'student',
    email: 'arjun@student.vce.ac.in',
    password: 'student123',
    icon: '🎓',
    color: '#5D7191',
  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const user = await login(form.email, form.password);

      if (user.role === 'admin')
        navigate('/admin');
      else
        navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acc) =>
    setForm({
      email: acc.email,
      password: acc.password,
    });

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg,#3F4B76 0%,#556487 55%,#768A93 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 430,
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: 30,
          }}
        >
          <div style={{ fontSize: 55 }}>🚌</div>

          <h1
            style={{
              color: COLORS.white,
              fontWeight: 800,
              fontSize: 30,
              margin: 0,
              letterSpacing: 0.5,
            }}
          >
            Campus Bus Tracker
          </h1>

          <p
            style={{
              color: '#D8E2EC',
              marginTop: 8,
              fontSize: 14,
            }}
          >
            Vardhaman College of Engineering
          </p>
        </div>

        {/* Login Card */}

        <div
          style={{
            background: COLORS.white,
            borderRadius: 18,
            padding: 32,
            boxShadow: '0 15px 40px rgba(63,75,118,.25)',
          }}
        >
          <h2
            style={{
              marginBottom: 6,
              color: COLORS.primary,
            }}
          >
            Welcome Back 👋
          </h2>

          <p
            style={{
              color: COLORS.secondary,
              marginBottom: 24,
            }}
          >
            Sign in to your account
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 14,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                background: COLORS.primary,
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              marginTop: 18,
              color: COLORS.secondary,
            }}
          >
            New Student?{' '}
            <Link
              to="/register"
              style={{
                color: COLORS.primary,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Create Account →
            </Link>
          </p>

          <div
            style={{
              marginTop: 25,
              borderTop: '1px solid #E2E8F0',
              paddingTop: 20,
            }}
          >
            <p
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: COLORS.secondary,
              }}
            >
              DEMO ACCOUNTS
            </p>

            <div
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => fillDemo(acc)}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${acc.color}`,
                    background: `${acc.color}15`,
                    color: acc.color,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {acc.icon} {acc.role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards */}

        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 20,
          }}
        >
          {[
            {
              icon: '🎓',
              role: 'Student',
              desc: 'View routes & schedules',
            },
            {
              icon: '🚌',
              role: 'Driver',
              desc: 'Report delays',
            },
            {
              icon: '⚙️',
              role: 'Admin',
              desc: 'Full access',
            },
          ].map((item) => (
            <div
              key={item.role}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,.12)',
                border: '1px solid rgba(255,255,255,.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 12,
                padding: 14,
                color: '#fff',
              }}
            >
              <div style={{ fontSize: 20 }}>{item.icon}</div>

              <div
                style={{
                  fontWeight: 600,
                  marginTop: 5,
                }}
              >
                {item.role}
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: .8,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}