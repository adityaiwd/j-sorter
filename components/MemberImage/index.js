import React from 'react';
import { useTheme } from '@mui/material';
import Image from 'next/image';
import { Wrapper } from './style';
import { Paper, Typography } from '@mui/material';

const MemberImage = ({ src, name, onClick }) => {
  const theme = useTheme();
  return (
    <Wrapper item xs={4} alignSelf="stretch">
      <Paper
        elevation={2}
        sx={{
          height: '90%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          backgroundColor: theme.palette.primary.main,
        }}
        onClick={onClick}
      >
        <Image priority src={src} alt={name} layout="fill" objectFit="contain" />
      </Paper>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        sx={{
          fontWeight: 700,
          fontSize: '1.4rem',
        }}
        mt={1}
      >
        {name}
      </Typography>
    </Wrapper>
  );
};

export default MemberImage;
