import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/models/SemanticPalette';

const defaultTheme = createTheme();
const defaultError = defaultTheme.palette.error;

export default ({
  primary,
  primaryContrast,
  secondary,
  secondaryContrast,
  selected,
  textPrimary,
  textSecondary,
  background,
  swatch,
}: SemanticPalette) => {
  const swatchColor = {
    primary,
    primaryContrast,
    secondary,
    secondaryContrast,
    selected,
    textPrimary,
    textSecondary,
    background,
  }[swatch];

  return {
    palette: {
      primary: {
        main: primary,
        contrastText: primaryContrast,
      },
      secondary: {
        main: secondary,
        contrastText: secondaryContrast,
      },
      selected: {
        main: selected,
      },
      swatch: {
        main: swatchColor,
      },
      background: {
        default: background,
        paper: background,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-primary': primary,
            '--color-primary-contrast': primaryContrast,
            '--color-primary-highlight': `${primary}1A`,
            '--color-primary-edge': `${primary}33`,

            '--color-secondary': secondary,
            '--color-secondary-contrast': secondaryContrast,

            '--color-selected': selected,

            '--color-swatch': swatchColor,

            '--color-text-primary': textPrimary,
            '--color-text-secondary': textSecondary,
            '--color-scroll-edge': `${textPrimary}14`,

            '--color-background': background,
            '--color-border': `${textPrimary}1F`,
            '--color-error': defaultError.main,
            '--color-error-contrast': defaultError.contrastText,
            '--box-shadow-primary': `0 4px 4px ${secondaryContrast}80`,

            '--width-filter-drawer-open': '450px',
            '--width-filter-drawer-closed': '72px',
            '--height-filter-drawer-open': 'calc(100dvh - 48px)',
            '--height-filter-drawer-closed': '88px',
            '--bottom-floating-tutorial-icon-mobile': 'calc(var(--height-filter-drawer-closed) + 15px)',

            '--height-header': '124px',
          },
        },
      },
    },
  };
};
