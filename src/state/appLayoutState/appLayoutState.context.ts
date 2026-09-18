import { createContext } from 'react';

type AppLayoutStateContextValue = {
  mobileFilterDrawerOpen: boolean;
  setMobileFilterDrawerOpen: (open: boolean) => void;
};

export const AppLayoutStateContext = createContext<AppLayoutStateContextValue | undefined>(undefined);
