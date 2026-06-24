import type { Cidade, Tipo } from '../../../types/fornecedor';

export const TIPO_OPTIONS: Tipo[] = ['PF', 'PJ'];

export const TIPO_LABEL: Record<Tipo, string> = {
  PF: 'Pessoa Física',
  PJ: 'Pessoa Jurídica',
};

export const CIDADE_OPTIONS: Cidade[] = ['Maringá', 'Cianorte', 'Umuarama', 'Paranavaí'];
