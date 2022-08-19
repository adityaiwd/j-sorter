import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SortResult } from '../src/db';

export default function Index() {
  const theme = useTheme()
  const members = useLiveQuery(async () => {
    return await SortResult.members.toArray();
  });
  const [sortedTopThree, setSortedTopThree] = useState([]);
  const [sortedMembers, setSortedMembers] = useState([]);
  useEffect(() => {
    if (members) {
      const sorted = members.sort((a, b) => b.score - a.score);
      setSortedTopThree(sorted.slice(0, 3));
      setSortedMembers(sorted.slice(3, sorted.length));
    }
  }, [members]);
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4" align="center" sx={{ fontWeight: 600 }}>
        Your Results!
      </Typography>
      <Box component="div" mt={2}>
        {members &&
          sortedTopThree.map((data, index) => {
            return (
              <Box key={data.id} sx={{ height: 120, display: 'flex', alignItems: 'center' }} mb={2}>
                <Typography variant="h3" component="h3" align="center" sx={{ fontWeight: 600 }} color="primary">
                  {index + 1}
                </Typography>
                <Paper
                  sx={{ height: '100%', width: 120, position: 'relative', overflow: 'hidden', borderRadius: 2, mx: 2, backgroundColor: theme.palette.primary.main }}
                >
                  <Image src={data.picture} alt={data.name} layout="fill" objectFit="contain" />
                </Paper>
                <Typography variant="h5" component="h5" align="center" sx={{ fontWeight: 600 }} color="primary">
                  {data.name}
                </Typography>
              </Box>
            );
          })}
      </Box>
      {sortedMembers.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.4rem', fontWeight: 600 }} color="primary" align="center">
                  Rank
                </TableCell>
                <TableCell sx={{ fontSize: '1.4rem', fontWeight: 600 }} color="primary">
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: '1.4rem', fontWeight: 600 }} color="primary" align="center">
                  Generation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMembers.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '1.4rem' }} align="center">
                    {index + 4}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{row.name}</TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }} align="center">
                    {row.generation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
