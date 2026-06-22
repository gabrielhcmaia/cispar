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

import { FilterBar } from '../../components/FilterBar';
import { ExportMenu } from '../../components/ExportMenu';
import { SELECT_MENU_PROPS, SELECT_SX } from '../../components/selectStyles';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { exportToCsv, exportToPdf, type ExportColumn } from '../../utils/exporters';
import type { Perfil, Usuario, UsuarioFormData } from '../../types/usuario';
import { PERFIL_OPTIONS, formatUltimoAcesso } from './usuariosConstants';
import { UsuariosTable } from './UsuariosTable';
import { UsuarioFormDialog } from './UsuarioFormDialog';

type StatusFiltro = '' | 'ativo' | 'inativo';

const EXPORT_COLUMNS: ExportColumn<Usuario>[] = [
  { header: 'Nome', accessor: (usuario) => usuario.nome },
  { header: 'E-mail', accessor: (usuario) => usuario.email },
  { header: 'Perfil', accessor: (usuario) => usuario.perfil },
  { header: 'Cargo', accessor: (usuario) => usuario.cargo },
  { header: 'Status', accessor: (usuario) => (usuario.ativo ? 'Ativo' : 'Inativo') },
  { header: 'Último acesso', accessor: (usuario) => formatUltimoAcesso(usuario.ultimoAcesso) },
];

function scrollToTop(): void {
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function UsersPage(): ReactElement {
  const { usuarios, loading, error, addUsuario, updateUsuario } = useUsuarios();

  const [search, setSearch] = useState('');
  const [filtroPerfil, setFiltroPerfil] = useState<Perfil | ''>('');
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);

  const usuariosFiltrados = useMemo(() => {
    const termo = search.trim().toLowerCase();
    return usuarios.filter((usuario) => {
      const matchTermo =
        termo === '' ||
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo);
      const matchPerfil = filtroPerfil === '' || usuario.perfil === filtroPerfil;
      const matchStatus =
        filtroStatus === '' || (filtroStatus === 'ativo' ? usuario.ativo : !usuario.ativo);
      return matchTermo && matchPerfil && matchStatus;
    });
  }, [usuarios, search, filtroPerfil, filtroStatus]);

  const { visibleCount, sentinelRef, reset } = useInfiniteScroll(usuariosFiltrados.length);

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    reset();
  };
  const handlePerfilChange = (value: Perfil | ''): void => {
    setFiltroPerfil(value);
    reset();
  };
  const handleStatusChange = (value: StatusFiltro): void => {
    setFiltroStatus(value);
    reset();
  };

  const itensVisiveis = usuariosFiltrados.slice(0, visibleCount);
  const hasMore = visibleCount < usuariosFiltrados.length;

  const handleNovo = (): void => {
    setEditing(null);
    setDialogOpen(true);
  };
  const handleEdit = (usuario: Usuario): void => {
    setEditing(usuario);
    setDialogOpen(true);
  };
  const handleClose = (): void => {
    setDialogOpen(false);
  };
  const handleSubmit = async (data: UsuarioFormData): Promise<void> => {
    try {
      if (editing) {
        await updateUsuario(editing.id, data);
      } else {
        await addUsuario(data);
      }
      setDialogOpen(false);
    } catch {
      setDialogOpen(true);
    }
  };

  const handleExportCsv = (): void => {
    exportToCsv('usuarios', EXPORT_COLUMNS, usuariosFiltrados);
  };
  const handleExportPdf = (): void => {
    exportToPdf('Usuários', EXPORT_COLUMNS, usuariosFiltrados);
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
            Usuários
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie os acessos e perfis dos colaboradores do sistema.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNovo}
          sx={{ textTransform: 'none', borderRadius: 1.5, whiteSpace: 'nowrap' }}
        >
          Novo Usuário
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
            disabled={usuariosFiltrados.length === 0}
            disabledMessage="Nenhum usuário para exportar."
          />
        }
      >
        <TextField
          select
          size="small"
          label="Perfil"
          value={filtroPerfil}
          onChange={(event) => handlePerfilChange(event.target.value as Perfil | '')}
          sx={[{ minWidth: { xs: '100%', md: 180 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todos os perfis</MenuItem>
          {PERFIL_OPTIONS.map((perfil) => (
            <MenuItem key={perfil} value={perfil}>
              {perfil}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Status"
          value={filtroStatus}
          onChange={(event) => handleStatusChange(event.target.value as StatusFiltro)}
          sx={[{ minWidth: { xs: '100%', md: 160 } }, SELECT_SX]}
          slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="ativo">Ativo</MenuItem>
          <MenuItem value="inativo">Inativo</MenuItem>
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
        <UsuariosTable
          items={itensVisiveis}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
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
          Exibindo {Math.min(visibleCount, usuariosFiltrados.length)} de {usuariosFiltrados.length}
        </Typography>
        <Tooltip title="Voltar ao topo">
          <IconButton size="small" color="primary" onClick={scrollToTop}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

      <UsuarioFormDialog
        open={dialogOpen}
        mode={editing ? 'edit' : 'create'}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
