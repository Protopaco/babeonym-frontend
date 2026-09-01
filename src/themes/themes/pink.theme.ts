import { createTheme } from '@mui/material/styles';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
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
  ...zIndex,
});

theme = createTheme(theme, typography(theme));

export default theme;
