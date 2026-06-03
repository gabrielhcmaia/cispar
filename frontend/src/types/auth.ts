export enum UserRole {
  'ADMIN',
  'USER',
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  role: UserRole;
}

export interface AuthContextType {
  currentUser: AuthUser;
  login: (login: LoginCredentials) => void;
  logout: (logout: LoginCredentials) => void;
}

export interface JwtPayload {
  sub: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  initializing: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
