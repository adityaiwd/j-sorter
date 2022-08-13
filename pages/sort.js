import * as React from 'react'
import { Grid, Container, Typography, Box, Button, Chip } from '@mui/material'
import Image1 from '../assets/member/fiony_alveria.jpg'
import MemberImage from '../components/MemberImage'
import LinearProgressWithLabel from '../components/LinearProgressWithLabel'

export default function Sort() {
   return (
      <Container maxWidth="sm">
         <Box>
            <Typography
               variant="h3"
               component="h3"
               color="primary"
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
               <MemberImage src={Image1} name="Fiony Alveria Tantri" />
               <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  <Typography
                     variant="h4"
                     component="h4"
                     color="primary"
                     sx={{ fontWeight: 300 }}
                  >
                     OR
                  </Typography>
               </Grid>
               <MemberImage src={Image1} name="Fiony Alveria Tantri" />
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
         {/* <Box >
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
    </Box> */}
      </Container>
   )
}
