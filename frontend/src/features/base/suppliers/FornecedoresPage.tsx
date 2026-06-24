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
import { useFornecedores } from '../../../hooks/useFornecedores';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import { onlyDigits } from '../../../utils/masks';
import type { Cidade, Fornecedor, FornecedorFormData, Tipo } from '../../../types/fornecedor';
import { CIDADE_OPTIONS, TIPO_LABEL, TIPO_OPTIONS } from './fornecedoresConstants';
import { FornecedoresTable } from './FornecedoresTable';
import { FornecedorFormDialog } from './FornecedorFormDialog';

const EXPORT_COLUMNS: ExportColumn<Fornecedor>[] = [
  { header: 'Tipo', accessor: (fornecedor) => fornecedor.tipo },
  { header: 'Nome/Razão Social', accessor: (fornecedor) => fornecedor.nome },
  { header: 'CPF/CNPJ', accessor: (fornecedor) => fornecedor.documento },
  { header: 'Telefone', accessor: (fornecedor) => fornecedor.telefone },
  { header: 'Cidade', accessor: (fornecedor) => fornecedor.cidade },
];

function scrollToTop(): void {
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function FornecedoresPage(): ReactElement {
  const { fornecedores, loading, error, addFornecedor, updateFornecedor } = useFornecedores();

  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<Tipo | ''>('');
  const [filtroCidade, setFiltroCidade] = useState<Cidade | ''>('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Fornecedor | null>(null);

  const fornecedoresFiltrados = useMemo(() => {
    const termo = search.trim().toLowerCase();
    const termoDigitos = onlyDigits(search);
    return fornecedores.filter((fornecedor) => {
      const matchTermo =
        termo === '' ||
        fornecedor.nome.toLowerCase().includes(termo) ||
        fornecedor.documento.toLowerCase().includes(termo) ||
        (termoDigitos !== '' && onlyDigits(fornecedor.documento).includes(termoDigitos));
      const matchTipo = filtroTipo === '' || fornecedor.tipo === filtroTipo;
      const matchCidade = filtroCidade === '' || fornecedor.cidade === filtroCidade;
      return matchTermo && matchTipo && matchCidade;
    });
  }, [fornecedores, search, filtroTipo, filtroCidade]);

  const { visibleCount, sentinelRef, reset } = useInfiniteScroll(fornecedoresFiltrados.length);

  const resetListagem = (): void => {
    setSelectedIds(new Set());
    reset();
  };
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    resetListagem();
  };
  const handleTipoChange = (value: Tipo | ''): void => {
    setFiltroTipo(value);
    resetListagem();
  };
  const handleCidadeChange = (value: Cidade | ''): void => {
    setFiltroCidade(value);
    resetListagem();
  };

  const itensVisiveis = fornecedoresFiltrados.slice(0, visibleCount);
  const hasMore = visibleCount < fornecedoresFiltrados.length;
  const allSelected =
    fornecedoresFiltrados.length > 0 &&
    fornecedoresFiltrados.every((item) => selectedIds.has(item.id));
  const someSelected = fornecedoresFiltrados.some((item) => selectedIds.has(item.id));

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
      if (fornecedoresFiltrados.every((item) => prev.has(item.id))) {
        return new Set();
      }
      return new Set(fornecedoresFiltrados.map((item) => item.id));
    });
  };

  const handleNovo = (): void => {
    setEditing(null);
    setDialogOpen(true);
  };
  const handleEdit = (fornecedor: Fornecedor): void => {
    setEditing(fornecedor);
    setDialogOpen(true);
  };
  const handleClose = (): void => {
    setDialogOpen(false);
  };
  const handleSubmit = async (data: FornecedorFormData): Promise<void> => {
    try {
      if (editing) {
        await updateFornecedor(editing.id, data);
      } else {
        await addFornecedor(data);
      }
      setDialogOpen(false);
    } catch {
      setDialogOpen(true);
    }
  };

  const selecionados = useMemo(
    () => fornecedoresFiltrados.filter((item) => selectedIds.has(item.id)),
    [fornecedoresFiltrados, selectedIds]
  );
  const handleExportCsv = (): void => {
    exportToCsv('fornecedores', EXPORT_COLUMNS, selecionados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Fornecedores', EXPORT_COLUMNS, selecionados);
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
            Fornecedores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cadastro e gerenciamento dos fornecedores do sistema.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNovo}
          sx={{ textTransform: 'none', borderRadius: 1.5, whiteSpace: 'nowrap' }}
        >
          Novo Fornecedor
        </Button>
      </Stack>

      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Buscar por nome ou documento..."
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
          label="Tipo"
          value={filtroTipo}
          onChange={(event) => handleTipoChange(event.target.value as Tipo | '')}
          sx={[{ minWidth: { xs: '100%', md: 180 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todos</MenuItem>
          {TIPO_OPTIONS.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {`${tipo} — ${TIPO_LABEL[tipo]}`}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Cidade"
          value={filtroCidade}
          onChange={(event) => handleCidadeChange(event.target.value as Cidade | '')}
          sx={[{ minWidth: { xs: '100%', md: 180 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {CIDADE_OPTIONS.map((cidade) => (
            <MenuItem key={cidade} value={cidade}>
              {cidade}
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
        <FornecedoresTable
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
          Exibindo {Math.min(visibleCount, fornecedoresFiltrados.length)} de{' '}
          {fornecedoresFiltrados.length}
        </Typography>
        <Tooltip title="Voltar ao topo">
          <IconButton size="small" color="primary" onClick={scrollToTop}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

      <FornecedorFormDialog
        open={dialogOpen}
        mode={editing ? 'edit' : 'create'}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
