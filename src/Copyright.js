import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="h6" color="primary" align="center" sx={{textTransform:'uppercase', fontSize: '1.2rem', fontWeight: 600}}>
      Copyright © {new Date().getFullYear()},{' '}
      <MuiLink color="inherit" href="https://https://rebornian48.github.io/" target="_blank" rel="noopener noreferrer">
       Rebornian48
      </MuiLink>
      {' '}X{' '}
      <MuiLink color="inherit" href="https://dev-wicak.netlify.app/" target="_blank" rel="noopener noreferrer">
       Wicak
      </MuiLink>
    </Typography>
  );
}