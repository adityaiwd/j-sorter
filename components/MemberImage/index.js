import React from 'react';
import { useTheme } from '@mui/material';
import Image from 'next/image';
import { Wrapper } from './style';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { generationCopy } from '../../constants';
import ActiveChip from '../ActiveChip';

import { Paper, Typography, CardActionArea, CardActions, Chip, Box } from '@mui/material';

const MemberImage = ({ member, onClick }) => {
  const { picture, name, generation, graduated } = member;
  const theme = useTheme();
  return (
    <Wrapper item xs={5} alignSelf="stretch">
      {/* <Paper
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
        <Image blurDataURL='/assets/blurImage.jpg' placeholder='blur' src={src} alt={name} layout="fill" objectFit="contain" />
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
      </Typography> */}
      <Card sx={{ width: '100%' }} onClick={onClick}>
        <CardActionArea>
          <CardMedia component="img" height="200" image={picture} alt={name} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '1.2rem', fontWeight: 700 }}
            >
              {name}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1rem' }}>
              {generationCopy(generation)}
            </Typography>
              <ActiveChip graduated={graduated} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Wrapper>
  );
};

export default MemberImage;
