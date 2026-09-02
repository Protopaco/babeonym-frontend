import { useNavigate } from 'react-router-dom';
import { authApi, userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';

export const useResetToAnonymousSession = () => {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  // Ending a session immediately starts an anonymous one, so the app always has
  // a user to work with.
  const resetToAnonymousSession = async () => {
    await authApi.v1AuthAnonymous();
    const { user: refreshedUser } = await userApi.v1UserGet();
    dispatch({ type: 'ADD_USER', payload: refreshedUser });
    navigate('/');
  };

  return { resetToAnonymousSession };
};
