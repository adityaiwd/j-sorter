import React from 'react';
import { Chip } from '@mui/material';

const index = ({ graduated }) => {
  return (
    <Chip
      label={graduated ? 'Graduated' : 'Active'}
      size="small"
      color={!graduated ? 'success' : 'default'}
      sx={{ fontWeight: 600, fontSize: '1rem' }}
    />
  );
};

export default index;
