import { useCallback, useState } from 'react';
import { SEED_TECNICOS } from '../features/base/technicians/tecnicosConstants';
import type { Tecnico, TecnicoFormData } from '../types/tecnico';

export interface UseTecnicosResult {
  tecnicos: Tecnico[];
  addTecnico: (data: TecnicoFormData) => void;
  updateTecnico: (id: string, data: TecnicoFormData) => void;
  removeTecnico: (id: string) => void;
}

/**
 * Mantém a lista de técnicos em estado de memória (React state), com dados
 * iniciais mockados. Centraliza as operações de CRUD da tela.
 */
export function useTecnicos(): UseTecnicosResult {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>(SEED_TECNICOS);

  const addTecnico = useCallback((data: TecnicoFormData): void => {
    setTecnicos((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  const updateTecnico = useCallback((id: string, data: TecnicoFormData): void => {
    setTecnicos((prev) =>
      prev.map((tecnico) => (tecnico.id === id ? { ...tecnico, ...data } : tecnico))
    );
  }, []);

  const removeTecnico = useCallback((id: string): void => {
    setTecnicos((prev) => prev.filter((tecnico) => tecnico.id !== id));
  }, []);

  return { tecnicos, addTecnico, updateTecnico, removeTecnico };
}
