import { userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';
import type { ThemeId } from '@/models/ThemeId';

const DEFAULT_THEME: ThemeId = 'light';

export const useThemePicker = () => {
  const {
    state: { user },
    dispatch,
  } = useUser();

  const activeThemeId = (user?.theme as ThemeId) ?? DEFAULT_THEME;

  const selectTheme = async (themeId: ThemeId) => {
    if (!user || themeId === activeThemeId) {
      return;
    }

    // Apply immediately so the app repaints on click, then persist. A failed
    // save puts the previous theme back rather than surfacing an error.
    dispatch({ type: 'ADD_USER', payload: { ...user, theme: themeId } });

    try {
      await userApi.v1UserTheme({ v1UserThemeRequest: { theme: themeId } });
    } catch (err) {
      console.error('Unable to save the selected theme.', err);
      dispatch({ type: 'ADD_USER', payload: user });
    }
  };

  return {
    activeThemeId,
    selectTheme,
  };
};
