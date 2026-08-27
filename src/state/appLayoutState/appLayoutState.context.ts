import { createContext, useContext } from 'react';

type UIContextValue = {
  mobileFilterDrawerOpen: boolean;
  setMobileFilterDrawerOpen: (open: boolean) => void;
};

export const AppLayoutStateContext = createContext<UIContextValue | undefined>(undefined);

export const useAppLayoutState = () => {
  const context = useContext(AppLayoutStateContext);
  if (!context) {
    throw new Error('useAppLayoutState must be used inside AppLayoutStateProvider');
  }
  return context;
};
