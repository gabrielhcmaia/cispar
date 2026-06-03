import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextValue } from '../types/auth';

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro do provider');
  }

  return context;
}
