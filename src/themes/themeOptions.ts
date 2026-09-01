import type { ThemeId } from '@/models/ThemeId';
import type { ThemeOption } from '@/models/ThemeOption';

const themeLabels: Record<ThemeId, string> = {
  light: 'Light',
  dark: 'Dark',
  blue: 'Blue',
  pink: 'Pink',
};

export const themeOptions: ThemeOption[] = (Object.keys(themeLabels) as ThemeId[]).map((id) => ({
  id,
  label: themeLabels[id],
}));
