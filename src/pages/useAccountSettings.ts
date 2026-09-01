import { useEffect, useState } from 'react';
import { authApi, userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';
import type { ThemeId } from '@/themes/types.theme';

const DEFAULT_THEME: ThemeId = 'light';
const SAVE_ERROR_MESSAGE = 'We could not save your changes. Please try again.';
const LOGOUT_ERROR_MESSAGE = 'We could not log you out. Please try again.';

export const useAccountSettings = () => {
  const {
    state: { user, userProviderLoaded },
    dispatch,
  } = useUser();

  const [surNameDraft, setSurNameDraft] = useState('');
  const [themeDraft, setThemeDraft] = useState<ThemeId>(DEFAULT_THEME);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Server values are the source of truth. Re-syncing here also covers the
  // refetch that follows a successful save or logout.
  useEffect(() => {
    setSurNameDraft(user?.surName ?? '');
    setThemeDraft((user?.theme as ThemeId) ?? DEFAULT_THEME);
  }, [user?.id, user?.surName, user?.theme]);

  const refreshUser = async () => {
    const { user: refreshedUser } = await userApi.v1UserGet();
    dispatch({ type: 'ADD_USER', payload: refreshedUser });
  };

  const saveChanges = async () => {
    setPending(true);
    setErrorMessage(null);
    try {
      const trimmedSurName = surNameDraft.trim();
      await userApi.v1UserSettings({
        v1UserSettingsRequest: {
          theme: themeDraft,
          surName: trimmedSurName === '' ? null : trimmedSurName,
        },
      });
      await refreshUser();
    } catch (err) {
      console.error('Unable to save account settings.', err);
      setErrorMessage(SAVE_ERROR_MESSAGE);
    } finally {
      setPending(false);
    }
  };

  const logOut = async () => {
    setPending(true);
    setErrorMessage(null);
    try {
      await authApi.v1AuthLogout();
      await authApi.v1AuthAnonymous();
      await refreshUser();
    } catch (err) {
      console.error('Unable to log out.', err);
      setErrorMessage(LOGOUT_ERROR_MESSAGE);
    } finally {
      setPending(false);
    }
  };

  return {
    user,
    userProviderLoaded,
    surNameDraft,
    setSurNameDraft,
    themeDraft,
    setThemeDraft,
    pending,
    errorMessage,
    saveChanges,
    logOut,
  };
};
