import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import api from '../services/api';
import { AuthContextValue, AuthUser, JwtPayload, LoginCredentials } from '../types/auth';
import { UserLogin } from '../services/authservice';

const STORAGE_KEY = 'cispar_token';

function decodeJwt<T>(token: string): T {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64)) as T;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setInitializing(false);
      return;
    }
    try {
      const payload = decodeJwt<JwtPayload>(saved);
      if (payload.exp * 1000 > Date.now()) {
        setUser({ username: payload.sub, role: payload.role });
        setToken(saved);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const jwt = await UserLogin(credentials);
      const payload = decodeJwt<JwtPayload>(jwt);

      if (payload.exp * 1000 <= Date.now()) {
        throw new Error('Token expirado');
      }

      setUser({ username: payload.sub, role: payload.role });
      setToken(jwt);
      localStorage.setItem(STORAGE_KEY, jwt);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message as string);
      }
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: user !== null,
      initializing,
      login,
      logout,
    }),
    [user, token, initializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthProvider;
