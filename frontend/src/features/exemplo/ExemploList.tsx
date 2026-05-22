import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Exemplo } from './types';

interface Props {
  exemplos: Exemplo[];
}

export default function ExemploList({ exemplos }: Props) {
  if (exemplos.length === 0) {
    return <Typography color="text.secondary">Nenhum exemplo cadastrado ainda.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={80}><strong>ID</strong></TableCell>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell><strong>Criado em</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exemplos.map((exemplo) => (
            <TableRow key={exemplo.id} hover>
              <TableCell>{exemplo.id}</TableCell>
              <TableCell>{exemplo.nome}</TableCell>
              <TableCell>{new Date(exemplo.criadoEm).toLocaleString('pt-BR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
