import { createContext } from 'react';

type UIContextValue = {
  mobileFilterDrawerOpen: boolean;
  setMobileFilterDrawerOpen: (open: boolean) => void;
};

export const AppLayoutStateContext = createContext<UIContextValue | undefined>(undefined);
