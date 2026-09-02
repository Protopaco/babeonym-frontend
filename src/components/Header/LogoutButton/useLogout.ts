import { useNavigate } from 'react-router-dom';
import { authApi, userApi } from '@/api/client';
import { useUser } from '@/state/user/user.context';

export const useLogout = () => {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  // Logging out drops the session and immediately starts an anonymous one, so
  // the app always has a user to work with.
  const logOut = async () => {
    try {
      await authApi.v1AuthLogout();
      await authApi.v1AuthAnonymous();
      const { user: refreshedUser } = await userApi.v1UserGet();
      dispatch({ type: 'ADD_USER', payload: refreshedUser });
      navigate('/');
    } catch (err) {
      console.error('Unable to log out.', err);
    }
  };

  return { logOut };
};
