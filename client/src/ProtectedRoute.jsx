import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated, refreshSession } from './utils/authUtils';

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      if (authenticated) {
        // Refresh the session if authenticated
        refreshSession();
      }
      setIsAuth(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;