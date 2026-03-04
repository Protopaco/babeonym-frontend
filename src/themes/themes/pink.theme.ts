import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';

const semanticPalette: SemanticPalette = {
  primary: '#D04883',
  primaryContrast: '#FFFFFF',
  secondary: '#FFCCE9',
  secondaryContrast: '#A60F51',
  selected: '#FFB9C9',
  textPrimary: '#000000',
  textSecondary: '#D04883',
  background: '#FFEDFA',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
});

theme = createTheme(theme, typography(theme));

export default theme;
