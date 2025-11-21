import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        
        if (isAuthenticated === 'true' && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call to your backend
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API response
      const userData = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      // TODO: Replace with actual API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

