import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

// Redirects to login if not logged in
export function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner" />;
  if (!user)   return <Navigate to="/login" replace />;

  // If specific roles required, check them
  if (roles && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}
