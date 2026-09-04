import { createTheme } from '@mui/material/styles';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';

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
}: SemanticPaletteColors) => {
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
            '--height-filter-drawer-open': '50dvh',
            '--height-filter-drawer-closed': '88px',
            '--height-filter-chip-row': '40px',
            '--bottom-floating-tutorial-icon-mobile': 'calc(var(--height-filter-drawer-closed) + 15px)',

            '--height-header': '124px',
            '--height-header-mobile': '96px',
            '--height-control': '56px',
          },
        },
      },
    },
  };
};
