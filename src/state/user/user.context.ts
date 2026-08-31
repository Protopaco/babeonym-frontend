import { createContext, useContext } from 'react';

import type { UserAction } from '@/models/UserAction';
import type { UserState } from '@/models/UserState';

export const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
};
