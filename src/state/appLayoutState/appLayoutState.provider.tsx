import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { AppLayoutStateContext } from '@/state/appLayoutState/appLayoutState.context';

export const AppLayoutStateProvider = ({ children }: { children: ReactNode }) => {
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  const value = useMemo(
    () => ({
      mobileFilterDrawerOpen,
      setMobileFilterDrawerOpen,
    }),
    [mobileFilterDrawerOpen]
  );

  return <AppLayoutStateContext.Provider value={value}>{children}</AppLayoutStateContext.Provider>;
};
