import { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { useLiveQuery } from 'dexie-react-hooks'
import { Grid, Container, Typography, Box, Button, Chip } from '@mui/material'
import MemberImage from '../components/MemberImage'
import LinearProgressWithLabel from '../components/LinearProgressWithLabel'
import useJMSStore from '../hooks'
import { bulkAddFilteredMembers } from '../src/db'
import { filteredMembers } from '../src/queries'
import { SortResult } from '../src/db'

export default function Sort() {
   const members = useLiveQuery(async () => {
      return await SortResult.members.toArray()
   })
   const [member1, setMember1] = useState({
      picture: '',
      name: '',
      graduated: false,
      generation: 0,
   })
   const [member2, setMember2] = useState({
      picture: '',
      name: '',
      graduated: false,
      generation: 0,
   })
   const { memberStatus, generations } = useJMSStore(
      (state) => ({
         memberStatus: state.memberStatus,
         generations: state.generations,
      }),
      shallow
   )

   const handlePick = (member1Score, member2Score) => {}

   useEffect(() => {
      if (memberStatus && generations.length > 0) {
         console.log('mashok')
         bulkAddFilteredMembers(filteredMembers(memberStatus, generations))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      console.log(members)
      if (members) {
         setMember1(members[0])
         setMember2(members[1])
      }
   }, [members])
   return (
      <Container maxWidth="sm">
         <Box>
            <Typography
               variant="h3"
               component="h3"
               sx={{ fontWeight: 300 }}
               mb={4}
               textAlign="center"
            >
               PICK YOUR FAVORITE MEMBER
            </Typography>
            <Grid
               container
               alignItems="center"
               spacing={1}
               sx={{ height: 300 }}
            >
               {members !== undefined ? (
                  <>
                     <MemberImage
                        src={member1.picture}
                        name={member1.name}
                        onClick={handlePick(2, 0)}
                     />
                     <Grid item xs={2} sx={{ textAlign: 'center' }}>
                        <Typography
                           variant="h4"
                           component="h4"
                           sx={{ fontWeight: 300 }}
                        >
                           OR
                        </Typography>
                     </Grid>
                     <MemberImage
                        src={member2.picture}
                        name={member2.name}
                        onClick={handlePick(0, 2)}
                     />
                  </>
               ) : (
                  <div>Loading</div>
               )}
            </Grid>
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
                     onClick={handlePick(1, 1)}
                  >
                     TIE!
                  </Button>
               </Grid>
               <Grid item xs={12}>
                  <Button
                     variant="contained"
                     sx={{
                        width: '100%',
                        fontSize: '1.6rem',
                        paddingY: '1.6rem',
                        borderRadius: '3.6rem',
                     }}
                  >
                     Undo Last Pick
                  </Button>
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ width: '100%' }} mt={6}>
            <Typography
               variant="h5"
               component="h5"
               sx={{ fontWeight: 700, textTransform: 'uppercase' }}
            >
               Sort Progress
            </Typography>
            <LinearProgressWithLabel value={80} />
         </Box>
         <Box sx={{ width: '100%' }} mt={3}>
            <Typography
               variant="h5"
               component="h5"
               sx={{ fontWeight: 700, textTransform: 'uppercase' }}
               mb={1}
            >
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
                  label="Current Members"
                  color="primary"
                  sx={{ fontWeight: 300, fontSize: '1.2rem' }}
               />
               <Chip
                  label="Current Members"
                  color="primary"
                  sx={{ fontWeight: 300, fontSize: '1.2rem' }}
               />
               <Chip
                  label="Current Members"
                  color="primary"
                  sx={{ fontWeight: 300, fontSize: '1.2rem' }}
               />
               <Chip
                  label="Current Members"
                  color="primary"
                  sx={{ fontWeight: 300, fontSize: '1.2rem' }}
               />
               <Chip
                  label="Current Members"
                  color="primary"
                  sx={{ fontWeight: 300, fontSize: '1.2rem' }}
               />
            </Box>
         </Box>
      </Container>
   )
}
