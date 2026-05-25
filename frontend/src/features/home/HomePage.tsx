import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useApiStatus } from '../../hooks/useApiStatus';

export default function HomePage() {
  const { status, latency, lastChecked, refresh } = useApiStatus();

  const isInitialCheck = status === 'checking' && lastChecked === null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        CISPAR
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sistema de Controle de Autarquias de Água — Município de Sarandi/PR
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mt: 3, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1">Status da API:</Typography>

        {isInitialCheck ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Chip
              label={status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Verificando…'}
              color={status === 'online' ? 'success' : status === 'offline' ? 'error' : 'default'}
              size="small"
            />
            {status === 'online' && latency !== null && (
              <Typography variant="caption" color="text.secondary">
                {latency} ms
              </Typography>
            )}
            {lastChecked && (
              <Typography variant="caption" color="text.secondary">
                verificado às {lastChecked.toLocaleTimeString('pt-BR')}
              </Typography>
            )}
          </>
        )}

        <Tooltip title="Verificar agora">
          <span>
            <IconButton size="small" onClick={refresh} disabled={isInitialCheck}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Paper>

      {status === 'offline' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          API indisponível. Verifique se o backend está rodando em{' '}
          <strong>{import.meta.env.VITE_API_URL}</strong>.
        </Alert>
      )}
    </Box>
  );
}
