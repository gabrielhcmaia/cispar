export type Grandeza =
  | 'Comprimento'
  | 'Vazão'
  | 'Potência'
  | 'Tensão'
  | 'Pressão'
  | 'Tempo';

export interface UnidadeMedida {
  id: string;
  nome: string;
  sigla: string;
  grandeza: Grandeza;
}

/** Dados manipulados no formulário de criação/edição (sem o id, gerado pelo sistema). */
export type UnidadeMedidaFormData = Omit<UnidadeMedida, 'id'>;
