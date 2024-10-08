'use client';

// components
import { motion } from '@/client';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import type { NavigationButtonProps } from './NavigationButton';

const BtnContainer = styled(motion.div)(({ theme }) => ({
  transition: 'box-shadow 0.05s ease-in-out',
  width: '300px',
  cursor: 'pointer',

  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ? theme.shadows[5] : theme.shadows[3],
  },

  '&:active': {
    boxShadow: theme.shadows[1],
  },
}));

const BtnSpan = styled('span')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90px',
  width: '50%',
  padding: `0 ${theme.spacing(2)}`,
}));

const Arrow = styled(BtnSpan, {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: NavigationButtonProps['direction'] }>(({ direction, theme }) => {
  const primaryMainColor = theme.palette.primary.main;

  return {
    position: 'relative',
    zIndex: -1,

    '&:after': {
      content: "''",
      position: 'absolute',
      borderTop: '45px solid transparent',
      borderBottom: '45px solid transparent',
      transition: 'all 0.15s ease-in-out',
      zIndex: -1,
      ...(direction === 'left' && {
        borderRight: `15px solid ${primaryMainColor}`,
        boxShadow: `12px 0 0 0 ${primaryMainColor}`,
        right: 0,
      }),
      ...(direction === 'right' && {
        borderLeft: `15px solid ${primaryMainColor}`,
        boxShadow: `-12px 0 0 0 ${primaryMainColor}`,
        left: 0,
      }),
    },
  };
});

const Title = styled(BtnSpan)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  maxWidth: '150px',
  textAlign: 'center',
  width: '150px',
  transition: 'all 0.15s ease-in-out',
  zIndex: 3,
}));

const BtnAnchor = styled(Link, {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: NavigationButtonProps['direction'] }>(({ direction, theme }) => ({
  display: 'flex',
  fontWeight: 600,
  border: `1px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',

  ...(direction === 'left' && {
    borderRadius: '5px 0 0 5px',
    borderRight: 'none',
    flexDirection: 'row',
  }),

  ...(direction === 'right' && {
    borderRadius: '0 5px 5px 0',
    borderLeft: 'none',
    flexDirection: 'row-reverse',
  }),

  '& img': {
    padding: '10px',
    transition: 'all 0.15s ease-in-out',
  },

  '&:hover': {
    '& img': {
      transform: 'scale(1.2)',
    },

    '& span:after': {
      left: direction === 'right' ? '10px' : undefined,
      right: direction === 'left' ? '10px' : undefined,
    },
  },
}));

export { BtnContainer, BtnAnchor, Title, Arrow };
