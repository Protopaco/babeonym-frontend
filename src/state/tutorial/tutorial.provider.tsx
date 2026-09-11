import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { TutorialContext } from '@/state/tutorial/tutorial.context';
import { localStorageClient } from '@/utils/localStorageClient';

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialEnabled, setTutorialEnabled] = useState(() => localStorageClient.getBoolean('tutorialEnabled', false));

  /* Lives here rather than in the icon so it survives that component
     unmounting — the label is a one-time hint for the session, not a fresh
     announcement every time the page it sits on is rebuilt. Session-scoped like
     the toggle above: gone for the rest of the visit, back on the next one. */
  const [tutorialLabelDismissed, setTutorialLabelDismissed] = useState(() => localStorageClient.getBoolean('tutorialLabelDismissed', false));

  /* Only one hint shows at a time where they are revealed by tapping, so the
     open one is tracked here rather than in each tooltip. Deliberately not
     stored: it is where the user is right now, not a preference. */
  const [activeTutorialHintId, setActiveTutorialHint] = useState<string | null>(null);

  /* Dismisses the open hint on a tap anywhere that is not a hinted control. One
     listener for the whole app rather than one per tooltip, and only while
     something is open.

     The tap that opens a hint never reaches this: TutorialTooltip stops that
     event in the capture phase, which is the same thing that keeps it from
     firing the control underneath. */
  useEffect(() => {
    if (activeTutorialHintId === null) {
      return;
    }

    const dismissHint = () => setActiveTutorialHint(null);

    document.addEventListener('click', dismissHint);

    return () => document.removeEventListener('click', dismissHint);
  }, [activeTutorialHintId]);

  const value = useMemo(
    () => ({
      tutorialEnabled,
      toggleTutorialEnabled: () =>
        setTutorialEnabled((enabled) => {
          const nextEnabled = !enabled;
          localStorageClient.setBoolean('tutorialEnabled', nextEnabled);
          // Turning the tutorial off takes the open hint with it, so it cannot
          // come back with the tutorial the next time it is switched on.
          setActiveTutorialHint(null);
          return nextEnabled;
        }),
      activeTutorialHintId,
      setActiveTutorialHint,
      tutorialLabelDismissed,
      dismissTutorialLabel: () => {
        localStorageClient.setBoolean('tutorialLabelDismissed', true);
        setTutorialLabelDismissed(true);
      },
    }),
    [tutorialEnabled, tutorialLabelDismissed, activeTutorialHintId]
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
};
