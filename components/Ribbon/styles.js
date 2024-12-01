import { css } from '@emotion/react';

const ribbonColorMapper = {
  default: {
    background: '#F94D63',
    foldColor: '#B31D40',
    color: '#FFFFFF',
  },
  white: {
    background: '#FFFFFF',
    foldColor: '#D6DFEB',
    color: '#F94D63',
  },
  red: {
    background: '#F94D63',
    foldColor: '#B31D40',
    color: '#FFFFFF',
  },
  pink: {
    background: '#FF919F',
    foldColor: '#CC4C14',
    color: '#FFFFFF',
  },
  purple: {
    background: '#DEAFFF',
    foldColor: '#B26EF5',
    color: '#FFFFFF',
  },
  'blue-grey': {
    background: '#C5FCFF',
    foldColor: '#46D8F1',
    color: '#6D7588',
  },
  'light-green': {
    background: '#4FE397',
    foldColor: '#098A4E',
    color: '#FFFFFF',
  },
  green: {
    background: '#00AA5B',
    foldColor: '#007A3D',
    color: '#FFFFFF',
  },
  'blue-sky': {
    background: '#0479B9',
    foldColor: '#06649E',
    color: '#FFFFFF',
  },
  'blue-dodger': {
    background: '#28B9E1',
    foldColor: '#0479B9',
    color: '#FFFFFF',
  },
  'light-blue': {
    background: '#46D8F1',
    foldColor: '#0094CF',
    color: '#FFFFFF',
  },
  orange: {
    background: '#FF7F17',
    foldColor: '#CC4C14',
    color: '#FFFFFF',
  },
  beige: {
    background: '#e4d5b7',
    foldColor: '#aa9b82',
    color: '#FFFFFF',
  },
  yellow: {
    background: '#F7E078',
    foldColor: '#EAD984',
    color: '#1E1E1E'
  }
};

export const cssRibbon = (color = 'default') =>
  css(
    {
      position: 'relative',
      display: 'block',
      '>[data-n-ribbon]': {
        display: 'block',
        position: 'absolute',
        background: ribbonColorMapper[color].background,
        color: ribbonColorMapper[color].color,
        fontWeight: 800,
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '100%',
          width: '4px',
          height: '4px',
          background: ribbonColorMapper[color].foldColor,
        },
        '&[data-n-ribbon="left"]': {
          left: 'calc(0px - 4px)',
          '&::before': { left: 0, borderBottomLeftRadius: '100%' },
        },
        '&[data-n-ribbon="right"]': {
          right: 'calc(0px - 4px)',
          '&::before': { right: 0, borderBottomRightRadius: '100%' },
        },
      },
    },
    {
      '--ribbon-fold-size': '4px',
      '>[data-n-ribbon]': {
        top: 8,
        padding: '4px 8px',
        fontSize: '1.1rem',
        lineHeight: '12/10',
        '&[data-n-ribbon="left"]': { borderRadius: '8px 12px 12px 0' },
        '&[data-n-ribbon="right"]': { borderRadius: '12px 8px 0px 12px' },
      },
    },
  );
