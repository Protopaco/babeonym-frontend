import { useEffect, useState } from 'react';
import { userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';
import normalizeNameInput from '@/utils/normalizeNameInput';

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

  // A surname obeys the same rules as a name typed into the list — same
  // characters, same length — because it is shown alongside them. Applied here
  // rather than in SettingsRow, which is a generic field and should not know
  // what its value means.
  //
  // The effect above stays raw on purpose: it carries the server's value, and
  // normalizing there would silently edit what the user already saved.
  const changeSurNameDraft = (value: string) => {
    setSurNameDraft(normalizeNameInput(value));
  };

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
    changeSurNameDraft,
    surNameIsDirty,
    pending,
    errorMessage,
    saveSurName,
  };
};
