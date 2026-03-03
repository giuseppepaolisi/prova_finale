import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * AuthProvider - Manages authentication state globally
 * Handles token storage, user data, and session persistence
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user_data');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to restore session:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, accessToken) => {
    setToken(accessToken);
    setUser(userData);
    setError(null);
    
    // Persist to localStorage
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  }, []);

  const setAuthError = useCallback((errorMsg) => {
    setError(errorMsg);
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    logout,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
