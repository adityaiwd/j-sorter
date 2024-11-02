import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { cssRibbon } from './styles';

const Ribbon = ({ children, content, placement = 'left', color }) => {
  return (
    <Box sx={cssRibbon(color)}>
      {children}
      {Boolean(content) && (
        <Typography variant="span" component="span" data-n-ribbon={placement}>
          {content}
        </Typography>
      )}
    </Box>
  );
};

export default memo(Ribbon);
