import { useCallback, useEffect, useState } from 'react';
import {
  atualizarUsuario,
  criarUsuario,
  excluirUsuario,
  listarUsuarios,
} from '../services/usuariosService';
import type { Usuario, UsuarioFormData } from '../types/usuario';

export interface UseUsuariosResult {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  addUsuario: (data: UsuarioFormData) => Promise<void>;
  updateUsuario: (id: number, data: UsuarioFormData) => Promise<void>;
  removeUsuario: (id: number) => Promise<void>;
}

function ordenarPorIdDesc(lista: Usuario[]): Usuario[] {
  return [...lista].sort((a, b) => b.id - a.id);
}

export function useUsuarios(): UseUsuariosResult {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarUsuarios();
      setUsuarios(ordenarPorIdDesc(data));
    } catch {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const addUsuario = useCallback(async (data: UsuarioFormData) => {
    const criado = await criarUsuario(data);
    setUsuarios((prev) => ordenarPorIdDesc([criado, ...prev]));
  }, []);

  const updateUsuario = useCallback(async (id: number, data: UsuarioFormData) => {
    const atualizado = await atualizarUsuario(id, data);
    setUsuarios((prev) =>
      ordenarPorIdDesc(prev.map((item) => (item.id === id ? atualizado : item)))
    );
  }, []);

  const removeUsuario = useCallback(async (id: number) => {
    await excluirUsuario(id);
    setUsuarios((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { usuarios, loading, error, addUsuario, updateUsuario, removeUsuario };
}
