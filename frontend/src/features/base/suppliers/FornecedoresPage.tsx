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
import { useFornecedores } from '../../../hooks/useFornecedores';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../../utils/exporters';
import { onlyDigits } from '../../../utils/masks';
import type { Cidade, Fornecedor, FornecedorFormData, Tipo } from '../../../types/fornecedor';
import { CIDADE_OPTIONS, TIPO_LABEL, TIPO_OPTIONS } from './fornecedoresConstants';
import { FornecedoresTable } from './FornecedoresTable';
import { FornecedorFormDialog } from './FornecedorFormDialog';

const SELECT_SX: SxProps<Theme> = {
  minWidth: { xs: '100%', md: 180 },
  '& .MuiOutlinedInput-root': { borderRadius: 1.5 },
};

const EXPORT_COLUMNS: ExportColumn<Fornecedor>[] = [
  { header: 'Tipo', accessor: (fornecedor) => fornecedor.tipo },
  { header: 'Nome/Razão Social', accessor: (fornecedor) => fornecedor.nome },
  { header: 'CPF/CNPJ', accessor: (fornecedor) => fornecedor.documento },
  { header: 'Telefone', accessor: (fornecedor) => fornecedor.telefone },
  { header: 'Cidade', accessor: (fornecedor) => fornecedor.cidade },
];

export default function FornecedoresPage(): ReactElement {
  const { fornecedores, addFornecedor, updateFornecedor } = useFornecedores();

  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<Tipo | ''>('');
  const [filtroCidade, setFiltroCidade] = useState<Cidade | ''>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Fornecedor | null>(null);

  const fornecedoresFiltrados = useMemo(() => {
    const termo = search.trim().toLowerCase();
    const termoDigits = onlyDigits(search);
    return fornecedores.filter((fornecedor) => {
      const matchTermo =
        termo === '' ||
        fornecedor.nome.toLowerCase().includes(termo) ||
        fornecedor.documento.toLowerCase().includes(termo) ||
        (termoDigits !== '' && onlyDigits(fornecedor.documento).includes(termoDigits));
      const matchTipo = filtroTipo === '' || fornecedor.tipo === filtroTipo;
      const matchCidade = filtroCidade === '' || fornecedor.cidade === filtroCidade;
      return matchTermo && matchTipo && matchCidade;
    });
  }, [fornecedores, search, filtroTipo, filtroCidade]);

  // Qualquer mudança de filtro retorna para a primeira página.
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(0);
  };
  const handleTipoChange = (value: Tipo | ''): void => {
    setFiltroTipo(value);
    setPage(0);
  };
  const handleCidadeChange = (value: Cidade | ''): void => {
    setFiltroCidade(value);
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
  const handleEdit = (fornecedor: Fornecedor): void => {
    setEditing(fornecedor);
    setDialogOpen(true);
  };
  const handleClose = (): void => {
    setDialogOpen(false);
  };
  const handleSubmit = (data: FornecedorFormData): void => {
    if (editing) {
      updateFornecedor(editing.id, data);
    } else {
      addFornecedor(data);
    }
    setDialogOpen(false);
  };

  const handleExportCsv = (): void => {
    exportToCsv('fornecedores', EXPORT_COLUMNS, fornecedoresFiltrados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Fornecedores', EXPORT_COLUMNS, fornecedoresFiltrados);
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
            disabled={fornecedoresFiltrados.length === 0}
          />
        }
      >
        <TextField
          select
          size="small"
          label="Tipo"
          value={filtroTipo}
          onChange={(event) => handleTipoChange(event.target.value as Tipo | '')}
          sx={SELECT_SX}
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
          sx={SELECT_SX}
        >
          <MenuItem value="">Todas</MenuItem>
          {CIDADE_OPTIONS.map((cidade) => (
            <MenuItem key={cidade} value={cidade}>
              {cidade}
            </MenuItem>
          ))}
        </TextField>
      </FilterBar>

      <FornecedoresTable
        fornecedores={fornecedoresFiltrados}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
      />

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
