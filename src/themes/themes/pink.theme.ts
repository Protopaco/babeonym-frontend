import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#4A2558',
  primaryTint: '#746A78',
  primaryContrast: '#FFF9FB',

  secondary: '#FFF9FB',
  secondaryContrast: '#4A2558',

  action: '#C4417A',
  actionTint: '#F8E4ED',
  actionContrast: '#FFF9FB',

  danger: '#A93645',
  dangerTint: '#F3D7DB',
  dangerContrast: '#FFF9FB',

  textPrimary: '#4A2558',
  textSecondary: '#4A2558',

  background: '#FFF9FB',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
