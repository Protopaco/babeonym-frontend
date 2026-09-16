import { useEffect, useState } from 'react';
import { userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';
import normalizeNameInput from '@/utils/normalizeNameInput';
import capitalizeNameSegments from '@/utils/capitalizeNameSegments';

const SAVE_ERROR_MESSAGE = 'We could not save your changes. Please try again.';

// Offered only when the whole surname is lower case. A capital anywhere means
// the user was thinking about case, so van der Berg and McKenna are left alone —
// which is what keeps this an offer rather than a correction the user cannot
// undo.
const getSurNameSuggestion = (savedSurName: string): string | null => {
  if (savedSurName === '' || savedSurName !== savedSurName.toLowerCase()) {
    return null;
  }

  const capitalized = capitalizeNameSegments(savedSurName);
  return capitalized === savedSurName ? null : capitalized;
};

export const useSettings = () => {
  const {
    state: { user, userProviderLoaded },
    dispatch,
  } = useUser();

  const [surNameDraft, setSurNameDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Transient. Set by a save, cleared by the next edit, never stored — ignoring
  // it is how a user says no.
  const [surNameSuggestion, setSurNameSuggestion] = useState<string | null>(null);

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
    setSurNameSuggestion(null);
  };

  const refreshUser = async () => {
    const { user: refreshedUser } = await userApi.v1UserGet();
    dispatch({ type: 'ADD_USER', payload: refreshedUser });
  };

  // Takes the value explicitly so accepting a suggestion can save the new
  // string rather than the draft a closure captured. Kept private, and wrapped
  // below by functions that take nothing: SettingsRow passes its onSave
  // straight to an onClick, so anything it can reach is handed a click event.
  const persistSurName = async (valueToSave: string) => {
    setPending(true);
    setErrorMessage(null);
    setSurNameSuggestion(null);
    try {
      const trimmedSurName = valueToSave.trim();
      await userApi.v1UserSettings({
        v1UserSettingsRequest: {
          surName: trimmedSurName === '' ? null : trimmedSurName,
        },
      });
      await refreshUser();
      // After the save, so the surname on offer is the one that is stored.
      setSurNameSuggestion(getSurNameSuggestion(trimmedSurName));
    } catch (err) {
      console.error('Unable to save the surname.', err);
      setErrorMessage(SAVE_ERROR_MESSAGE);
    } finally {
      setPending(false);
    }
  };

  const saveSurName = async () => {
    await persistSurName(surNameDraft);
  };

  const acceptSurNameSuggestion = async () => {
    if (surNameSuggestion === null) {
      return;
    }

    setSurNameDraft(surNameSuggestion);
    await persistSurName(surNameSuggestion);
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
    surNameSuggestion,
    acceptSurNameSuggestion,
  };
};
