import api from './api';
import type { Tecnico, TecnicoFormData } from '../types/tecnico';

const BASE = '/tecnicos';

export async function listarTecnicos(): Promise<Tecnico[]> {
  const response = await api.get<Tecnico[]>(BASE);
  return response.data;
}

export async function criarTecnico(data: TecnicoFormData): Promise<Tecnico> {
  const response = await api.post<Tecnico>(BASE, data);
  return response.data;
}

export async function atualizarTecnico(id: number, data: TecnicoFormData): Promise<Tecnico> {
  const response = await api.put<Tecnico>(`${BASE}/${id}`, data);
  return response.data;
}

export async function excluirTecnico(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
