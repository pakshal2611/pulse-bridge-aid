import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('lifelink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, role) => {
    // Mock authentication - in real app, this would call API
    if (email && password && role) {
      const userData = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: role
      };
      setUser(userData);
      localStorage.setItem('lifelink_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (formData) => {
    // Mock signup - in real app, this would call API
    if (formData.email && formData.password && formData.role) {
      const userData = {
        id: Date.now().toString(),
        name: formData.name || formData.hospitalName || formData.bloodBankName,
        email: formData.email,
        role: formData.role,
        ...formData
      };
      setUser(userData);
      localStorage.setItem('lifelink_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lifelink_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};