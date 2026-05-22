import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { HealthStatus } from '../../types/api';
import { checkHealth } from '../../services/healthService';

export default function HomePage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHealth()
      .then(setHealth)
      .catch(() => setHealth({ status: 'DOWN' }))
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Chip
            label={health?.status ?? 'UNKNOWN'}
            color={health?.status === 'UP' ? 'success' : 'error'}
            size="small"
          />
        )}
      </Paper>

      {!loading && health?.status !== 'UP' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          API indisponível. Verifique se o backend está rodando em{' '}
          <strong>{import.meta.env.VITE_API_URL}</strong>.
        </Alert>
      )}
    </Box>
  );
}
