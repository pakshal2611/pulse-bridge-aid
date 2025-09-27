import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient' | 'donor';
  bloodType?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => boolean;
  signup: (name: string, email: string, password: string, role: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('lifelink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string, role: string): boolean => {
    // Mock authentication - in real app, this would call API
    if (email && password && role) {
      const userData: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: role as User['role'],
        bloodType: role === 'donor' ? 'O+' : undefined // Default blood type for donors
      };
      setUser(userData);
      localStorage.setItem('lifelink_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: string): boolean => {
    // Mock signup - in real app, this would call API
    if (name && email && password && role) {
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        role: role as User['role'],
        bloodType: role === 'donor' ? 'O+' : undefined // Default blood type for donors
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