import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { TutorialContext } from '@/state/tutorial/tutorial.context';
import { sessionStorageClient } from '@/utils/sessionStorageClient';

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialEnabled, setTutorialEnabled] = useState(() =>
    sessionStorageClient.getBoolean('tutorialEnabled', false)
  );

  /* Lives here rather than in the icon so it survives that component
     unmounting — the label is a one-time hint for the session, not a fresh
     announcement every time the page it sits on is rebuilt. Session-scoped like
     the toggle above: gone for the rest of the visit, back on the next one. */
  const [tutorialLabelDismissed, setTutorialLabelDismissed] = useState(() => sessionStorageClient.getBoolean('tutorialLabelDismissed', false));

  const value = useMemo(
    () => ({
      tutorialEnabled,
      toggleTutorialEnabled: () =>
        setTutorialEnabled((enabled) => {
          const nextEnabled = !enabled;
          sessionStorageClient.setBoolean('tutorialEnabled', nextEnabled);
          return nextEnabled;
        }),
      tutorialLabelDismissed,
      dismissTutorialLabel: () => {
        sessionStorageClient.setBoolean('tutorialLabelDismissed', true);
        setTutorialLabelDismissed(true);
      },
    }),
    [tutorialEnabled, tutorialLabelDismissed]
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
};
