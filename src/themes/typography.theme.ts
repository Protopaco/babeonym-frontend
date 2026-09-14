import type { Theme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';

const typography = (theme: Theme) => ({
  typography: {
    fontFamily: FONT_FAMILY,

    h1: {
      fontWeight: 700,
      fontSize: '36px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '70px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '80px',
      },
    },

    h2: {
      fontWeight: 600,
      fontSize: '28px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '55px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '60px',
      },
    },

    h3: {
      fontWeight: 600,
      fontSize: '24px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '32px',
      },
    },

    body1: {
      fontWeight: 400,
      fontSize: '16px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '20px',
      },
    },
  },
});

export default typography;
