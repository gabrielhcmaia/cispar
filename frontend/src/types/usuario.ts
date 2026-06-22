export type Perfil = 'Operador' | 'Administrador' | 'Visualizador';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  cargo: string;
  ativo: boolean;
  ultimoAcesso: string | null;
}

export interface UsuarioFormData {
  nome: string;
  email: string;
  senha?: string;
  perfil: Perfil;
  cargo: string;
  ativo: boolean;
}
