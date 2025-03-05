import React from 'react';
import Image from 'next/image';
import { Wrapper, containerStyle, imageWrapperStyle, imageStyle, detailsContainerStyle } from './style';
import { generationCopyShort } from '../../constants';
import ActiveChip from '../ActiveChip';
import Ribbon from '../Ribbon';

import { Typography, Box } from '@mui/material';

const generationColorMapper = {
  1: 'white',
  2: 'red',
  3: 'pink',
  4: 'purple',
  5: 'blue-grey',
  6: 'light-green',
  7: 'green',
  8: 'blue-sky',
  9: 'blue-dodger',
  10: 'light-blue',
  11: 'orange',
  12: 'beige',
  13: 'yellow',
};

const MemberImage = ({ member, onClick }) => {
  const { picture, name, generation, graduated } = member;
  return (
    <Wrapper item xs={5} alignSelf="stretch">
      <Ribbon content={generationCopyShort(generation)} color={generationColorMapper[generation]}>
        <Box sx={containerStyle} onClick={onClick}>
          <Box sx={imageWrapperStyle}>
            <Image src={picture} alt="product-image" width={256} height={325} style={imageStyle} objectFit="cover" />
          </Box>
          <Box sx={detailsContainerStyle}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="notranslate"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                fontSize: '1.25rem',
                fontWeight: 500,
                width: '100%',
              }}
            >
              {name}
            </Typography>
            <ActiveChip graduated={graduated} />
          </Box>
        </Box>
      </Ribbon>
    </Wrapper>
  );
};

export default MemberImage;
