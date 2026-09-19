import { createTheme } from '@mui/material/styles';
import { FONT_FAMILY } from '@/constants/fontFamily';
import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import palette from '@/themes/palette.theme';
import breakpoints from '@/themes/breakpoints.theme';
import typography from '@/themes/typography.theme';
import zIndex from '@/themes/zIndex.theme';

const semanticPalette: SemanticPaletteColors = {
  primary: '#F1ECF4',
  primaryTint: '#B7ACBC',
  primaryContrast: '#120D16',

  secondary: '#19121E',
  secondaryContrast: '#F1ECF4',

  action: '#985EB5',
  actionTint: '#2B1B35',
  actionContrast: '#120D16',

  danger: '#D85C68',
  dangerTint: '#3A171E',
  dangerContrast: '#FFF8F9',

  textPrimary: '#F1ECF4',
  textSecondary: '#C8BDCD',

  background: '#0D0911',
};

let theme = createTheme({
  ...breakpoints,
  ...palette(semanticPalette, 'dark'),
  ...zIndex,
  typography: { fontFamily: FONT_FAMILY },
});

theme = createTheme(theme, typography(theme));

export default theme;
