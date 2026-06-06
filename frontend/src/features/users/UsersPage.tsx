import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UsersPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Usuários
      </Typography>
      <Typography color="text.secondary">
        Listagem e gerenciamento de usuários do sistema.
      </Typography>
    </Box>
  );
}
