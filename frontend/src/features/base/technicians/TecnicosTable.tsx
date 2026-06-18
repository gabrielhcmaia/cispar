import type { ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import type { Tecnico } from '../../../types/tecnico';

const COLUMN_COUNT = 7;

export interface TecnicosTableProps {
  items: Tecnico[];
  hasMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  onEdit: (tecnico: Tecnico) => void;
}

export function TecnicosTable({
  items,
  hasMore,
  sentinelRef,
  selectedIds,
  allSelected,
  someSelected,
  onToggle,
  onToggleAll,
  onEdit,
}: TecnicosTableProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.paper' } }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={onToggleAll}
                  inputProps={{ 'aria-label': 'Selecionar todos' }}
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Função</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum técnico encontrado.
                </TableCell>
              </TableRow>
            ) : (
              items.map((tecnico) => {
                const selecionado = selectedIds.has(tecnico.id);
                return (
                  <TableRow key={tecnico.id} hover selected={selecionado}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selecionado}
                        onChange={() => onToggle(tecnico.id)}
                        inputProps={{ 'aria-label': `Selecionar ${tecnico.nome}` }}
                      />
                    </TableCell>
                    <TableCell>{tecnico.nome}</TableCell>
                    <TableCell>{tecnico.cargo}</TableCell>
                    <TableCell>{tecnico.funcao}</TableCell>
                    <TableCell>{tecnico.telefone}</TableCell>
                    <TableCell>{tecnico.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`Editar ${tecnico.nome}`}
                          onClick={() => onEdit(tecnico)}
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
