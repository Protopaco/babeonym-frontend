import IconButton from '@mui/material/IconButton';
import BabyIcon from '@/assets/icons/icon-baby.svg?react';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
import './FloatingTutorialIcon.css';

export default () => {
  const { tutorialEnabled, toggleTutorialEnabled } = useTutorial();

  return (
    <div className="floating-tutorial-icon-container">
      <BaseTooltip title="Questions?" placement="top">
        <div className="floating-tutorial-icon-button" data-tutorial-enabled={tutorialEnabled}>
          <IconButton
            className="floating-tutorial-icon"
            data-tutorial-enabled={tutorialEnabled}
            aria-label={tutorialEnabled ? 'Turn off tutorial help' : 'Turn on tutorial help'}
            aria-pressed={tutorialEnabled}
            onClick={toggleTutorialEnabled}
          >
            <BabyIcon aria-hidden="true" focusable="false" />
          </IconButton>
        </div>
      </BaseTooltip>
    </div>
  );
};
