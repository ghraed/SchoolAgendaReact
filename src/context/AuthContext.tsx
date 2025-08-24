import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Role = 'student' | 'teacher';
type User = { name: string; role: Role } | null;

type AuthContextType = {
  user: User;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = async (name: string, password: string) => {
    // simulate network latency
    await new Promise((r) => setTimeout(r, 900));

    const normalized = name.trim().toLowerCase();

    if (password !== 'password') {
      throw new Error('Invalid credentials');
    }
    if (normalized === 'student') {
      setUser({ name: 'Student', role: 'student' });
      return;
    }
    if (normalized === 'teacher') {
      setUser({ name: 'Teacher', role: 'teacher' });
      return;
    }
    // unknown user
    throw new Error("User must be 'student' or 'teacher'");
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
