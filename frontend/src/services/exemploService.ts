import api from './api';
import type { Exemplo, ExemploRequest } from '../features/exemplo/types';

export const getExemplos = (): Promise<Exemplo[]> =>
  api.get<Exemplo[]>('/api/exemplos').then((res) => res.data);

export const createExemplo = (data: ExemploRequest): Promise<Exemplo> =>
  api.post<Exemplo>('/api/exemplos', data).then((res) => res.data);
