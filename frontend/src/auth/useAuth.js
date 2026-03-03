import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook to access authentication context
 * Ensures context is being used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}
