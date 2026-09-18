import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';
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
  action: '#D04883',
  actionContrast: '#FFFFFF',
  danger: '#B5444D',
  dangerTint: '#F1D6D8',
  dangerContrast: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#D04883',
  background: '#FFEDFA',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
