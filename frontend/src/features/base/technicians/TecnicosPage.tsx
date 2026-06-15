import { useMemo, useState, type ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

import { FilterBar } from '../../../components/FilterBar';
import { ExportMenu } from '../../../components/ExportMenu';
import { useTecnicos } from '../../../hooks/useTecnicos';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import type { Cargo, Funcao, Tecnico, TecnicoFormData } from '../../../types/tecnico';
import { CARGO_OPTIONS, FUNCAO_OPTIONS } from './tecnicosConstants';
import { TecnicosTable } from './TecnicosTable';
import { TecnicoFormDialog } from './TecnicoFormDialog';

const SELECT_SX = {
  minWidth: { xs: '100%', md: 190 },
  '& .MuiOutlinedInput-root': { borderRadius: 1.5 },
} as const;

const EXPORT_COLUMNS: ExportColumn<Tecnico>[] = [
  { header: 'Nome', accessor: (tecnico) => tecnico.nome },
  { header: 'Cargo', accessor: (tecnico) => tecnico.cargo },
  { header: 'Função', accessor: (tecnico) => tecnico.funcao },
  { header: 'Telefone', accessor: (tecnico) => tecnico.telefone },
  { header: 'E-mail', accessor: (tecnico) => tecnico.email },
];

export default function TecnicosPage(): ReactElement {
  const { tecnicos, addTecnico, updateTecnico } = useTecnicos();

  const [search, setSearch] = useState('');
  const [filtroCargo, setFiltroCargo] = useState<Cargo | ''>('');
  const [filtroFuncao, setFiltroFuncao] = useState<Funcao | ''>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Tecnico | null>(null);

  const tecnicosFiltrados = useMemo(() => {
    const termo = search.trim().toLowerCase();
    return tecnicos.filter((tecnico) => {
      const matchTermo =
        termo === '' ||
        tecnico.nome.toLowerCase().includes(termo) ||
        tecnico.email.toLowerCase().includes(termo);
      const matchCargo = filtroCargo === '' || tecnico.cargo === filtroCargo;
      const matchFuncao = filtroFuncao === '' || tecnico.funcao === filtroFuncao;
      return matchTermo && matchCargo && matchFuncao;
    });
  }, [tecnicos, search, filtroCargo, filtroFuncao]);

  // Qualquer mudança de filtro retorna para a primeira página.
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(0);
  };
  const handleCargoChange = (value: Cargo | ''): void => {
    setFiltroCargo(value);
    setPage(0);
  };
  const handleFuncaoChange = (value: Funcao | ''): void => {
    setFiltroFuncao(value);
    setPage(0);
  };
  const handleRowsPerPageChange = (value: number): void => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleNovo = (): void => {
    setEditing(null);
    setDialogOpen(true);
  };
  const handleEdit = (tecnico: Tecnico): void => {
    setEditing(tecnico);
    setDialogOpen(true);
  };
  const handleClose = (): void => {
    setDialogOpen(false);
  };
  const handleSubmit = (data: TecnicoFormData): void => {
    if (editing) {
      updateTecnico(editing.id, data);
    } else {
      addTecnico(data);
    }
    setDialogOpen(false);
  };

  const handleExportCsv = (): void => {
    exportToCsv('tecnicos', EXPORT_COLUMNS, tecnicosFiltrados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Técnicos', EXPORT_COLUMNS, tecnicosFiltrados);
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
            Técnicos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cadastro e gerenciamento dos técnicos do sistema.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNovo}
          sx={{ textTransform: 'none', borderRadius: 1.5, whiteSpace: 'nowrap' }}
        >
          Novo Técnico
        </Button>
      </Stack>

      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Buscar por nome ou e-mail..."
        actions={
          <ExportMenu
            onExportCsv={handleExportCsv}
            onExportPdf={handleExportPdf}
            disabled={tecnicosFiltrados.length === 0}
          />
        }
      >
        <TextField
          select
          size="small"
          label="Cargo"
          value={filtroCargo}
          onChange={(event) => handleCargoChange(event.target.value as Cargo | '')}
          sx={SELECT_SX}
        >
          <MenuItem value="">Todos</MenuItem>
          {CARGO_OPTIONS.map((cargo) => (
            <MenuItem key={cargo} value={cargo}>
              {cargo}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Funções"
          value={filtroFuncao}
          onChange={(event) => handleFuncaoChange(event.target.value as Funcao | '')}
          sx={SELECT_SX}
        >
          <MenuItem value="">Todas</MenuItem>
          {FUNCAO_OPTIONS.map((funcao) => (
            <MenuItem key={funcao} value={funcao}>
              {funcao}
            </MenuItem>
          ))}
        </TextField>
      </FilterBar>

      <TecnicosTable
        tecnicos={tecnicosFiltrados}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
      />

      <TecnicoFormDialog
        open={dialogOpen}
        mode={editing ? 'edit' : 'create'}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
