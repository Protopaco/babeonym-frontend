import type { UserState } from '@/models/UserState';
import { UserContext } from '@/state/user/user.context';
import type { ReactNode } from 'react';
import { useReducer, useMemo, useEffect, useRef } from 'react';
import { userReducer } from '@/state/user/user.reducer';
import { userApi, authApi } from '@/api/client';

const initialState: UserState = {
  user: null,
  userProviderLoaded: false,
  promptAccountCreation: false,
  sessionLoadFailed: false,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const booted = useRef(false);

  const getUser = async () => {
    try {
      const { user } = await userApi.v1UserGet();
      dispatch({ type: 'ADD_USER', payload: user });
    } catch (err: any) {
      if (err?.status === 401 || err?.response?.status === 401) {
        try {
          await authApi.v1AuthAnonymous();
          const { user } = await userApi.v1UserGet();
          dispatch({ type: 'ADD_USER', payload: user });
        } catch (e: any) {
          // Nothing downstream can work without a user, so this is the one
          // failure worth taking the whole screen. AppLayout reads the flag and
          // redirects; the provider cannot, being mounted above the router.
          dispatch({ type: 'USER_LOAD_FAILED' });
          console.error('Unable to create anonymous user session.', e);
        }
      } else {
        dispatch({ type: 'USER_LOAD_FAILED' });
        console.error('Unable to load user session.', err);
      }
    } finally {
      dispatch({ type: 'USER_PROVIDER_LOADED' });
    }
  };

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  useEffect(() => {
    const boot = async () => {
      await getUser();
    };

    if (booted.current) return;
    booted.current = true;
    boot();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
