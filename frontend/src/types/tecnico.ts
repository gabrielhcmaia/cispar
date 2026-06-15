export type Cargo =
  | 'Técnico Júnior'
  | 'Técnico Pleno'
  | 'Técnico Sênior'
  | 'Encarregado'
  | 'Supervisor';

export type Funcao =
  | 'Manutenção Elétrica'
  | 'Hidráulica'
  | 'Operação'
  | 'Instalação'
  | 'Inspeção';

export interface Tecnico {
  id: string;
  nome: string;
  cargo: Cargo;
  funcao: Funcao;
  telefone: string;
  email: string;
}

/** Dados manipulados no formulário de criação/edição (sem o id, gerado pelo sistema). */
export type TecnicoFormData = Omit<Tecnico, 'id'>;
