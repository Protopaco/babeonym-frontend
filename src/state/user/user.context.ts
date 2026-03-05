import type { User } from '@/api/generated/models/User';
import { createContext, useContext } from 'react';

import type { UserState, UserAction } from '@/state/user/user.types';

export const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
};
