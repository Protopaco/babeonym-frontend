import { createTheme } from '@mui/material/styles';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import { FONT_FAMILY } from '@/constants/fontFamily';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#2d0f51',
  primaryTint: '#6f6c72',
  primaryContrast: '#FBFBFA',
  secondary: '#FBFBFA',
  secondaryContrast: '#1D1D1F',
  action: '#78449A',
  actionContrast: '#FBFBFA',
  actionTint: '#f1eaf8',
  danger: '#B5444D',
  dangerTint: '#F1D6D8',
  dangerContrast: '#FBFBFA',
  textPrimary: '#2d0f51',
  textSecondary: '#2d0f51',
  background: '#FBFBFA',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
