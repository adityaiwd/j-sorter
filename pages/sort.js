import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Grid, Container, Typography, Box, Button, Chip, Skeleton } from '@mui/material';
import { statusOptions, generationOptionsConst } from '../constants';
import useJMSStore from '../hooks';
import MemberImage from '../components/MemberImage';
import LinearProgressWithLabel from '../components/LinearProgressWithLabel';
import { SortResult, updateMemberScore, undoLastPick, getMatchById, getMemberById } from '../src/db';
import MSButton from '../components/MSButton';

function product_Range(a, b) {
  var prd = a,
    i = a;

  while (i++ < b) {
    prd *= i;
  }
  return prd;
}

function combinations(n, r) {
  if (n == r || r == 0) {
    return 1;
  } else {
    r = r < n - r ? n - r : r;
    return product_Range(r + 1, n) / product_Range(1, n - r);
  }
}

const memberProps = {
  id: 0,
  picture: '',
  name: '',
  graduated: false,
  generation: 0,
  score: 0,
  matched: [],
};

export default function Sort() {
  const router = useRouter();
  const theme = useTheme();
  const [memberStatus, generations, currentMatchId, setCurrentMatchId] = useJMSStore(
    state => [state.memberStatus, state.generations, state.currentMatchId, state.setCurrentMatchId],
    shallow,
  );
  const members = useLiveQuery(async () => {
    return await SortResult.members.toArray();
  });
  const matches = useLiveQuery(async () => {
    return await SortResult.matches.toArray();
  });
  const sortProgress = useMemo(() => {
    if (members) {
      return Math.ceil(((currentMatchId - 1) / combinations(members.length, 2)) * 100);
    }
    return 0;
  }, [members, currentMatchId]);

  const [member1, setMember1] = useState(memberProps);
  const [member2, setMember2] = useState(memberProps);
  const [loading, setLoading] = useState(false);
  const [undoCalled, setUndoCalled] = useState(false);

  const handlePick = (member1Score, member2Score) => {
    setLoading(true);
    if (sortProgress === 100) {
      return;
    }
    if (undoCalled) {
      setUndoCalled(false);
    }
    updateMemberScore(currentMatchId, member1, member2, member1Score, member2Score);
    setCurrentMatchId(currentMatchId + 1);
  };

  const handleUndo = async () => {
    setUndoCalled(true);
    const { newHome, newAway } = await undoLastPick(currentMatchId - 1);
    setMember1(newHome);
    setMember2(newAway);
    setCurrentMatchId(currentMatchId - 1);
  };

  useEffect(() => {
    if (sortProgress === 100) {
      return;
    }
    if (members && matches) {
      if (currentMatchId === matches.length + 1) {
        return;
      }
      const fetchMatch = async () => {
        setLoading(true);
        if (undoCalled) {
          return;
        }
        const match = await getMatchById(currentMatchId);
        const member1 = await getMemberById(match.home.id);
        const member2 = await getMemberById(match.away.id);
        setMember1(member1);
        setMember2(member2);
      };
      fetchMatch();
      setLoading(false);
    }
  }, [members, matches, sortProgress, currentMatchId, undoCalled]);

  if (!members || !matches) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h3" component="h3" sx={{ fontWeight: 300 }} mb={4} textAlign="center">
          {sortProgress === 100 ? 'FINISHED!' : 'PICK YOUR FAVORITE MEMBER'}
        </Typography>
        {sortProgress === 100 ? (
          <MSButton onClick={() => router.replace('/result')}>View Result</MSButton>
        ) : (
          <Grid
            container
            alignItems="center"
            spacing={1}
            sx={{
              height: 250,
              mb: 4,
              px: 2,
              [theme.breakpoints.down('sm')]: {
                height: 200,
              },
            }}
          >
            {!loading && member1.id ? (
              <MemberImage src={member1.picture} name={member1.name} onClick={() => handlePick(2, 0)} />
            ) : (
              <Grid item xs={4} alignSelf="stretch">
                <Skeleton variant="rounded" height={'90%'} />
              </Grid>
            )}
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h4" sx={{ fontWeight: 250 }}>
                OR
              </Typography>
            </Grid>
            {!loading && member2.id ? (
              <MemberImage src={member2.picture} name={member2.name} onClick={() => handlePick(0, 2)} />
            ) : (
              <Grid item xs={4} alignSelf="stretch">
                <Skeleton variant="rounded" height={'90%'} />
              </Grid>
            )}
          </Grid>
        )}
        <Grid container direction="column" spacing={2} my={2}>
          {sortProgress !== 100 && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  fontSize: '1.6rem',
                  paddingY: '1rem',
                  borderRadius: '3.6rem',
                }}
                onClick={() => handlePick(1, 1)}
                disabled={sortProgress === 100}
              >
                TIE!
              </Button>
            </Grid>
          )}
          {currentMatchId === 1 ? null : (
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  fontSize: '1.6rem',
                  paddingY: '1rem',
                  borderRadius: '3.6rem',
                }}
                onClick={() => handleUndo()}
              >
                Undo Last Pick
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box sx={{ width: '100%' }} mt={6}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
          Sort Progress
        </Typography>
        <LinearProgressWithLabel value={sortProgress} />
      </Box>
      <Box sx={{ width: '100%' }} mt={3}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 700, textTransform: 'uppercase' }} mb={1}>
          Filters
        </Typography>
        <Box
          component="div"
          sx={{
            display: 'flex',
            spacing: 2,
            flexWrap: 'wrap',
            '& > *': {
              marginRight: 1,
              marginBottom: 1,
            },
          }}
        >
          <Chip
            label={statusOptions[memberStatus - 1].label}
            color="primary"
            sx={{ fontWeight: 600, fontSize: '1.2rem' }}
          />
          {generations.split('|').map((generation, index) => (
            <Chip
              key={index}
              label={generationOptionsConst[Number(generation) - 1].label}
              color="primary"
              sx={{ fontWeight: 600, fontSize: '1.2rem' }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
