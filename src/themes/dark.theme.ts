import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import applyPalette from '@/themes/applyPalette';

const semanticPalette: SemanticPalette = {
  primary: '#9400D8',
  primaryContrast: '#F5F5F5',
  secondary: '#E7C5FF',
  secondaryContrast: '#7B00B4',
  selected: '#E8B6FF',
  textPrimary: '#000000',
  textSecondary: '#F5F5F5',
  background: '#292929',
};

export default createTheme(applyPalette(semanticPalette));
