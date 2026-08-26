import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { TutorialContext } from '@/state/tutorial/tutorial.context';
import { sessionStorageClient } from '@/utils/sessionStorageClient';

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialEnabled, setTutorialEnabled] = useState(() =>
    sessionStorageClient.getBoolean('tutorialEnabled', false)
  );

  const value = useMemo(
    () => ({
      tutorialEnabled,
      toggleTutorialEnabled: () =>
        setTutorialEnabled((enabled) => {
          const nextEnabled = !enabled;
          sessionStorageClient.setBoolean('tutorialEnabled', nextEnabled);
          return nextEnabled;
        }),
    }),
    [tutorialEnabled]
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
};
