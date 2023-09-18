import React, { useState, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { generationCopy, ordinalNumber, statusOptions } from '../constants';
import Avatar from '@mui/material/Avatar';
import useJMSStore from '../hooks';
import { Container, Typography, Box, Button, Grid, Badge, Chip } from '@mui/material';
import { SortResult } from '../src/db';
import Loader from '../components/Loader';
import { checkFilteredAllGenerations } from '../src/helper/filteredGenerations';

export default function Index() {
  const theme = useTheme();
  const router = useRouter();
  const [memberStatus, generations, currentMatchId] = useJMSStore(
    state => [state.memberStatus, state.generations, state.currentMatchId],
    shallow,
  );
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const battles = useLiveQuery(async () => {
    return await SortResult.battles.toArray();
  });

  const [sortedTopThree, setSortedTopThree] = useState([]);
  const [sortedMembers, setSortedMembers] = useState([]);
  const [status, setStatus] = useState('');
  const [oshiName, setOshiName] = useState('')
  useEffect(() => {
    if (memberStatus === 0) {
      router.replace('/');
    }
    if (battles) {
      if (currentMatchId !== battles.length + 1) {
        router.replace('/sort');
      }
      const sorted = battles[battles.length - 1].result;
      let oshi = sorted.slice(0,1)
      setOshiName(oshi[0].name)
      setStatus(statusOptions[memberStatus - 1].label);
      setSortedTopThree(sorted.slice(0, 3));
      setSortedMembers(sorted.slice(3, sorted.length));
      // setOshiName(sorted.slice(0, 3).name)

    }
    
  }, [battles, currentMatchId, router, isMobileScreen, memberStatus]);
  if (!battles) {
    return <Loader />;
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Button sx={{ fontSize: '1.2rem' }} onClick={() => router.push('/')}>
          Start a new sorter
        </Button>
        <Button sx={{ fontSize: '1.2rem' }} onClick={() => alert('exported to PDF')}>
          Export Results
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h6" component="h6" align="center" sx={{ fontWeight: 700, textTransform: 'uppercase', marginTop: 2 }}>
          filters :
        </Typography>
        <Box sx={{ flexWrap: 'wrap', marginBottom: 4}}>
          <Chip label={status} color="primary" size="small" sx={{ fontWeight: 400, fontSize: '1.2rem', mb: 0.5 }} />
          {checkFilteredAllGenerations(memberStatus,generations) ? (
            <Chip
              label={'All Generation'}
              size="small"
              color="primary"
              sx={{ fontWeight: 400, fontSize: '1.2rem', ml: 0.5, mb: 0.5 }}
            />
          ) : (
            generations
              .split('|')
              .map(generation => (
                <Chip
                  key={generation}
                  label={`Gen ${generation}`}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 400, fontSize: '1.2rem', ml: 0.5, mb: 0.5 }}
                />
              ))
          )}
        </Box>
      </Box>
      <Typography variant="h4" component="h4" align="center" sx={{ fontWeight: 300, textTransform: 'uppercase', marginBottom:2 }}>
          Your Results! 
      </Typography>
      {/* <Typography variant="h4" component="h4" align="center" sx={{ fontWeight: 300, marginBottom:2 }}>
          You are Identified as {oshiName} Oshi. 
      </Typography> */}
      <Box component="div" mt={1}>
        {battles &&
          sortedTopThree.map((data, index) => {
            return (
              <Box
                alignItems="center"
                sx={{
                  display: 'flex',
                  bgcolor: index === 0 ? 'gold' : 'background.paper',
                  p: 2,
                  mb: index !== 2 && 1,
                  borderRadius: 1,
                  height: '33%',
                }}
                key={data.id}
              >
                <Badge
                  color="primary"
                  badgeContent={
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }} component="span">
                      {index + 1}
                    </Typography>
                  }
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Avatar alt={data.name} src={data.picture} sx={{ width: 60, height: 60 }} />
                </Badge>
                <Box
                  sx={{
                    ml: 2,
                    flex:1,
                    display: 'flex',
                    flexDirection: 'column',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      display: 'inline-block',
                      position: 'relative',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                    }}
                    color="text.primary"
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', fontSize: '1.2rem' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {generationCopy(data.generation)}
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', fontSize: '1.2rem', fontWeight: 600 }}
                    component="span"
                    variant="body2"
                    color={!data.graduated ? 'green' : 'grey'}
                  >
                    {data.graduated ? 'Graduated' : 'Active'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: 'flex',
                    flex: 1,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    alignItems: 'center', // Mengatur vertikal tengah
                    justifyContent: 'right', // Mengatur horizontal tengah
                  }}
                >
                  <Typography
                    sx={{ fontSize: '1.2rem', fontWeight: 600 }}
                    variant="body2"
                  >
                    {ordinalNumber(index + 1)} OSHI
                  </Typography>
                </Box>

              </Box>
            );
          })}
      </Box>
      {sortedMembers.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper', px: 1, mt: 1, borderRadius: 1 }}>
          <Grid container spacing={1}>
            {sortedMembers.map((data, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}
                  >
                    <Badge
                      color="primary"
                      badgeContent={
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600 }} component="span">
                          {index + 4}
                        </Typography>
                      }
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Avatar alt={data.name} src={data.picture} sx={{ width: 48, height: 48, mr: 1 }} />
                    </Badge>
                    <Box
                      sx={{
                        ml: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Typography
                        sx={{
                          display: 'inline-block',
                          fontSize: '1.4rem',
                          fontWeight: 600,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          width: 1,
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {data.name}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', fontSize: '1rem' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {generationCopy(data.generation)}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', fontSize: '1rem', fontWeight: 600 }}
                        component="span"
                        variant="body2"
                        color={!data.graduated ? 'green' : 'grey'}
                      >
                        {data.graduated ? 'Graduated' : 'Active'}
                      </Typography>
                    </Box>
                  </ListItem>
                </Grid>
              );
            })}
          </Grid>
        </List>
      )}
    </Container>
  );
}
