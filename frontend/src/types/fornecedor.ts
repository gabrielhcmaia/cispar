export type Tipo = 'PF' | 'PJ';

export type Cidade = 'Maringá' | 'Cianorte' | 'Umuarama' | 'Paranavaí';

export interface Fornecedor {
  id: number;
  tipo: Tipo;
  nome: string;
  documento: string;
  telefone: string;
  cidade: Cidade;
}

export type FornecedorFormData = Omit<Fornecedor, 'id'>;
