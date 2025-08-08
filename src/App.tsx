import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';

// Private pages
import UserDashboard from './pages/private/UserDashboard';
import AdminDashboard from './pages/private/AdminDashboard';
import ReportingPage from './pages/private/ReportingPage';
import UserAnalytics from './pages/private/UserAnalytics';
import AdminAnalytics from './pages/private/AdminAnalytics';
import AdminCaseManagement from './pages/private/AdminCaseManagement';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Protected User Routes */}
              <Route 
                path="/user/dashboard" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/report" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <ReportingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/analytics" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserAnalytics />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/report" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ReportingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminAnalytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/cases" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminCaseManagement />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
