import api from './api';
import type { Usuario, UsuarioFormData } from '../types/usuario';

const BASE = '/users';

export async function listarUsuarios(): Promise<Usuario[]> {
  const response = await api.get<Usuario[]>(BASE);
  return response.data;
}

export async function criarUsuario(data: UsuarioFormData): Promise<Usuario> {
  const response = await api.post<Usuario>(BASE, data);
  return response.data;
}

export async function atualizarUsuario(id: number, data: UsuarioFormData): Promise<Usuario> {
  const response = await api.put<Usuario>(`${BASE}/${id}`, data);
  return response.data;
}

export async function excluirUsuario(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
