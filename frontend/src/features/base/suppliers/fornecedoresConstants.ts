import type { Cidade, Fornecedor, Tipo } from '../../../types/fornecedor';

/** Opções de Tipo — fonte única usada no filtro e no formulário. */
export const TIPO_OPTIONS: Tipo[] = ['PF', 'PJ'];

/** Rótulos longos do Tipo (usados nos selects; o badge mostra o código curto). */
export const TIPO_LABEL: Record<Tipo, string> = {
  PF: 'Pessoa Física',
  PJ: 'Pessoa Jurídica',
};

/** Opções de Cidade — fonte única usada no filtro e no formulário. */
export const CIDADE_OPTIONS: Cidade[] = ['Maringá', 'Cianorte', 'Umuarama', 'Paranavaí'];

/** Dados iniciais mockados (React state). Documentos com dígitos verificadores válidos. */
export const SEED_FORNECEDORES: Fornecedor[] = [
  {
    id: '1',
    tipo: 'PJ',
    nome: 'Saneamento Norte LTDA',
    documento: '11.222.333/0001-81',
    telefone: '(44) 3221-1010',
    cidade: 'Maringá',
  },
  {
    id: '2',
    tipo: 'PF',
    nome: 'José Carlos Pereira',
    documento: '111.444.777-35',
    telefone: '(44) 99812-3344',
    cidade: 'Cianorte',
  },
  {
    id: '3',
    tipo: 'PJ',
    nome: 'Hidromax Equipamentos LTDA',
    documento: '11.444.777/0001-61',
    telefone: '(44) 3025-7788',
    cidade: 'Umuarama',
  },
  {
    id: '4',
    tipo: 'PF',
    nome: 'Marcos Antônio Silva',
    documento: '529.982.247-25',
    telefone: '(44) 99745-1122',
    cidade: 'Paranavaí',
  },
  {
    id: '5',
    tipo: 'PF',
    nome: 'Luciana Ferreira Souza',
    documento: '123.456.789-09',
    telefone: '(44) 99633-7788',
    cidade: 'Maringá',
  },
  {
    id: '6',
    tipo: 'PJ',
    nome: 'Construtora Águas Claras LTDA',
    documento: '12.345.678/0001-95',
    telefone: '(44) 3263-4500',
    cidade: 'Cianorte',
  },
];
