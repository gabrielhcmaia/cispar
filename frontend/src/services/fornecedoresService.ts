import api from './api';
import type { Fornecedor, FornecedorFormData } from '../types/fornecedor';

const BASE = '/fornecedores';

export async function listarFornecedores(): Promise<Fornecedor[]> {
  const response = await api.get<Fornecedor[]>(BASE);
  return response.data;
}

export async function criarFornecedor(data: FornecedorFormData): Promise<Fornecedor> {
  const response = await api.post<Fornecedor>(BASE, data);
  return response.data;
}

export async function atualizarFornecedor(
  id: number,
  data: FornecedorFormData
): Promise<Fornecedor> {
  const response = await api.put<Fornecedor>(`${BASE}/${id}`, data);
  return response.data;
}

export async function excluirFornecedor(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
