import React from 'react';
import { Box, Typography } from '@mui/material';

const index = ({ graduated }) => {
  return (
    <Box
      sx={{
        background: graduated ? 'rgba(228,235,245,0.7)' : 'rgba(237, 255, 249)',
        alignSelf: 'flex-start',
        padding: '.2rem 1rem',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '.5rem',
      }}
    >
      <Typography
        variant="p"
        component="p"
        sx={{
          fontSize: '1.25rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.05rem',
          color: graduated ? '#696D78' : '#00AA5B',
        }}
      >
        {graduated ? 'Graduated' : 'Active'}
      </Typography>
    </Box>
  );
};

export default index;
