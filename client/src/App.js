import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Donate from './pages/Donate';
import DonationDetail from './pages/DonationDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function Navigation() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">NearAid</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8 items-center">
            {/* Always visible */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>

            {isAuthenticated() ? (
              <>
                {/* Only when LOGGED IN */}
                <Link
                  to="/browse"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Browse
                </Link>

                <Link
                  to="/donate"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  Donate
                </Link>

                <Link
                  to="/profile"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                >
                  {user?.name?.split(' ')[0] || 'Profile'}
                </Link>
              </>
            ) : (
              <>
                {/* Only when LOGGED OUT */}
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


function AppContent() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navigation />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />
        <Route path="/donation/:id" element={<DonationDetail />} />
        <Route path="/donate" element={
          <ProtectedRoute>
            <Donate />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* Footer - Appears on all pages */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;