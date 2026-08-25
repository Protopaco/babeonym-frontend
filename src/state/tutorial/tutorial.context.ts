import { createContext, useContext } from 'react';

type TutorialContextValue = {
  tutorialEnabled: boolean;
  toggleTutorialEnabled: () => void;
};

export const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used inside TutorialProvider');
  }
  return context;
};
