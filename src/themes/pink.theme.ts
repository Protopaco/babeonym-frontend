import { createTheme } from '@mui/material/styles';
import type { SemanticPalette } from '@/themes/types.theme.ts';
import applyPalette from '@/themes/applyPalette';

const semanticPalette: SemanticPalette = {
  primary: '#D04883',
  primaryContrast: '#FFFFFF',
  secondary: '#FFCCE9',
  secondaryContrast: '#A60F51',
  selected: '#FFB9C9',
  textPrimary: '#000000',
  textSecondary: '#D04883',
  background: '#FFEDFA',
};

export default createTheme(applyPalette(semanticPalette));
