import { useContext } from 'react';
import { TutorialContext } from '@/state/tutorial/tutorial.context';

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used inside TutorialProvider');
  }
  return context;
};
