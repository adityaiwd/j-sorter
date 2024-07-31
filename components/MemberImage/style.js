import { css, keyframes } from '@emotion/react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Grid)({
  transition: 'all 0.2s ease-out',
  cursor: 'pointer',
  textOverflow: 'ellipsis',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
});

const shimmy = keyframes`
  0%, 100% {
    transform: rotateY(0deg) skewX(0deg);
  }
  50% {
    transform: rotateY(30deg) skewX(3deg);
  }
`;

const shine = keyframes`
  0%, 100% {
    margin-top: -100px;
  }
  50% {
    margin-top: 800px;
  }
`;

export const cardStyles = css({
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '5px',
  boxShadow: 'inset 5px 5px 20px rgba(255, 255, 255, 0.1)',
  animation: `${shimmy} 6s ease-in-out infinite`,
});

export const shineStyles = css({
  width: '1000px',
  height: '100px',
  marginLeft: '-100px',
  transform: 'rotate(30deg)',
  background: 'linear-gradient(to bottom, transparent, rgba(200, 200, 200, 0.1), transparent)',
  position: 'absolute',
  animation: `${shine} 6s ease-in-out infinite`,
});
