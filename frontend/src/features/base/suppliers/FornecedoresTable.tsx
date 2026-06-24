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
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import type { Fornecedor } from '../../../types/fornecedor';

const COLUMN_COUNT = 7;

export interface FornecedoresTableProps {
  items: Fornecedor[];
  hasMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  onEdit: (fornecedor: Fornecedor) => void;
}

export function FornecedoresTable({
  items,
  hasMore,
  sentinelRef,
  selectedIds,
  allSelected,
  someSelected,
  onToggle,
  onToggleAll,
  onEdit,
}: FornecedoresTableProps): ReactElement {
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
              <TableCell>Tipo</TableCell>
              <TableCell>Nome/Razão Social</TableCell>
              <TableCell>CPF/CNPJ</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum fornecedor encontrado.
                </TableCell>
              </TableRow>
            ) : (
              items.map((fornecedor) => {
                const selecionado = selectedIds.has(fornecedor.id);
                return (
                  <TableRow key={fornecedor.id} hover selected={selecionado}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selecionado}
                        onChange={() => onToggle(fornecedor.id)}
                        inputProps={{ 'aria-label': `Selecionar ${fornecedor.nome}` }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={fornecedor.tipo}
                        size="small"
                        color={fornecedor.tipo === 'PJ' ? 'primary' : 'secondary'}
                        variant={fornecedor.tipo === 'PJ' ? 'filled' : 'outlined'}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>{fornecedor.nome}</TableCell>
                    <TableCell>{fornecedor.documento}</TableCell>
                    <TableCell>{fornecedor.telefone}</TableCell>
                    <TableCell>{fornecedor.cidade}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`Editar ${fornecedor.nome}`}
                          onClick={() => onEdit(fornecedor)}
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
