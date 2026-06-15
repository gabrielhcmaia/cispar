export type Tipo = 'PF' | 'PJ';

export type Cidade = 'Maringá' | 'Cianorte' | 'Umuarama' | 'Paranavaí';

export interface Fornecedor {
  id: string;
  tipo: Tipo;
  nome: string;
  documento: string;
  telefone: string;
  cidade: Cidade;
}

/** Dados manipulados no formulário de criação/edição (sem o id, gerado pelo sistema). */
export type FornecedorFormData = Omit<Fornecedor, 'id'>;
