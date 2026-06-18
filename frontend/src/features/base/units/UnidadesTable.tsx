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
import type { UnidadeMedida } from '../../../types/unidadeMedida';

const COLUMN_COUNT = 5;

export interface UnidadesTableProps {
  items: UnidadeMedida[];
  hasMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  onEdit: (unidade: UnidadeMedida) => void;
}

export function UnidadesTable({
  items,
  hasMore,
  sentinelRef,
  selectedIds,
  allSelected,
  someSelected,
  onToggle,
  onToggleAll,
  onEdit,
}: UnidadesTableProps): ReactElement {
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
              <TableCell>Sigla</TableCell>
              <TableCell>Grandeza</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhuma unidade encontrada.
                </TableCell>
              </TableRow>
            ) : (
              items.map((unidade) => {
                const selecionado = selectedIds.has(unidade.id);
                return (
                  <TableRow key={unidade.id} hover selected={selecionado}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selecionado}
                        onChange={() => onToggle(unidade.id)}
                        inputProps={{ 'aria-label': `Selecionar ${unidade.nome}` }}
                      />
                    </TableCell>
                    <TableCell>{unidade.nome}</TableCell>
                    <TableCell>{unidade.sigla}</TableCell>
                    <TableCell>{unidade.grandeza}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`Editar ${unidade.nome}`}
                          onClick={() => onEdit(unidade)}
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
