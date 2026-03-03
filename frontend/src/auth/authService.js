const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Centralized authentication API service
 * Handles all auth-related HTTP calls
 */
export const authService = {
  /**
   * Login user with email
   * @param {string} email - User email
   * @returns {Promise<{access_token, token_type, user}>}
   */
  async login(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during login');
    }
  },

  /**
   * Signup new user
   * @param {Object} userData - User data { name, email, role }
   * @returns {Promise<user>}
   */
  async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Signup failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error during signup');
    }
  },

  /**
   * Verify token validity
   * @param {string} token - JWT token
   * @returns {Promise<boolean>}
   */
  async verifyToken(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
