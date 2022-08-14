import React from 'react'
import Image from 'next/image'
import { Wrapper } from './style'
import { Paper, Typography } from '@mui/material'

const MemberImage = ({ src, name }) => {
   return (
      <Wrapper item xs={5} alignSelf="stretch">
         <Paper
            elevation={2}
            sx={{ height: '90%', position: 'relative', overflow: 'hidden', borderRadius:2 }}
         >
            <Image priority src={src} alt={name} layout="fill" objectFit='contain' />
         </Paper>
         <Typography
            variant="h5"
            component="h5"
            align='center'
            sx={{
               fontWeight: 700,
               fontSize: '1.8rem',
            }}
            mt={1}
         >
            {name}
         </Typography>
      </Wrapper>
   )
}

export default MemberImage
