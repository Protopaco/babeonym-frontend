import type { SemanticPalette } from '@/themes/types.theme.ts';

export default ({ primary, primaryContrast, secondary, secondaryContrast, selected, textPrimary, textSecondary, background }: SemanticPalette) => {
  return {
    palette: {
      primary: {
        main: primary,
        contrastText: primaryContrast,
      },
      secondary: {
        main: secondary,
        contrastText: secondaryContrast,
      },
      selected: {
        main: selected,
      },
      background: {
        default: background,
        paper: background,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
    },
  };
};
