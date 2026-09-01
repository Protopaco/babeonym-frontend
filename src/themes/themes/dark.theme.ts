import { createTheme } from '@mui/material/styles';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#9400D8',
  primaryContrast: '#F5F5F5',
  secondary: '#E7C5FF',
  secondaryContrast: '#7B00B4',
  selected: '#E8B6FF',
  textPrimary: '#000000',
  textSecondary: '#F5F5F5',
  background: '#292929',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
});

theme = createTheme(theme, typography(theme));

export default theme;
