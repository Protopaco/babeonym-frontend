import { useNavigate } from 'react-router-dom';
import { authApi, userApi } from '@/api/client';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useUser } from '@/state/user/user.context';

export const useResetToAnonymousSession = () => {
  const { dispatch } = useUser();
  const { dispatch: givenNameDispatch } = useGivenNames();
  const navigate = useNavigate();

  // Ending a session immediately starts an anonymous one, so the app always has
  // a user to work with.
  const resetToAnonymousSession = async () => {
    await authApi.v1AuthAnonymous();
    const { user: refreshedUser } = await userApi.v1UserGet();

    // Cleared before the new user lands, so the previous account's names are
    // never on screen alongside it. The provider boots again on the new id and
    // fills the empty state back in.
    givenNameDispatch({ type: 'RESET_GIVEN_NAME_STATE' });
    dispatch({ type: 'DISMISS_ACCOUNT_PROMPT' });
    dispatch({ type: 'ADD_USER', payload: refreshedUser });
    navigate('/');
  };

  return { resetToAnonymousSession };
};
