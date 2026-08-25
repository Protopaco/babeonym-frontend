import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { TutorialContext } from '@/state/tutorial/tutorial.context';

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialEnabled, setTutorialEnabled] = useState(false);

  const value = useMemo(
    () => ({
      tutorialEnabled,
      toggleTutorialEnabled: () => setTutorialEnabled((enabled) => !enabled),
    }),
    [tutorialEnabled]
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
};
