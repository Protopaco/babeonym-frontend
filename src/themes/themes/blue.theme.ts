import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#17365D',
  primaryTint: '#687585',
  primaryContrast: '#F8FBFF',

  secondary: '#F8FBFF',
  secondaryContrast: '#17365D',

  action: '#065AC7',
  actionTint: '#E4EFFF',
  actionContrast: '#F8FBFF',

  danger: '#B5444D',
  dangerTint: '#F1D6D8',
  dangerContrast: '#F8FBFF',

  textPrimary: '#17365D',
  textSecondary: '#17365D',

  background: '#F8FBFF',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
