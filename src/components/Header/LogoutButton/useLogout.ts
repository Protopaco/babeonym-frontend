import { authApi } from '@/api/client';
import { useResetToAnonymousSession } from '@/hooks/useResetToAnonymousSession';

export const useLogout = () => {
  const { resetToAnonymousSession } = useResetToAnonymousSession();

  const logOut = async () => {
    try {
      await authApi.v1AuthLogout();
      await resetToAnonymousSession();
    } catch (err) {
      console.error('Unable to log out.', err);
    }
  };

  return { logOut };
};
