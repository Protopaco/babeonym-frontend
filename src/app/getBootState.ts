import { Configuration, UserApi, AuthApi } from '@/api/generated';
import type { BootState } from '@/types/BootState';

export default async (): Promise<BootState> => {
  const config = new Configuration({
    basePath: 'http://localhost:3000', // your backend
    credentials: 'include', // CRITICAL for cookies
  });

  const userApi = new UserApi(config);
  const authApi = new AuthApi(config);
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
        if (!cancelled) return { status: 'error', message: 'Failed to create session' };
      }
    }
  }
  return { status: 'loading' };
};
