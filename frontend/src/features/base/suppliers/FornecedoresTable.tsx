import type { ChangeEvent, ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import type { Fornecedor } from '../../../types/fornecedor';

const COLUMN_COUNT = 6;

export interface FornecedoresTableProps {
  fornecedores: Fornecedor[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (fornecedor: Fornecedor) => void;
}

export function FornecedoresTable({
  fornecedores,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
}: FornecedoresTableProps): ReactElement {
  const paginados = fornecedores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.paper' } }}>
              <TableCell>Tipo</TableCell>
              <TableCell>Nome/Razão Social</TableCell>
              <TableCell>CPF/CNPJ</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum fornecedor encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginados.map((fornecedor) => (
                <TableRow key={fornecedor.id} hover>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={fornecedores.length}
        page={page}
        onPageChange={(_event, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    </Paper>
  );
}
