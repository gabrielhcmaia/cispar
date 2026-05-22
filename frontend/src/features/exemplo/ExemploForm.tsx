import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import type { ExemploRequest } from './types';

interface Props {
  onSubmit: (data: ExemploRequest) => Promise<void>;
}

export default function ExemploForm({ onSubmit }: Props) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ nome: nome.trim() });
      setNome('');
    } catch {
      setError('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => { void handleSubmit(e); }}
      sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 3 }}
    >
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        size="small"
        disabled={loading}
        error={!!error}
        helperText={error ?? ''}
        inputProps={{ maxLength: 255 }}
      />
      <Button type="submit" variant="contained" disabled={loading || !nome.trim()}>
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Cadastrar'}
      </Button>
    </Box>
  );
}
