import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import analyticsClient from '../services/analyticsClient';

const AuthContext = createContext(null);

// Admin user configuration
const ADMIN_USERS = {
  'fo1@crepdogcrew.com': {
    password: '12345678',
    user: {
      id: 'admin-001',
      email: 'fo1@crepdogcrew.com',
      firstName: 'Garv',
      lastName: 'Admin',
      company: 'Crepdog Crew',
      role: 'admin',
      investorType: 'Founder',
      isApproved: true,
      createdAt: new Date().toISOString(),
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('cdc_token');
      const savedUser = localStorage.getItem('cdc_user');

      if (token && savedUser) {
        try {
          // Check if it's a local admin token
          if (token.startsWith('local_admin_')) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
          
          const response = await authAPI.getCurrentUser();
          setUser(response.data.data.user);
          setIsAuthenticated(true);

          // Start analytics tracking
          try {
            analyticsClient.startTracking();
          } catch (e) {
            console.log('Analytics not available');
          }
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('cdc_token');
          localStorage.removeItem('cdc_refresh_token');
          localStorage.removeItem('cdc_user');
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    
    // Check for admin users first (local authentication)
    const adminConfig = ADMIN_USERS[email.toLowerCase()];
    if (adminConfig && adminConfig.password === password) {
      const adminUser = adminConfig.user;
      const localToken = `local_admin_${Date.now()}`;
      
      localStorage.setItem('cdc_token', localToken);
      localStorage.setItem('cdc_refresh_token', localToken);
      localStorage.setItem('cdc_user', JSON.stringify(adminUser));

      // Update state synchronously
      setUser(adminUser);
      setIsAuthenticated(true);
      setLoading(false);

      // Start analytics tracking
      try {
        analyticsClient.startTracking();
      } catch (e) {
        console.log('Analytics not available');
      }

      return { success: true };
    }

    // Try backend authentication for non-admin users
    try {
      const response = await authAPI.login({ email, password });
      const { user: userData, token, refreshToken } = response.data.data;

      localStorage.setItem('cdc_token', token);
      localStorage.setItem('cdc_refresh_token', refreshToken);
      localStorage.setItem('cdc_user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);

      // Start analytics tracking
      try {
        analyticsClient.startTracking();
      } catch (e) {
        console.log('Analytics not available');
      }

      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password'
      };
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await authAPI.register(data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // End analytics session
      await analyticsClient.endSession();

      // Call logout endpoint (only for non-local tokens)
      const token = localStorage.getItem('cdc_token');
      if (token && !token.startsWith('local_admin_')) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('cdc_token');
      localStorage.removeItem('cdc_refresh_token');
      localStorage.removeItem('cdc_user');

      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
