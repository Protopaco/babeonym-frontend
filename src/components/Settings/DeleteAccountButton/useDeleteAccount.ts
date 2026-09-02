import { userApi } from '@/api/client';
import { useResetToAnonymousSession } from '@/hooks/useResetToAnonymousSession';

export const useDeleteAccount = () => {
  const { resetToAnonymousSession } = useResetToAnonymousSession();

  const deleteAccount = async () => {
    try {
      await userApi.v1UserDelete();
      await resetToAnonymousSession();
    } catch (err) {
      console.error('Unable to delete account.', err);
    }
  };

  return { deleteAccount };
};
