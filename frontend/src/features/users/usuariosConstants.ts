import type { ChipProps } from '@mui/material/Chip';
import type { Perfil } from '../../types/usuario';

export const PERFIL_OPTIONS: Perfil[] = ['Operador', 'Administrador', 'Visualizador'];

interface ChipStyle {
  color: ChipProps['color'];
  variant: ChipProps['variant'];
}

export const PERFIL_CHIP: Record<Perfil, ChipStyle> = {
  Administrador: { color: 'primary', variant: 'filled' },
  Operador: { color: 'secondary', variant: 'outlined' },
  Visualizador: { color: 'default', variant: 'outlined' },
};

export function statusChip(ativo: boolean): ChipStyle & { label: string } {
  return ativo
    ? { color: 'success', variant: 'filled', label: 'Ativo' }
    : { color: 'default', variant: 'outlined', label: 'Inativo' };
}

export function formatUltimoAcesso(value: string | null): string {
  if (!value) {
    return '—';
  }
  return value.slice(0, 16).replace('T', ' ');
}
