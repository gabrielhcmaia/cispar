import { useCallback, useEffect, useState } from 'react';
import {
  atualizarUnidade,
  criarUnidade,
  excluirUnidade,
  listarUnidades,
} from '../services/unidadesService';
import type { UnidadeMedida, UnidadeMedidaFormData } from '../types/unidadeMedida';

export interface UseUnidadesMedidaResult {
  unidades: UnidadeMedida[];
  loading: boolean;
  error: string | null;
  addUnidade: (data: UnidadeMedidaFormData) => Promise<void>;
  updateUnidade: (id: number, data: UnidadeMedidaFormData) => Promise<void>;
  removeUnidade: (id: number) => Promise<void>;
}

function ordenarPorIdDesc(lista: UnidadeMedida[]): UnidadeMedida[] {
  return [...lista].sort((a, b) => b.id - a.id);
}

export function useUnidadesMedida(): UseUnidadesMedidaResult {
  const [unidades, setUnidades] = useState<UnidadeMedida[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarUnidades();
      setUnidades(ordenarPorIdDesc(data));
    } catch {
      setError('Erro ao carregar unidades de medida.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const addUnidade = useCallback(async (data: UnidadeMedidaFormData) => {
    const criada = await criarUnidade(data);
    setUnidades((prev) => ordenarPorIdDesc([criada, ...prev]));
  }, []);

  const updateUnidade = useCallback(async (id: number, data: UnidadeMedidaFormData) => {
    const atualizada = await atualizarUnidade(id, data);
    setUnidades((prev) => ordenarPorIdDesc(prev.map((item) => (item.id === id ? atualizada : item))));
  }, []);

  const removeUnidade = useCallback(async (id: number) => {
    await excluirUnidade(id);
    setUnidades((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { unidades, loading, error, addUnidade, updateUnidade, removeUnidade };
}
