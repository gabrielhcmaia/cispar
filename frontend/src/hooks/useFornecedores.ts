import { useCallback, useState } from 'react';
import { SEED_FORNECEDORES } from '../features/base/suppliers/fornecedoresConstants';
import type { Fornecedor, FornecedorFormData } from '../types/fornecedor';

export interface UseFornecedoresResult {
  fornecedores: Fornecedor[];
  addFornecedor: (data: FornecedorFormData) => void;
  updateFornecedor: (id: string, data: FornecedorFormData) => void;
  removeFornecedor: (id: string) => void;
}

/**
 * Mantém a lista de fornecedores em estado de memória (React state), com dados
 * iniciais mockados. Centraliza as operações de CRUD da tela.
 */
export function useFornecedores(): UseFornecedoresResult {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(SEED_FORNECEDORES);

  const addFornecedor = useCallback((data: FornecedorFormData): void => {
    setFornecedores((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  const updateFornecedor = useCallback((id: string, data: FornecedorFormData): void => {
    setFornecedores((prev) =>
      prev.map((fornecedor) => (fornecedor.id === id ? { ...fornecedor, ...data } : fornecedor))
    );
  }, []);

  const removeFornecedor = useCallback((id: string): void => {
    setFornecedores((prev) => prev.filter((fornecedor) => fornecedor.id !== id));
  }, []);

  return { fornecedores, addFornecedor, updateFornecedor, removeFornecedor };
}
