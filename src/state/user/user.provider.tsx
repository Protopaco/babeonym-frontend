import type { UserState, UserAction } from '@/state/user/user.types';
import { UserContext } from '@/state/user/user.context';
import type { ReactNode } from 'react';
import { useReducer, useMemo } from 'react';
import { userReducer } from '@/state/user/user.reducer';

const initialState: UserState = {
  user: null,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <UserContext.Provider value={value}>{state.user === null ? 'loading' : children}</UserContext.Provider>;
};
