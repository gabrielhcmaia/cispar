import { useMemo, useState, type ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { FilterBar } from '../../../components/FilterBar';
import { ExportMenu } from '../../../components/ExportMenu';
import { SELECT_MENU_PROPS, SELECT_SX } from '../../../components/selectStyles';
import { useTecnicos } from '../../../hooks/useTecnicos';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import type { Cargo, Funcao, Tecnico, TecnicoFormData } from '../../../types/tecnico';
import { CARGO_OPTIONS, FUNCAO_OPTIONS } from './tecnicosConstants';
import { TecnicosTable } from './TecnicosTable';
import { TecnicoFormDialog } from './TecnicoFormDialog';

const EXPORT_COLUMNS: ExportColumn<Tecnico>[] = [
  { header: 'Nome', accessor: (tecnico) => tecnico.nome },
  { header: 'Cargo', accessor: (tecnico) => tecnico.cargo },
  { header: 'Função', accessor: (tecnico) => tecnico.funcao },
  { header: 'Telefone', accessor: (tecnico) => tecnico.telefone },
  { header: 'E-mail', accessor: (tecnico) => tecnico.email },
];

function scrollToTop(): void {
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function TecnicosPage(): ReactElement {
  const { tecnicos, loading, error, addTecnico, updateTecnico } = useTecnicos();

  const [search, setSearch] = useState('');
  const [filtroCargo, setFiltroCargo] = useState<Cargo | ''>('');
  const [filtroFuncao, setFiltroFuncao] = useState<Funcao | ''>('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
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

  const { visibleCount, sentinelRef, reset } = useInfiniteScroll(tecnicosFiltrados.length);

  const resetListagem = (): void => {
    setSelectedIds(new Set());
    reset();
  };
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    resetListagem();
  };
  const handleCargoChange = (value: Cargo | ''): void => {
    setFiltroCargo(value);
    resetListagem();
  };
  const handleFuncaoChange = (value: Funcao | ''): void => {
    setFiltroFuncao(value);
    resetListagem();
  };

  const itensVisiveis = tecnicosFiltrados.slice(0, visibleCount);
  const hasMore = visibleCount < tecnicosFiltrados.length;
  const allSelected =
    tecnicosFiltrados.length > 0 && tecnicosFiltrados.every((item) => selectedIds.has(item.id));
  const someSelected = tecnicosFiltrados.some((item) => selectedIds.has(item.id));

  const handleToggle = (id: number): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const handleToggleAll = (): void => {
    setSelectedIds((prev) => {
      if (tecnicosFiltrados.every((item) => prev.has(item.id))) {
        return new Set();
      }
      return new Set(tecnicosFiltrados.map((item) => item.id));
    });
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
  const handleSubmit = async (data: TecnicoFormData): Promise<void> => {
    try {
      if (editing) {
        await updateTecnico(editing.id, data);
      } else {
        await addTecnico(data);
      }
      setDialogOpen(false);
    } catch {
      setDialogOpen(true);
    }
  };

  const selecionados = useMemo(
    () => tecnicosFiltrados.filter((item) => selectedIds.has(item.id)),
    [tecnicosFiltrados, selectedIds]
  );
  const handleExportCsv = (): void => {
    exportToCsv('tecnicos', EXPORT_COLUMNS, selecionados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Técnicos', EXPORT_COLUMNS, selecionados);
  };

  return (
    <Box sx={{ pb: 8 }}>
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
            disabled={selectedIds.size === 0}
          />
        }
      >
        <TextField
          select
          size="small"
          label="Cargo"
          value={filtroCargo}
          onChange={(event) => handleCargoChange(event.target.value as Cargo | '')}
          sx={[{ minWidth: { xs: '100%', md: 190 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
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
          sx={[{ minWidth: { xs: '100%', md: 190 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {FUNCAO_OPTIONS.map((funcao) => (
            <MenuItem key={funcao} value={funcao}>
              {funcao}
            </MenuItem>
          ))}
        </TextField>
      </FilterBar>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TecnicosTable
          items={itensVisiveis}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
          selectedIds={selectedIds}
          allSelected={allSelected}
          someSelected={someSelected}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          onEdit={handleEdit}
        />
      )}

      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Exibindo {Math.min(visibleCount, tecnicosFiltrados.length)} de {tecnicosFiltrados.length}
        </Typography>
        <Tooltip title="Voltar ao topo">
          <IconButton size="small" color="primary" onClick={scrollToTop}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

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
