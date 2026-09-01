export type ThemeId = 'light' | 'dark' | 'blue' | 'pink';

export type SemanticPaletteColors = {
  primary: string;
  primaryContrast: string;
  secondary: string;
  secondaryContrast: string;
  selected: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
};

export type SemanticPalette = SemanticPaletteColors & {
  /**
   * Which palette color represents this theme in a theme picker. Each theme
   * names its own source, so changing that color updates the swatch with it.
   */
  swatch: keyof SemanticPaletteColors;
};
