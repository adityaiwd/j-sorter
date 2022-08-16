import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Grid, Container, Typography, Box, Button, Chip, Skeleton } from '@mui/material';
import MemberImage from '../components/MemberImage';
import LinearProgressWithLabel from '../components/LinearProgressWithLabel';
import { SortResult, updateMemberScore, undoLastPick } from '../src/db';
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

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
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
  const members = useLiveQuery(async () => {
    return await SortResult.members.toArray();
  });
  const history = useLiveQuery(async () => {
    return await SortResult.history.toArray();
  });
  const [matchCounter, setMatchCounter] = useState(0);
  const sortProgress = useMemo(() => {
    if (members && history) {
      return Math.ceil((history.length / combinations(members.length, 2)) * 100);
    }
    return 0;
  }, [members, history]);

  const [member1, setMember1] = useState(memberProps);
  const [member2, setMember2] = useState(memberProps);
  const [loading, setLoading] = useState(false);
  const [undoCalled, setUndoCalled] = useState(false);
  const matchChecker = useCallback(() => {
    if (sortProgress === 100 || undoCalled) {
      return 
    }
    const match = getMultipleRandom(members, 2);
    if (!match[0].matched.includes(match[1].id) && !match[1].matched.includes(match[0].id)) {
      setMember1(match[0]);
      setMember2(match[1]);
    } else {
      matchChecker();
    }
  }, [sortProgress, members, undoCalled]);

  const handlePick = (member1Score, member2Score) => {
    if (sortProgress === 100) {
      return;
    }
    if(undoCalled) {
      setUndoCalled(false)
    }
    updateMemberScore(member1, member2, member1Score, member2Score);
    setMatchCounter(matchCounter + 1);
  };

  const handleUndo = async () => {
    setUndoCalled(true);
    setMatchCounter(matchCounter - 1);
    const { newHome, newAway } = await undoLastPick();
    setMember1(newHome);
    setMember2(newAway);
  };

  useEffect(() => {
    setLoading(true)
    if (sortProgress === 100) {
      return;
    }
    if (history && members) {
      if (matchCounter === combinations(members.length, 2)) {
        return;
      }
      if(matchCounter === 0) {
        setMatchCounter(history.length);
      }
      matchChecker();
    }
    setLoading(false)
  }, [members, router,  matchCounter, history, sortProgress, matchChecker]);

  if (!members || !history) {
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
          <Grid container alignItems="center" spacing={1} sx={{ height: 300 }}>
            {!loading && member1.id ? (
              <MemberImage src={member1.picture} name={member1.name} onClick={() => handlePick(2, 0)} />
            ) : (
              <Grid item xs={5} alignSelf="stretch">
                <Skeleton variant="rounded" height={'90%'} />
              </Grid>
            )}
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h4" sx={{ fontWeight: 300 }}>
                OR
              </Typography>
            </Grid>
            {!loading && member2.id ? (
              <MemberImage src={member2.picture} name={member2.name} onClick={() => handlePick(0, 2)} />
            ) : (
              <Grid item xs={5} alignSelf="stretch">
                <Skeleton variant="rounded" height={'90%'} />
              </Grid>
            )}
          </Grid>
        )}
        <Grid container direction="column" spacing={2} my={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                fontSize: '1.6rem',
                paddingY: '1.6rem',
                borderRadius: '3.6rem',
              }}
              onClick={() => handlePick(1, 1)}
              disabled={sortProgress === 100}
            >
              TIE!
            </Button>
          </Grid>
          {matchCounter === 0 || history.length === 0 ? null : <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                fontSize: '1.6rem',
                paddingY: '1.6rem',
                borderRadius: '3.6rem',
              }}
              onClick={() => handleUndo()}
            >
              Undo Last Pick
            </Button>
          </Grid>}
        </Grid>
      </Box>
      <Box sx={{ width: '100%' }} mt={6}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
          Sort Progress
        </Typography>
        <LinearProgressWithLabel value={sortProgress} />
      </Box>
      <Box sx={{ width: '100%' }} mt={3}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 700, textTransform: 'uppercase' }} mb={1}>
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
          <Chip label="Current Members" color="primary" sx={{ fontWeight: 600, fontSize: '1.6rem' }} />
        </Box>
      </Box>
    </Container>
  );
}
