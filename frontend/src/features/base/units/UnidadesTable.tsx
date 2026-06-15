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
import EditIcon from '@mui/icons-material/Edit';
import type { UnidadeMedida } from '../../../types/unidadeMedida';

const COLUMN_COUNT = 4;

export interface UnidadesTableProps {
  unidades: UnidadeMedida[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (unidade: UnidadeMedida) => void;
}

export function UnidadesTable({
  unidades,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
}: UnidadesTableProps): ReactElement {
  const paginadas = unidades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
              <TableCell>Nome</TableCell>
              <TableCell>Sigla</TableCell>
              <TableCell>Grandeza</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhuma unidade encontrada.
                </TableCell>
              </TableRow>
            ) : (
              paginadas.map((unidade) => (
                <TableRow key={unidade.id} hover>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={unidades.length}
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
