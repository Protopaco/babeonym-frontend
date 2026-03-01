import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/api/generated/models/User';

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return ctx;
};
