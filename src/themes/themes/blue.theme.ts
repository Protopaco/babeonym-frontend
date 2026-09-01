import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPalette = {
  primary: '#065AC7',
  primaryContrast: '#FFFFFF',
  secondary: '#88B7FF',
  secondaryContrast: '#0042BC',
  selected: '#9DC3FF',
  textPrimary: '#000000',
  textSecondary: '#065AC7',
  background: '#C6E0FF',
  swatch: 'primary',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
});

theme = createTheme(theme, typography(theme));

export default theme;
