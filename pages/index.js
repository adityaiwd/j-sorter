import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Container, Typography, MenuItem, TextField, Box, FormControl, Switch, Select, Chip } from '@mui/material';
import MSButton from '../components/MSButton';
import useJMSStore from '../hooks';
import { bulkAddFilteredMembers, SortResult } from '../src/db';
import { filteredMembers } from '../src/queries';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusOptions = [
  {
    value: 1,
    label: 'Active',
  },
  {
    value: 2,
    label: 'Graduated / Ex-members',
  },
  {
    value: 3,
    label: 'All',
  },
];

const generationOptionsConst = [
  {
    value: 1,
    label: 'Gen 1',
  },
  {
    value: 2,
    label: 'Gen 2',
  },
  {
    value: 3,
    label: 'Gen 3',
    isActive: true,
  },
  {
    value: 4,
    label: 'Gen 4',
    isActive: true,
  },
  {
    value: 5,
    label: 'Gen 5',
  },
  {
    value: 6,
    label: 'Gen 6',
    isActive: true,
  },
  {
    value: 7,
    label: 'Gen 7',
    isActive: true,
  },
  {
    value: 8,
    label: 'Gen 8',
    isActive: true,
  },
  {
    value: 9,
    label: 'Gen 9',
    isActive: true,
  },
  {
    value: 10,
    label: 'Gen 10',
    isActive: true,
  },
];

export default function Index() {
  const router = useRouter();
  const members = useLiveQuery(async () => {
    return await SortResult.members.toArray();
  });
  const createFilters = useJMSStore(state => state.createFilters);
  const [memberStatus, setMemberStatus] = useState('');
  const [generations, setGenerations] = useState([]);
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setGenerations(
      // On autofill we get a stringified value.
      typeof value === 'number' ? value.split(',') : value,
    );
  };

  const selectedGenerationOptions = useMemo(() => {
    if (memberStatus === 1) {
      return generations.length === generationOptionsConst.filter(generation => generation.isActive).length;
    }
    return generations.length === generationOptionsConst.length;
  }, [memberStatus, generations]);

  const generationOptions = useMemo(() => {
    if (memberStatus === 1) {
      return generationOptionsConst.filter(generation => generation.isActive);
    }
    return generationOptionsConst;
  }, [memberStatus]);

  const handleAllGenerationCheck = () => {
    if (generations.length !== generationOptions.length) {
      setGenerations(generationOptions.map(generation => generation.value));
    } else {
      setGenerations([]);
    }
  };

  const handleStart = () => {
    if (members.length > 0) {
      SortResult.members.clear();
      SortResult.history.clear();
    }
    if (filteredMembers(memberStatus, generations).length < 2) {
      toast.error(
        "The total of filtered members is only one 😭  \n To start sorting, you need 2 or more filtered members",
        {
          position: 'bottom-center',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { fontSize: '1.6rem', fontWeight: 600 },
        },
      );
      return;
    }
    createFilters(memberStatus, generations);
    bulkAddFilteredMembers(filteredMembers(memberStatus, generations));
    router.push('/sort');
  };
  return (
    <Container maxWidth="sm">
      <Box component="div" mt={6}>
        <Typography variant="h3" component="h3" align="center" sx={{ fontWeight: 600 }}>
          Welcome to JKT48 Member Sorter!
        </Typography>
        <Typography variant="h5" component="h5" align="center" sx={{ fontWeight: 400 }} mt={2}>
          A simple website to sort your favorite JKT48 members
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
          onChange={e => setMemberStatus(e.target.value)}
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
                    label={generationOptionsConst[value - 1].label}
                    color="primary"
                    sx={{ fontWeight: 500, fontSize: '1.2rem' }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {generationOptions.map(({ label, value }) => {
              return (
                <MenuItem key={value} value={value} style={{ fontSize: '1.4rem' }}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center' }} mb={3}>
          <Switch checked={selectedGenerationOptions} onChange={handleAllGenerationCheck} disabled={!memberStatus} />
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>All Generation</Typography>
        </Box>
        <MSButton disabled={generations.length === 0 || memberStatus === ''} onClick={handleStart}>
          Start Sorting!
        </MSButton>
      </Box>
    </Container>
  );
}
