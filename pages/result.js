import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { generationCopy } from '../constants';
import Avatar from '@mui/material/Avatar';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';
import { SortResult } from '../src/db';

export default function Index() {
  const theme = useTheme();
  const router = useRouter()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const battles = useLiveQuery(async () => {
    return await SortResult.battles.toArray();
  });
  const [sortedTopThree, setSortedTopThree] = useState([]);
  const [sortedFourthToTen, setSortedFourthToTen] = useState([]);
  const [sortedMembers, setSortedMembers] = useState([]);
  useEffect(() => {
    if (battles) {
      const sorted = battles[battles.length-1].result;
      setSortedTopThree(sorted.slice(0, 3));
      setSortedFourthToTen(isMobileScreen ? [] : sorted.slice(3, 10));
      setSortedMembers(sorted.slice(isMobileScreen ? 3 : 10, sorted.length));
    }
  }, [battles, isMobileScreen]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h4" align="center" sx={{ fontWeight: 300, textTransform: 'uppercase' }}>
          Your Results!
        </Typography>
        <Button sx={{ fontSize: '1.2rem' }} onClick={() => router.push('/')}>Start a new sorter</Button>
      </Box>
      <Box component="div" mt={1}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ pr: !isMobileScreen && 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            {battles &&
              sortedTopThree.map((data, index) => {
                return (
                  <Box
                    alignItems="center"
                    sx={{ display: 'flex', bgcolor: 'background.paper', p: 1, mb: index !== 2 && 1, borderRadius: 1, height: '33%' }}
                    key={data.id}
                  >
                    <Typography
                      sx={{ display: 'inline', mx: 1, fontSize: isMobileScreen ? '3rem' : '2rem', fontWeight: 600 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {index + 1}
                    </Typography>
                    <Avatar alt={data.name} src={data.picture} sx={{ width: 56, height: 56, mx: 1 }} />
                    <Box sx={{ ml: 1 }}>
                      <Typography
                        noWrap
                        sx={{
                          display: 'inline-block',
                          position: 'relative',
                          fontSize: isMobileScreen ? '1.6rem' : '1.2rem',
                          fontWeight: 600,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          width: isMobileScreen ? 1 : 130,
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {data.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{ display: 'inline', fontSize: isMobileScreen ? '1.2rem' : '.8rem', mr: 1 }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {generationCopy(data.generation)}
                          {' — '}
                        </Typography>
                        <Typography
                          sx={{ display: 'inline', fontSize: isMobileScreen ? '1.2rem' : '.8rem' }}
                          component="span"
                          variant="body2"
                          color={!data.graduated ? 'green' : 'grey'}
                        >
                          {data.graduated ? 'Graduated' : 'Active'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Grid>
          <Grid item sm={6} sx={{ p: 0, [theme.breakpoints.down('sm')]: { display: 'none' } }}>
            <List sx={{ width: '100%', height: '100%', px: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
              {sortedFourthToTen.length > 0 &&
                sortedFourthToTen.map((data, index) => {
                  return (
                    <ListItem
                      key={data.id}
                      alignItems="flex-start"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0,
                        borderBottom: index !== sortedFourthToTen.length - 1 && '1px solid #eee',
                      }}
                    >
                      <Typography
                        sx={{ display: 'inline', mr: 1, fontSize: '1.2rem', fontWeight: 600 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {index + 4}
                      </Typography>
                      <Avatar alt={data.name} src={data.picture} sx={{ width: 24, height: 24, mr: 1 }} />
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              display: 'inline-block',
                              fontSize: '1rem',
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
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline', fontSize: '.8rem' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {generationCopy(data.generation)}
                            </Typography>
                            {` — `}
                            <Typography
                              sx={{ display: 'inline', fontSize: '.8rem' }}
                              component="span"
                              variant="body2"
                              color={!data.graduated ? 'green' : 'grey'}
                            >
                              {data.graduated ? 'Graduated' : 'Active'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
        </Grid>
      </Box>
      {sortedMembers.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper', px: 1, mt: 1, borderRadius: 1 }}>
          <Grid container spacing={1}>
            {sortedMembers.map((data, index) => {
              return (
                <Grid item sm={4} xs={6} key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ display: 'flex', alignItems: 'center', p: 0, borderBottom: '1px solid #eee' }}
                  >
                    <Typography
                      sx={{ display: 'inline', mr: 1, fontSize: '1.2rem', fontWeight: 600 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {index + (isMobileScreen ? 4 : 11)}
                    </Typography>
                    <Avatar alt={data.name} src={data.picture} sx={{ width: 24, height: 24, mr: 1 }} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            display: 'inline-block',
                            fontSize: '1rem',
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
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline', fontSize: '.7rem' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {generationCopy(data.generation)}
                          </Typography>
                          {` — `}
                          <Typography
                            sx={{ display: 'inline', fontSize: '.7rem' }}
                            component="span"
                            variant="body2"
                            color={!data.graduated ? 'green' : 'grey'}
                          >
                            {data.graduated ? 'Graduated' : 'Active'}
                          </Typography>
                        </React.Fragment>
                      }
                    />
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
