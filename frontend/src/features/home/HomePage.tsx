import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        CISPAR
      </Typography>
    </Box>
  );
}
