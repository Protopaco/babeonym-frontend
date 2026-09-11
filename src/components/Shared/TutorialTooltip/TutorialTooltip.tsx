import type { TooltipProps } from '@mui/material/Tooltip';
import type { MouseEvent } from 'react';
import { useId } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import { TOUCH_POINTER } from '@/constants/mediaQueries';
import './TutorialTooltip.css';

type TutorialTooltipProps = {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement?: TooltipProps['placement'];
};

export default ({ title, children, placement = 'top' }: TutorialTooltipProps) => {
  const { tutorialEnabled, activeTutorialHintId, setActiveTutorialHint } = useTutorial();
  const hintId = useId();

  /* A finger has no hover to trigger a tooltip with, so a touch device reveals
     hints by tapping instead. They were all held open at once until there were
     thirteen of them, at which point they covered the screen, each other, and
     the controls they were describing.

     Tapping a hinted control shows its hint and does nothing else; tapping it
     again does what it normally does. That is a control behaving differently,
     which is a cost — but tutorial mode is something the user switches on, and
     switches off to use the app. A mouse keeps hover, where one bubble at a
     time is the natural behaviour anyway. */
  const revealOnTap = useMediaQuery(TOUCH_POINTER);

  if (!tutorialEnabled) {
    return children;
  }

  if (!revealOnTap) {
    return (
      <BaseTooltip title={title} placement={placement}>
        {children}
      </BaseTooltip>
    );
  }

  const isShowing = activeTutorialHintId === hintId;

  /* Capture rather than bubble, so this runs before the control's own handler
     and can stop the tap reaching it. Stopping it here is also what keeps the
     provider's dismiss listener from closing the hint this tap just opened. */
  const handleTapCapture = (event: MouseEvent) => {
    if (isShowing) {
      setActiveTutorialHint(null);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setActiveTutorialHint(hintId);
  };

  return (
    <span className="tutorial-tooltip-tap-target" onClickCapture={handleTapCapture}>
      <BaseTooltip title={title} placement={placement} open={isShowing}>
        {children}
      </BaseTooltip>
    </span>
  );
};
