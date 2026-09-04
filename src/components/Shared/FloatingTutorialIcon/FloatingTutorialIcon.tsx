import BabyIcon from '@/assets/icons/icon-baby.svg?react';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import { useAppLayoutState } from '@/state/appLayoutState/appLayoutState.context';
import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
import PrimaryIconButton from '@/components/Shared/PrimaryIconButton/PrimaryIconButton';
import './FloatingTutorialIcon.css';

export default () => {
  const { tutorialEnabled, toggleTutorialEnabled } = useTutorial();
  const { mobileFilterDrawerOpen } = useAppLayoutState();

  return (
    <div className="floating-tutorial-icon-container" data-mobile-filter-drawer-open={mobileFilterDrawerOpen}>
      <BaseTooltip title="Questions?" placement="top">
        <div className="floating-tutorial-icon-button">
          {!tutorialEnabled ? <div className="floating-tutorial-icon-mobile-label">Questions?</div> : null}
          <PrimaryIconButton
            icon={<BabyIcon aria-hidden="true" focusable="false" />}
            label={tutorialEnabled ? 'Turn off tutorial help' : 'Turn on tutorial help'}
            onClick={toggleTutorialEnabled}
            size="compact"
            emphasis={tutorialEnabled ? 'fill' : 'outline'}
            pressed={tutorialEnabled}
          />
        </div>
      </BaseTooltip>
    </div>
  );
};
