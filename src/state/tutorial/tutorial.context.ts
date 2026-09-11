import { createContext, useContext } from 'react';

type TutorialContextValue = {
  tutorialEnabled: boolean;
  toggleTutorialEnabled: () => void;
  tutorialLabelDismissed: boolean;
  dismissTutorialLabel: () => void;
  // Which hint is showing, on a device that reveals them one at a time. Held
  // here rather than in each tooltip because the rule is that only one is open —
  // which no tooltip can enforce on its own.
  activeTutorialHintId: string | null;
  setActiveTutorialHint: (hintId: string | null) => void;
};

export const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used inside TutorialProvider');
  }
  return context;
};
