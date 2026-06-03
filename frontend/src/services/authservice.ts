import { LoginCredentials } from '../types/auth';
import api from './api';

export async function UserLogin(credentials: LoginCredentials): Promise<string> {
  const response = await api.post<{ token: string }>('/auth/login', credentials);
  return response.data.token;
}
