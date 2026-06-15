import type { Cargo, Funcao, Tecnico } from '../../../types/tecnico';

/** Opções de Cargo — fonte única usada nos filtros e no formulário. */
export const CARGO_OPTIONS: Cargo[] = [
  'Técnico Júnior',
  'Técnico Pleno',
  'Técnico Sênior',
  'Encarregado',
  'Supervisor',
];

/** Opções de Função — fonte única usada nos filtros e no formulário. */
export const FUNCAO_OPTIONS: Funcao[] = [
  'Manutenção Elétrica',
  'Hidráulica',
  'Operação',
  'Instalação',
  'Inspeção',
];

/** Dados iniciais mockados mantidos em memória (React state). */
export const SEED_TECNICOS: Tecnico[] = [
  {
    id: '1',
    nome: 'Ana Beatriz Moraes',
    cargo: 'Técnico Sênior',
    funcao: 'Manutenção Elétrica',
    telefone: '(44) 99812-3344',
    email: 'ana.moraes@cispar.pr.gov.br',
  },
  {
    id: '2',
    nome: 'Carlos Eduardo Lima',
    cargo: 'Encarregado',
    funcao: 'Hidráulica',
    telefone: '(44) 99745-1122',
    email: 'carlos.lima@cispar.pr.gov.br',
  },
  {
    id: '3',
    nome: 'Fernanda Souza Ribeiro',
    cargo: 'Técnico Pleno',
    funcao: 'Operação',
    telefone: '(44) 99633-7788',
    email: 'fernanda.ribeiro@cispar.pr.gov.br',
  },
  {
    id: '4',
    nome: 'João Vitor Almeida',
    cargo: 'Técnico Júnior',
    funcao: 'Instalação',
    telefone: '(44) 99521-9090',
    email: 'joao.almeida@cispar.pr.gov.br',
  },
  {
    id: '5',
    nome: 'Mariana Castro Nunes',
    cargo: 'Supervisor',
    funcao: 'Inspeção',
    telefone: '(44) 99410-5566',
    email: 'mariana.nunes@cispar.pr.gov.br',
  },
  {
    id: '6',
    nome: 'Rafael Teixeira Gomes',
    cargo: 'Técnico Pleno',
    funcao: 'Manutenção Elétrica',
    telefone: '(44) 99388-4321',
    email: 'rafael.gomes@cispar.pr.gov.br',
  },
];
