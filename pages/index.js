import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import { useLiveQuery } from 'dexie-react-hooks';
import { Container, Typography, MenuItem, TextField, Box, FormControl, Switch, Select, Chip } from '@mui/material';
import { statusOptions, MenuProps } from '../constants';
import MSButton from '../components/MSButton';
import useJMSStore from '../hooks';
import { bulkAddFilteredMembers, SortResult } from '../src/db';
import { filteredMembers } from '../src/queries';
import { getGenerationOptions } from '../src/helper/getGenerationOptions';
import { toast } from 'react-toastify';

export default function Index() {
  const router = useRouter();
  const battles = useLiveQuery(async () => {
    return await SortResult.battles.toArray();
  });
  const [createFilters, setCurrentMatchId,setHomeCounter, setAwayCounter] = useJMSStore(
    state => [state.createFilters, state.setCurrentMatchId, state.setHomeCounter, state.setAwayCounter],
    shallow,
  );
  const [memberStatus, setMemberStatus] = useState('');
  const [generations, setGenerations] = useState([]);
  const [startLoading, setStartLoading] = useState(false);
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setGenerations(
      // On autofill we get a stringified value.
      typeof value === 'number' ? value.split(',') : value,
    );
  };

  const handleMemberStatusChange = e => {
    const {
      target: { value },
    } = e;
    setMemberStatus(value)
    if(generations.length > 0) {
      setGenerations([])
    }
    if (generations.length === getGenerationOptions(memberStatus).length) {
      setGenerations(getGenerationOptions(value).map(generation => generation.value));
    }
  }

  const handleAllGenerationCheck = () => {
    if (generations.length !== getGenerationOptions(memberStatus).length) {
      setGenerations(getGenerationOptions(memberStatus).map(generation => generation.value));
    } else {
      setGenerations([]);
    }
  };

  const handleStart = useCallback(() => {
    if (filteredMembers(memberStatus, generations).length < 2) {
      toast.error('To start sorting, you need 2 or more filtered members', {
        position: 'bottom-center',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontSize: '1.6rem', fontWeight: 600 },
      });
      setStartLoading(false);

      return;
    }
    if (battles.length > 0) {
      SortResult.battles.clear();
      SortResult.history.clear();
      setCurrentMatchId(1);
      setHomeCounter(0);
      setAwayCounter(0);
    }
    createFilters(memberStatus, generations.join('|'));
    bulkAddFilteredMembers(filteredMembers(memberStatus, generations));
    setStartLoading(false);

    router.push('/sort');
  }, [createFilters, generations, memberStatus, battles, router, setAwayCounter, setCurrentMatchId, setHomeCounter]);

  useEffect(() => {
    if (startLoading) {
      handleStart();
    }
  }, [startLoading, handleStart]);

  return (
    <Container maxWidth="sm">
      <Box component="div" mt={6}>
        <Typography variant="h3" component="h3" align="center" sx={{ fontWeight: 600 }} className="notranslate">
          Welcome to JKT48 Member Sorter!
        </Typography>
        <Typography variant="h5" component="h5" align="center" sx={{ fontWeight: 400 }} mt={2}>
          A fanmade JKT48 website to sort your favorite JKT48 members
        </Typography>
      </Box>
      <Box component="div" mt={4}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }} mt={2} mb={1}>
          Select Filters
        </Typography>
        <TextField
          fullWidth
          select
          variant="filled"
          label="Member Status"
          value={memberStatus}
          onChange={handleMemberStatusChange}
          InputLabelProps={{
            style: { fontSize: '1.4rem', fontWeight: 600 },
          }}
          InputProps={{ style: { fontSize: '1.4rem' } }}
        >
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value} style={{ fontSize: '1.4rem' }}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl fullWidth variant="filled" sx={{ mt: 1 }}>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={generations}
            onChange={handleChange}
            input={
              <TextField
                fullWidth
                select
                variant="filled"
                label="Generation"
                InputLabelProps={{
                  style: { fontSize: '1.4rem', fontWeight: 600 },
                }}
                InputProps={{ style: { fontSize: '1.4rem' } }}
              >
                <></>
              </TextField>
            }
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={getGenerationOptions(0)[value - 1].label}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 500, fontSize: '1.2rem' }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {getGenerationOptions(memberStatus).map(({ label, value }) => {
              return (
                <MenuItem key={value} value={value} style={{ fontSize: '1.4rem' }}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center' }} mb={3}>
          <Switch checked={generations.length === getGenerationOptions(memberStatus).length} onChange={handleAllGenerationCheck} disabled={!memberStatus} />
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>All Generation</Typography>
        </Box>
        <MSButton
          loading={startLoading}
          disabled={generations.length === 0 || memberStatus === ''}
          onClick={() => setStartLoading(true)}
        >
          Start Sorting!
        </MSButton>
      </Box>
    </Container>
  );
}
