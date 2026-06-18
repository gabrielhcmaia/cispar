export type Grandeza =
  | 'Comprimento'
  | 'Vazão'
  | 'Potência'
  | 'Tensão'
  | 'Pressão'
  | 'Tempo';

export interface UnidadeMedida {
  id: number;
  nome: string;
  sigla: string;
  grandeza: Grandeza;
}

export type UnidadeMedidaFormData = Omit<UnidadeMedida, 'id'>;
