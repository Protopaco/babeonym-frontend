import IconButton from '@mui/material/IconButton';
import BabyIcon from '@/assets/icons/icon-baby.svg?react';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import './FloatingHelperIcon.css';

export default () => {
  const { tutorialEnabled, toggleTutorialEnabled } = useTutorial();

  return (
    <IconButton
      className="floating-helper-icon"
      data-tutorial-enabled={tutorialEnabled}
      aria-label={tutorialEnabled ? 'Turn off tutorial help' : 'Turn on tutorial help'}
      aria-pressed={tutorialEnabled}
      onClick={toggleTutorialEnabled}
    >
      <BabyIcon aria-hidden="true" focusable="false" />
    </IconButton>
  );
};
