import { useCallback, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createExemplo, getExemplos } from '../../services/exemploService';
import type { Exemplo, ExemploRequest } from './types';
import ExemploForm from './ExemploForm';
import ExemploList from './ExemploList';

// ⚠️ Feature descartável — serve apenas para validar a integração frontend ↔ backend ↔ PostgreSQL.
export default function ExemploPage() {
  const [exemplos, setExemplos] = useState<Exemplo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setExemplos(await getExemplos());
      setError(null);
    } catch {
      setError('Erro ao carregar exemplos. Verifique se a API está disponível.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreate = async (data: ExemploRequest) => {
    await createExemplo(data);
    await load();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Exemplos
      </Typography>
      <Alert severity="warning" sx={{ mb: 3 }}>
        Esta feature é <strong>descartável</strong> — existe apenas para validar a integração
        end-to-end (frontend → backend → PostgreSQL). Remover quando o desenvolvimento real começar.
      </Alert>

      <Typography variant="h6" gutterBottom>
        Cadastrar
      </Typography>
      <ExemploForm onSubmit={handleCreate} />

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Lista
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <ExemploList exemplos={exemplos} />
      )}
    </Box>
  );
}
