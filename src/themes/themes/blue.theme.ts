import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#065AC7',
  primaryContrast: '#FFFFFF',
  secondary: '#88B7FF',
  secondaryContrast: '#0042BC',
  action: '#065AC7',
  actionContrast: '#FFFFFF',
  danger: '#B5444D',
  dangerTint: '#F1D6D8',
  dangerContrast: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#065AC7',
  background: '#C6E0FF',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
