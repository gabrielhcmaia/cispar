import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
  drawerWidth?: number;
  collapsedWidth?: number;
}

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

export default function Header({
  sidebarOpen,
  onToggleSidebar,
  pageTitle,
  drawerWidth = DRAWER_WIDTH,
  collapsedWidth = COLLAPSED_WIDTH,
}: HeaderProps) {
  const { user, logout } = useAuth();

  const currentSidebarWidth = sidebarOpen ? drawerWidth : collapsedWidth;

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '?';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer - 1,
        backgroundColor: (theme) => theme.palette.background.default,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
        left: currentSidebarWidth,
        width: `calc(100% - ${currentSidebarWidth}px)`,
        transition: (t) =>
          t.transitions.create(['left', 'width'], {
            easing: t.transitions.easing.sharp,
            duration: sidebarOpen
              ? t.transitions.duration.enteringScreen
              : t.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Tooltip title={sidebarOpen ? 'Fechar menu' : 'Expandir menu'}>
          <IconButton
            onClick={onToggleSidebar}
            size="small"
            sx={{ color: 'text.primary' }}
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Tooltip>

        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {pageTitle}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Stack alignItems="flex-end" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
              {user?.username ?? 'Usuário'}
            </Typography>
            <Typography variant="caption" color="text.secondary" lineHeight={1.2}>
              {user?.role !== undefined ? String(user.role) : ''}
            </Typography>
          </Stack>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: 'primary.main',
            }}
          >
            {initials}
          </Avatar>

          <Tooltip title="Sair">
            <IconButton onClick={logout} size="small" sx={{ color: 'text.secondary' }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
