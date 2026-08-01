import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
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
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/routes" element={<ProtectedRoute><Layout><RoutesPage /></Layout></ProtectedRoute>} />
          <Route path="/routes/:id" element={<ProtectedRoute><Layout><RouteDetail /></Layout></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Layout><MapPage /></Layout></ProtectedRoute>} />
          <Route path="/subscribe" element={<ProtectedRoute roles={['student','admin']}><Layout><Subscribe /></Layout></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
          <Route path="/driver" element={<ProtectedRoute roles={['driver']}><Layout><DriverPanel /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;