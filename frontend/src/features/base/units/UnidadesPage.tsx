import { useMemo, useState, type ReactElement } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

import { FilterBar } from '../../../components/FilterBar';
import { ExportMenu } from '../../../components/ExportMenu';
import { useUnidadesMedida } from '../../../hooks/useUnidadesMedida';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import type { Grandeza, UnidadeMedida, UnidadeMedidaFormData } from '../../../types/unidadeMedida';
import { GRANDEZA_OPTIONS } from './unidadesConstants';
import { UnidadesTable } from './UnidadesTable';
import { UnidadeFormDialog } from './UnidadeFormDialog';

const SELECT_SX: SxProps<Theme> = {
  minWidth: { xs: '100%', md: 200 },
  '& .MuiOutlinedInput-root': { borderRadius: 1.5 },
};

const EXPORT_COLUMNS: ExportColumn<UnidadeMedida>[] = [
  { header: 'Nome', accessor: (unidade) => unidade.nome },
  { header: 'Sigla', accessor: (unidade) => unidade.sigla },
  { header: 'Grandeza', accessor: (unidade) => unidade.grandeza },
];

export default function UnidadesPage(): ReactElement {
  const { unidades, addUnidade, updateUnidade } = useUnidadesMedida();

  const [search, setSearch] = useState('');
  const [filtroGrandeza, setFiltroGrandeza] = useState<Grandeza | ''>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<UnidadeMedida | null>(null);

  const unidadesFiltradas = useMemo(() => {
    const termo = search.trim().toLowerCase();
    return unidades.filter((unidade) => {
      const matchTermo =
        termo === '' ||
        unidade.nome.toLowerCase().includes(termo) ||
        unidade.sigla.toLowerCase().includes(termo);
      const matchGrandeza = filtroGrandeza === '' || unidade.grandeza === filtroGrandeza;
      return matchTermo && matchGrandeza;
    });
  }, [unidades, search, filtroGrandeza]);

  // Qualquer mudança de filtro retorna para a primeira página.
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(0);
  };
  const handleGrandezaChange = (value: Grandeza | ''): void => {
    setFiltroGrandeza(value);
    setPage(0);
  };
  const handleRowsPerPageChange = (value: number): void => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleNova = (): void => {
    setEditing(null);
    setDialogOpen(true);
  };
  const handleEdit = (unidade: UnidadeMedida): void => {
    setEditing(unidade);
    setDialogOpen(true);
  };
  const handleClose = (): void => {
    setDialogOpen(false);
  };
  const handleSubmit = (data: UnidadeMedidaFormData): void => {
    if (editing) {
      updateUnidade(editing.id, data);
    } else {
      addUnidade(data);
    }
    setDialogOpen(false);
  };

  const handleExportCsv = (): void => {
    exportToCsv('unidades-medida', EXPORT_COLUMNS, unidadesFiltradas);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Unidades de Medida', EXPORT_COLUMNS, unidadesFiltradas);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Unidades de Medida
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cadastro e gerenciamento das unidades de medida do sistema.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNova}
          sx={{ textTransform: 'none', borderRadius: 1.5, whiteSpace: 'nowrap' }}
        >
          Nova Unidade
        </Button>
      </Stack>

      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Buscar por nome ou sigla..."
        actions={
          <ExportMenu
            onExportCsv={handleExportCsv}
            onExportPdf={handleExportPdf}
            disabled={unidadesFiltradas.length === 0}
          />
        }
      >
        <TextField
          select
          size="small"
          label="Grandeza"
          value={filtroGrandeza}
          onChange={(event) => handleGrandezaChange(event.target.value as Grandeza | '')}
          sx={SELECT_SX}
        >
          <MenuItem value="">Todas</MenuItem>
          {GRANDEZA_OPTIONS.map((grandeza) => (
            <MenuItem key={grandeza} value={grandeza}>
              {grandeza}
            </MenuItem>
          ))}
        </TextField>
      </FilterBar>

      <UnidadesTable
        unidades={unidadesFiltradas}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
      />

      <UnidadeFormDialog
        open={dialogOpen}
        mode={editing ? 'edit' : 'create'}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
