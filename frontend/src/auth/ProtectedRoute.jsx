import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * ProtectedRoute - Guards routes that require authentication
 * Redirects unauthenticated users to login page
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
