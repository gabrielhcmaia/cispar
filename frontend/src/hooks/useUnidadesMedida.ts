import { useCallback, useState } from 'react';
import { SEED_UNIDADES } from '../features/base/units/unidadesConstants';
import type { UnidadeMedida, UnidadeMedidaFormData } from '../types/unidadeMedida';

export interface UseUnidadesMedidaResult {
  unidades: UnidadeMedida[];
  addUnidade: (data: UnidadeMedidaFormData) => void;
  updateUnidade: (id: string, data: UnidadeMedidaFormData) => void;
  removeUnidade: (id: string) => void;
}

/**
 * Mantém a lista de unidades de medida em estado de memória (React state),
 * com dados iniciais mockados. Centraliza as operações de CRUD da tela.
 */
export function useUnidadesMedida(): UseUnidadesMedidaResult {
  const [unidades, setUnidades] = useState<UnidadeMedida[]>(SEED_UNIDADES);

  const addUnidade = useCallback((data: UnidadeMedidaFormData): void => {
    setUnidades((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  const updateUnidade = useCallback((id: string, data: UnidadeMedidaFormData): void => {
    setUnidades((prev) =>
      prev.map((unidade) => (unidade.id === id ? { ...unidade, ...data } : unidade))
    );
  }, []);

  const removeUnidade = useCallback((id: string): void => {
    setUnidades((prev) => prev.filter((unidade) => unidade.id !== id));
  }, []);

  return { unidades, addUnidade, updateUnidade, removeUnidade };
}
