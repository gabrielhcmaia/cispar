import type { ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import type { Usuario } from '../../types/usuario';
import { PERFIL_CHIP, formatUltimoAcesso, statusChip } from './usuariosConstants';

const COLUMN_COUNT = 7;

function getInitials(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) {
    return '?';
  }
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return `${primeira}${ultima}`.toUpperCase();
}

export interface UsuariosTableProps {
  items: Usuario[];
  hasMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
  onEdit: (usuario: Usuario) => void;
}

export function UsuariosTable({ items, hasMore, sentinelRef, onEdit }: UsuariosTableProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.paper' } }}>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Perfil</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Último acesso</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              items.map((usuario) => {
                const perfilStyle = PERFIL_CHIP[usuario.perfil];
                const status = statusChip(usuario.ativo);
                return (
                  <TableRow key={usuario.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            bgcolor: 'primary.main',
                          }}
                        >
                          {getInitials(usuario.nome)}
                        </Avatar>
                        <span>{usuario.nome}</span>
                      </Stack>
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={usuario.perfil}
                        size="small"
                        color={perfilStyle.color}
                        variant={perfilStyle.variant}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>{usuario.cargo}</TableCell>
                    <TableCell>
                      <Chip
                        label={status.label}
                        size="small"
                        color={status.color}
                        variant={status.variant}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>{formatUltimoAcesso(usuario.ultimoAcesso)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`Editar ${usuario.nome}`}
                          onClick={() => onEdit(usuario)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {hasMore ? <div ref={sentinelRef} style={{ height: 1 }} /> : null}
    </Paper>
  );
}
