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
import { useUnidadesMedida } from '../../../hooks/useUnidadesMedida';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import type { Grandeza, UnidadeMedida, UnidadeMedidaFormData } from '../../../types/unidadeMedida';
import { GRANDEZA_OPTIONS } from './unidadesConstants';
import { UnidadesTable } from './UnidadesTable';
import { UnidadeFormDialog } from './UnidadeFormDialog';

const EXPORT_COLUMNS: ExportColumn<UnidadeMedida>[] = [
  { header: 'Nome', accessor: (unidade) => unidade.nome },
  { header: 'Sigla', accessor: (unidade) => unidade.sigla },
  { header: 'Grandeza', accessor: (unidade) => unidade.grandeza },
];

function scrollToTop(): void {
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function UnidadesPage(): ReactElement {
  const { unidades, loading, error, addUnidade, updateUnidade } = useUnidadesMedida();

  const [search, setSearch] = useState('');
  const [filtroGrandeza, setFiltroGrandeza] = useState<Grandeza | ''>('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
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

  const { visibleCount, sentinelRef, reset } = useInfiniteScroll(unidadesFiltradas.length);

  const resetListagem = (): void => {
    setSelectedIds(new Set());
    reset();
  };
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    resetListagem();
  };
  const handleGrandezaChange = (value: Grandeza | ''): void => {
    setFiltroGrandeza(value);
    resetListagem();
  };

  const itensVisiveis = unidadesFiltradas.slice(0, visibleCount);
  const hasMore = visibleCount < unidadesFiltradas.length;
  const allSelected =
    unidadesFiltradas.length > 0 && unidadesFiltradas.every((item) => selectedIds.has(item.id));
  const someSelected = unidadesFiltradas.some((item) => selectedIds.has(item.id));

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
      if (unidadesFiltradas.every((item) => prev.has(item.id))) {
        return new Set();
      }
      return new Set(unidadesFiltradas.map((item) => item.id));
    });
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
  const handleSubmit = async (data: UnidadeMedidaFormData): Promise<void> => {
    try {
      if (editing) {
        await updateUnidade(editing.id, data);
      } else {
        await addUnidade(data);
      }
      setDialogOpen(false);
    } catch {
      setDialogOpen(true);
    }
  };

  const selecionados = useMemo(
    () => unidadesFiltradas.filter((item) => selectedIds.has(item.id)),
    [unidadesFiltradas, selectedIds]
  );
  const handleExportCsv = (): void => {
    exportToCsv('unidades-medida', EXPORT_COLUMNS, selecionados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Unidades de Medida', EXPORT_COLUMNS, selecionados);
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
            disabled={selectedIds.size === 0}
          />
        }
      >
        <TextField
          select
          size="small"
          label="Grandeza"
          value={filtroGrandeza}
          onChange={(event) => handleGrandezaChange(event.target.value as Grandeza | '')}
          sx={[{ minWidth: { xs: '100%', md: 200 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {GRANDEZA_OPTIONS.map((grandeza) => (
            <MenuItem key={grandeza} value={grandeza}>
              {grandeza}
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
        <UnidadesTable
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
          Exibindo {Math.min(visibleCount, unidadesFiltradas.length)} de {unidadesFiltradas.length}
        </Typography>
        <Tooltip title="Voltar ao topo">
          <IconButton size="small" color="primary" onClick={scrollToTop}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

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
