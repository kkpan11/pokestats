import { AppBar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 'auto',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
}));

const Logo = styled(motion.a)(({ theme }) => ({
  ...theme.typography.mainHeading,

  '&:hover': {
    cursor: 'pointer',
  },

  [theme.breakpoints.up('xxs')]: {
    fontSize: '4.2em',
    lineHeight: 1,
  },
}));

export { HeaderContainer, ContentContainer, Logo };
