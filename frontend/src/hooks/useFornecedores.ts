import { useCallback, useEffect, useState } from 'react';
import {
  atualizarFornecedor,
  criarFornecedor,
  excluirFornecedor,
  listarFornecedores,
} from '../services/fornecedoresService';
import type { Fornecedor, FornecedorFormData } from '../types/fornecedor';

export interface UseFornecedoresResult {
  fornecedores: Fornecedor[];
  loading: boolean;
  error: string | null;
  addFornecedor: (data: FornecedorFormData) => Promise<void>;
  updateFornecedor: (id: number, data: FornecedorFormData) => Promise<void>;
  removeFornecedor: (id: number) => Promise<void>;
}

function ordenarPorIdDesc(lista: Fornecedor[]): Fornecedor[] {
  return [...lista].sort((a, b) => b.id - a.id);
}

export function useFornecedores(): UseFornecedoresResult {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarFornecedores();
      setFornecedores(ordenarPorIdDesc(data));
    } catch {
      setError('Erro ao carregar fornecedores.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const addFornecedor = useCallback(async (data: FornecedorFormData) => {
    const criado = await criarFornecedor(data);
    setFornecedores((prev) => ordenarPorIdDesc([criado, ...prev]));
  }, []);

  const updateFornecedor = useCallback(async (id: number, data: FornecedorFormData) => {
    const atualizado = await atualizarFornecedor(id, data);
    setFornecedores((prev) =>
      ordenarPorIdDesc(prev.map((item) => (item.id === id ? atualizado : item)))
    );
  }, []);

  const removeFornecedor = useCallback(async (id: number) => {
    await excluirFornecedor(id);
    setFornecedores((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { fornecedores, loading, error, addFornecedor, updateFornecedor, removeFornecedor };
}
