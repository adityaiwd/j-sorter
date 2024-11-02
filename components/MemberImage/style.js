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

export const containerStyle = css({
  width: '100%',
  borderRadius: '0.6rem',
  background: 'rgba(255, 255, 255, 0.7)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  '&:active': {
    transform: 'translateY(-2px)',
  },
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const imageWrapperStyle = css({
  width: '100%',
  padding: '5%',
  position: 'relative',
  overflow: 'hidden',
});

export const imageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: '0.65rem',
};

export const detailsContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  margin: '0 .5rem .5rem',
  flexWrap: 'wrap',
  alignSelf: 'flex-start',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  whiteSpace: 'normal',
  width: '100%',
});

export const memberNameStyle = {
  fontSize: '1.2rem',
  fontWeight: 700,
};
