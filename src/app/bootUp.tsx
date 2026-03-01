//import { Configuration, UserApi, AuthApi } from '@/api/generated';
import type { BootState } from '@/types/BootState';
import { userApi, authApi } from '@/api/client';

export default async (): Promise<BootState> => {
  let cancelled = false;

  try {
    const { user } = await userApi.v1UserGet();
    return { status: 'ready', user };
  } catch (err: any) {
    if (err?.status === 401 || err?.response?.status === 401) {
      try {
        await authApi.v1AuthAnonymous();
        const { user } = await userApi.v1UserGet();

        if (!cancelled) return { status: 'ready', user };
      } catch (e: any) {
        if (!cancelled) return { status: 'error' };
      }
    }
  }
  return { status: 'loading' };
};
