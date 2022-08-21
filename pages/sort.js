import { useEffect, useState, useMemo } from 'react';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Grid, Container, Typography, Box, Button, Chip, Skeleton } from '@mui/material';
import { statusOptions, generationOptionsConst } from '../constants';
import useJMSStore from '../hooks';
import MemberImage from '../components/MemberImage';
import LinearProgressWithLabel from '../components/LinearProgressWithLabel';
import {
  SortResult,
  undoLastPick,
  getBattleById,
  updateParentBattle,
  updateBattleSorter,
  addToHistory,
} from '../src/db';
import MSButton from '../components/MSButton';
import Loader from '../components/Loader';

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
  const [
    memberStatus,
    generations,
    currentMatchId,
    setCurrentMatchId,
    homeCounter,
    setHomeCounter,
    awayCounter,
    setAwayCounter,
  ] = useJMSStore(
    state => [
      state.memberStatus,
      state.generations,
      state.currentMatchId,
      state.setCurrentMatchId,
      state.homeCounter,
      state.setHomeCounter,
      state.awayCounter,
      state.setAwayCounter,
    ],
    shallow,
  );
  const members = useLiveQuery(async () => {
    return await SortResult.members.toArray();
  });
  const battles = useLiveQuery(async () => {
    return await SortResult.battles.toArray();
  });
  const sortProgress = useMemo(() => {
    if (battles) {
      return Math.round((currentMatchId / (battles.length + 1)) * 100);
    }
    return 0;
  }, [currentMatchId, battles]);

  const [member1, setMember1] = useState(memberProps);
  const [member2, setMember2] = useState(memberProps);
  const [loading, setLoading] = useState(false);

  const handlePick = async team => {
    setLoading(true);
    addToHistory({ battleId: currentMatchId, homeIndex: homeCounter, awayIndex: awayCounter });
    const battle = await getBattleById(currentMatchId);
    if (team === 'home') {
      setHomeCounter(homeCounter + 1);
    } else if (team === 'away') {
      updateBattleSorter(battle, member1.id, member2.id);
      setAwayCounter(awayCounter + 1);
    } else {
      updateBattleSorter(battle, member1.id + 1, member2.id);
      setHomeCounter(homeCounter + 1);
      setAwayCounter(awayCounter + 1);
    }
    if (currentMatchId !== battles.length) {
      updateParentBattle(battle);
    }
  };

  const handleUndo = async () => {
    const { lastBattleId, lastPickedHome, lastPickedAway } = await undoLastPick();
    setCurrentMatchId(lastBattleId);
    setHomeCounter(lastPickedHome);
    setAwayCounter(lastPickedAway);
  };

  useEffect(() => {
    if (sortProgress === 100) {
      return;
    }
    if (members && battles) {
      if (currentMatchId === battles.length + 1) {
        return;
      }
      const fetchBattle = async () => {
        const battle = battles[currentMatchId - 1];
        if (battle.home.length === homeCounter || battle.away.length === awayCounter) {
          setCurrentMatchId(currentMatchId + 1);
          setHomeCounter(0);
          setAwayCounter(0);
        } else {
          setMember1(battle.home[homeCounter]);
          setMember2(battle.away[awayCounter]);
        }
      };
      fetchBattle();
      setLoading(false);
    }
  }, [
    members,
    battles,
    sortProgress,
    currentMatchId,
    homeCounter,
    awayCounter,
    setCurrentMatchId,
    setHomeCounter,
    setAwayCounter,
  ]);

  if (!members || !battles) {
    return <Loader />;
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h4" component="h4" sx={{ fontWeight: 300 }} mb={2} textAlign="center">
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
              mb: 6,
            }}
          >
            {!loading && member1.id ? (
              <MemberImage member={member1} onClick={() => handlePick('home')} />
            ) : (
              <Grid item xs={5} alignSelf="stretch">
                <Skeleton variant="rounded" height={'100%'} />
              </Grid>
            )}
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h4" sx={{ fontWeight: 250 }}>
                OR
              </Typography>
            </Grid>
            {!loading && member2.id ? (
              <MemberImage member={member2} onClick={() => handlePick('away')} />
            ) : (
              <Grid item xs={5} alignSelf="stretch">
                <Skeleton variant="rounded" height={'100%'} />
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
                onClick={() => handlePick('tie')}
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
      <Box sx={{ width: '100%' }} mt={4}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
          Sort Progress
        </Typography>
        <LinearProgressWithLabel value={sortProgress} />
      </Box>
      <Box sx={{ width: '100%' }} mt={3}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 700, textTransform: 'uppercase' }} >
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
            size="small"
            sx={{ fontWeight: 400, fontSize: '1.2rem' }}
          />
          {generations.split('|').map((generation, index) => (
            <Chip
              key={index}
              label={generationOptionsConst[Number(generation) - 1].label}
              size="small"
              color="primary"
              sx={{ fontWeight: 400, fontSize: '1.2rem' }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
