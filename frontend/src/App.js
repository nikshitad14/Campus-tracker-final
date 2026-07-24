import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import RoutesPage from './pages/RoutesPage';
import RouteDetail from './pages/RouteDetail';
import MapPage from './pages/MapPage';
import Subscribe from './pages/Subscribe';
import AdminDashboard from './pages/AdminDashboard';
import DriverPanel from './pages/DriverPanel';
import './index.css';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* All logged-in users */}
          <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/routes" element={<ProtectedRoute><Layout><RoutesPage /></Layout></ProtectedRoute>} />
          <Route path="/routes/:id" element={<ProtectedRoute><Layout><RouteDetail /></Layout></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Layout><MapPage /></Layout></ProtectedRoute>} />

          {/* Students & Admin only */}
          <Route path="/subscribe" element={
            <ProtectedRoute roles={['student','admin']}>
              <Layout><Subscribe /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin only */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />

          {/* Driver only */}
          <Route path="/driver" element={
            <ProtectedRoute roles={['driver']}>
              <Layout><DriverPanel /></Layout>
            </ProtectedRoute>
          } />

          {/* Catch all → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
