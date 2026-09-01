import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';

export type SemanticPalette = SemanticPaletteColors & {
  /**
   * Which palette color represents this theme in a theme picker. Each theme
   * names its own source, so changing that color updates the swatch with it.
   */
  swatch: keyof SemanticPaletteColors;
};
