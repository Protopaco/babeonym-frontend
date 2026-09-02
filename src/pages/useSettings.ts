import { useEffect, useState } from 'react';
import { userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';

const SAVE_ERROR_MESSAGE = 'We could not save your changes. Please try again.';

export const useSettings = () => {
  const {
    state: { user, userProviderLoaded },
    dispatch,
  } = useUser();

  const [surNameDraft, setSurNameDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Server values are the source of truth. Re-syncing here also covers the
  // refetch that follows a successful save.
  useEffect(() => {
    setSurNameDraft(user?.surName ?? '');
  }, [user?.id, user?.surName]);

  const surNameIsDirty = surNameDraft.trim() !== (user?.surName ?? '');

  const refreshUser = async () => {
    const { user: refreshedUser } = await userApi.v1UserGet();
    dispatch({ type: 'ADD_USER', payload: refreshedUser });
  };

  const saveSurName = async () => {
    setPending(true);
    setErrorMessage(null);
    try {
      const trimmedSurName = surNameDraft.trim();
      await userApi.v1UserSettings({
        v1UserSettingsRequest: {
          surName: trimmedSurName === '' ? null : trimmedSurName,
        },
      });
      await refreshUser();
    } catch (err) {
      console.error('Unable to save the surname.', err);
      setErrorMessage(SAVE_ERROR_MESSAGE);
    } finally {
      setPending(false);
    }
  };

  return {
    user,
    userProviderLoaded,
    surNameDraft,
    setSurNameDraft,
    surNameIsDirty,
    pending,
    errorMessage,
    saveSurName,
  };
};
