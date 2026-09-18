import type { SemanticPaletteColors } from '@/models/SemanticPaletteColors';
import { BRAND_LOGO_COLOR } from '@/constants/brandLogoColor';
import motion from '@/themes/motion.theme';

export default ({
  primary,
  primaryTint,
  primaryContrast,
  secondary,
  secondaryContrast,
  action,
  actionContrast,
  actionTint,
  danger,
  dangerTint,
  dangerContrast,
  textPrimary,
  textSecondary,
  background,
}: SemanticPaletteColors) => {
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
      error: {
        main: danger,
        contrastText: dangerContrast,
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

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-brand-logo': BRAND_LOGO_COLOR,
            '--color-primary': primary,
            '--color-primary-tint': primaryTint,
            '--color-primary-contrast': primaryContrast,
            '--color-primary-highlight': `${primary}1A`,
            '--color-primary-edge': `${primary}33`,

            '--color-secondary': secondary,
            '--color-secondary-contrast': secondaryContrast,

            '--color-action': action,
            '--color-action-contrast': actionContrast,
            '--color-action-tint': actionTint,

            '--color-text-primary': textPrimary,
            '--color-text-secondary': textSecondary,
            '--color-scroll-edge': `${textPrimary}14`,

            '--color-background': background,
            '--color-border': `${textPrimary}1F`,
            '--color-error': danger,
            '--color-error-tint': dangerTint,
            '--color-error-contrast': dangerContrast,
            '--box-shadow-primary': `0 2px 4px ${actionTint}`,

            '--box-shadow-action-button-pressed': `0 1px 2px ${action}33`,

            '--width-workspace-column': '1200px',
            '--height-filter-drawer-open': '50dvh',
            '--height-filter-drawer-closed': '67px',
            '--height-filter-chip-row': '40px',

            // No --height-header. The header sits in flow and the page clears
            // it on its own — see Header.css. This one is the mobile bar's own
            // height, not a clearance the page has to reserve.
            '--height-header-mobile': '96px',
            '--height-control': '56px',

            ...motion.cssVariables,
          },
        },
      },
    },
  };
};
