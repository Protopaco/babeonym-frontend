import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import applyPalette from '@/themes/applyPalette';

const semanticPalette: SemanticPalette = {
  primary: '#7B00B4',
  primaryContrast: '#FFFFFF',
  secondary: '#EED7FF',
  secondaryContrast: '#5E227A',
  selected: '#E8B6FF',
  textPrimary: '#000000',
  textSecondary: '#7B00B4',
  background: '#FFFFFF',
};

export default createTheme(applyPalette(semanticPalette));
