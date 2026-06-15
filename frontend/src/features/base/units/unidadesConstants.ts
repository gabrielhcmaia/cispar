import type { Grandeza, UnidadeMedida } from '../../../types/unidadeMedida';

/** Opções de Grandeza — fonte única usada no filtro e no formulário. */
export const GRANDEZA_OPTIONS: Grandeza[] = [
  'Comprimento',
  'Vazão',
  'Potência',
  'Tensão',
  'Pressão',
  'Tempo',
];

/** Dados iniciais mockados mantidos em memória (React state). */
export const SEED_UNIDADES: UnidadeMedida[] = [
  { id: '1', nome: 'Metro', sigla: 'm', grandeza: 'Comprimento' },
  { id: '2', nome: 'Centímetro', sigla: 'cm', grandeza: 'Comprimento' },
  { id: '3', nome: 'Metro cúbico por hora', sigla: 'm³/h', grandeza: 'Vazão' },
  { id: '4', nome: 'Litro por segundo', sigla: 'L/s', grandeza: 'Vazão' },
  { id: '5', nome: 'Quilowatt', sigla: 'kW', grandeza: 'Potência' },
  { id: '6', nome: 'Volt', sigla: 'V', grandeza: 'Tensão' },
  { id: '7', nome: 'Bar', sigla: 'bar', grandeza: 'Pressão' },
  { id: '8', nome: 'Hora', sigla: 'h', grandeza: 'Tempo' },
];
