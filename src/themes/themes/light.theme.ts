import { createTheme } from '@mui/material/styles';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import { FONT_FAMILY } from '@/constants/fontFamily';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
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
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
