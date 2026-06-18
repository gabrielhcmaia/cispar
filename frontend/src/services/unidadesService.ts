import api from './api';
import type { UnidadeMedida, UnidadeMedidaFormData } from '../types/unidadeMedida';

const BASE = '/unidades-medida';

export async function listarUnidades(): Promise<UnidadeMedida[]> {
  const response = await api.get<UnidadeMedida[]>(BASE);
  return response.data;
}

export async function criarUnidade(data: UnidadeMedidaFormData): Promise<UnidadeMedida> {
  const response = await api.post<UnidadeMedida>(BASE, data);
  return response.data;
}

export async function atualizarUnidade(
  id: number,
  data: UnidadeMedidaFormData
): Promise<UnidadeMedida> {
  const response = await api.put<UnidadeMedida>(`${BASE}/${id}`, data);
  return response.data;
}

export async function excluirUnidade(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
