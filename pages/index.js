import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import {
   Grid,
   Container,
   Typography,
   MenuItem,
   TextField,
   Box,
   FormControl,
   Switch,
   Select,
   Chip,
   Button,
} from '@mui/material'
import MSButton from '../components/MSButton'
import useJMSStore from '../hooks'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
}

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
]

const generationOptions = [
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
   },
   {
      value: 4,
      label: 'Gen 4',
   },
   {
      value: 5,
      label: 'Gen 5',
   },
   {
      value: 6,
      label: 'Gen 6',
   },
   {
      value: 7,
      label: 'Gen 7',
   },
   {
      value: 8,
      label: 'Gen 8',
   },
   {
      value: 9,
      label: 'Gen 9',
   },
   {
      value: 10,
      label: 'Gen 10',
   },
]

export default function Index() {
   const router = useRouter()
   const createFilters = useJMSStore(state => state.createFilters)
   const [memberStatus, setMemberStatus] = useState('')
   const [generations, setGenerations] = useState([])
   const handleChange = (event) => {
      const {
         target: { value },
      } = event
      setGenerations(
         // On autofill we get a stringified value.
         typeof value === 'number' ? value.split(',') : value
      )
   }
   const handleStart = () => {
      createFilters(memberStatus,generations)
      router.push('/sort')
   }
   return (
      <Container maxWidth="sm">
         <Box component="div" mt={6}>
            <Typography
               variant="h3"
               component="h3"
               align="center"
               sx={{ fontWeight: 600 }}
            >
               Welcome to JKT48 Member Sorter!
            </Typography>
            <Typography
               variant="h5"
               component="h5"
               align="center"
               sx={{ fontWeight: 400 }}
               mt={2}
            >
               A simple website to sort your favorite JKT48 members
            </Typography>
         </Box>
         <Box component="div" mt={4}>
            <Typography
               variant="h5"
               component="h5"
               sx={{ fontWeight: 600 }}
               mt={2}
               mb={1}
            >
               Select Filters
            </Typography>
            <TextField
               fullWidth
               select
               variant="filled"
               label="Member Status"
               value={memberStatus}
               onChange={(e) => setMemberStatus(e.target.value)}
               InputLabelProps={{
                  style: { fontSize: '1.4rem', fontWeight: 600 },
               }}
               InputProps={{ style: { fontSize: '1.4rem' } }}
            >
               {statusOptions.map((option) => (
                  <MenuItem
                     key={option.value}
                     value={option.value}
                     style={{ fontSize: '1.4rem' }}
                  >
                     {option.label}
                  </MenuItem>
               ))}
            </TextField>
            <FormControl fullWidth variant="filled" sx={{mt: 1}}>
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
                     ><></></TextField>
                  }
                  renderValue={(selected) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                           <Chip key={value} label={generationOptions[value-1].label} color="primary" sx={{ fontWeight: 300, fontSize: '1.2rem' }}/>
                        ))}
                     </Box>
                  )}
                  MenuProps={MenuProps}
               >
                  {generationOptions.map(({label, value}) => {
                     return(
                     <MenuItem
                        key={value}
                        value={value}
                        style={{ fontSize: '1.4rem' }}
                     >
                        {label}
                     </MenuItem>
                  )})}
               </Select>
            </FormControl>
            <Box sx={{display:'flex', alignItems:'center'}} mb={3}>
               <Switch />
               <Typography sx={{fontSize: '1.2rem', fontWeight: 600}}>All Generation</Typography>
            </Box>
            <MSButton disabled={generations.length === 0 || memberStatus === null} onClick={handleStart}>
               Start Sorting!
            </MSButton>
         </Box>
      </Container>
   )
}
