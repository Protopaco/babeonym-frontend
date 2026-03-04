import { createTheme } from '@mui/material/styles';
import type { ThemeId } from '@/themes/types.theme.ts';
import lightTheme from '@/themes/light.theme';
import darkTheme from '@/themes/dark.theme';
import blueTheme from '@/themes/blue.theme';
import pinkTheme from '@/themes/pink.theme';

export const themeRegistry: Record<ThemeId, ReturnType<typeof createTheme>> = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
  pink: pinkTheme,
};
