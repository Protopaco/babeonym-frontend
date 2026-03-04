import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';

const semanticPalette: SemanticPalette = {
  primary: '#7B00B4',
  primaryContrast: '#FFFFFF',
  secondary: '#EED7FF',
  secondaryContrast: '#5E227A',
  selected: '#E8B6FF',
  textPrimary: '#000000',
  textSecondary: '#7B00B4',
  background: '#FFFFFF',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
});

theme = createTheme(theme, typography(theme));

export default theme;
