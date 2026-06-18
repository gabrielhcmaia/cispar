import { useCallback, useEffect, useState } from 'react';
import {
  atualizarTecnico,
  criarTecnico,
  excluirTecnico,
  listarTecnicos,
} from '../services/tecnicosService';
import type { Tecnico, TecnicoFormData } from '../types/tecnico';

export interface UseTecnicosResult {
  tecnicos: Tecnico[];
  loading: boolean;
  error: string | null;
  addTecnico: (data: TecnicoFormData) => Promise<void>;
  updateTecnico: (id: number, data: TecnicoFormData) => Promise<void>;
  removeTecnico: (id: number) => Promise<void>;
}

function ordenarPorIdDesc(lista: Tecnico[]): Tecnico[] {
  return [...lista].sort((a, b) => b.id - a.id);
}

export function useTecnicos(): UseTecnicosResult {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarTecnicos();
      setTecnicos(ordenarPorIdDesc(data));
    } catch {
      setError('Erro ao carregar técnicos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const addTecnico = useCallback(async (data: TecnicoFormData) => {
    const criado = await criarTecnico(data);
    setTecnicos((prev) => ordenarPorIdDesc([criado, ...prev]));
  }, []);

  const updateTecnico = useCallback(async (id: number, data: TecnicoFormData) => {
    const atualizado = await atualizarTecnico(id, data);
    setTecnicos((prev) => ordenarPorIdDesc(prev.map((item) => (item.id === id ? atualizado : item))));
  }, []);

  const removeTecnico = useCallback(async (id: number) => {
    await excluirTecnico(id);
    setTecnicos((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { tecnicos, loading, error, addTecnico, updateTecnico, removeTecnico };
}
