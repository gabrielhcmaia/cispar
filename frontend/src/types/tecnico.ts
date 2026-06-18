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
  id: number;
  nome: string;
  cargo: Cargo;
  funcao: Funcao;
  telefone: string;
  email: string;
}

export type TecnicoFormData = Omit<Tecnico, 'id'>;
