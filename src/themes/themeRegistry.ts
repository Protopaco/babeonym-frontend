import { createTheme } from '@mui/material/styles';
import type { ThemeId } from '@/models/ThemeId';
import lightTheme from '@/themes/themes/light.theme';
import darkTheme from '@/themes/themes/dark.theme';
import blueTheme from '@/themes/themes/blue.theme';
import pinkTheme from '@/themes/themes/pink.theme';

export const themeRegistry: Record<ThemeId, ReturnType<typeof createTheme>> = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
  pink: pinkTheme,
};
