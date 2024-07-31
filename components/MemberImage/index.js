import React from 'react';
import Image from 'next/image';
import { Wrapper, cardStyles, shineStyles } from './style';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { generationCopy } from '../../constants';
import ActiveChip from '../ActiveChip';

import { Typography, CardActionArea, Box } from '@mui/material';

const MemberImage = ({ member, onClick }) => {
  const { picture, name, generation, graduated } = member;
  const isOrel = name === 'Aurellia'
  return (
    <Wrapper sx={isOrel ? cardStyles : undefined} item xs={5} alignSelf="stretch">
      <Card sx={{ width: '100%' }} onClick={onClick}>
        <CardActionArea>
          <CardMedia component="div" sx={{ height: 200, position: 'relative' }}>
            <Image
              blurDataURL="/assets/blurImage.jpg"
              placeholder="blur"
              src={picture}
              alt={name}
              layout="fill"
              objectFit="cover"
            />
          </CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              {name}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                {generationCopy(generation)}
              </Typography>
              <ActiveChip graduated={graduated} />
            </Box>
          </CardContent>
          {isOrel && <Box sx={shineStyles}></Box>}
        </CardActionArea>
      </Card>
    </Wrapper>
  );
};

export default MemberImage;
