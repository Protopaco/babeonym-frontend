import type { TooltipProps } from '@mui/material/Tooltip';
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
  const { tutorialEnabled } = useTutorial();

  /* A finger has no hover to trigger a tooltip with, so on a touch device the
     tutorial's hints are simply always on while the tutorial is. A mouse keeps
     the hover behaviour, where a screen full of open bubbles would be noise.

     This is why the hint had a hand-positioned mobile twin: it existed only to
     be visible without a hover. Placement and collision handling come from the
     tooltip either way now. */
  const shownWithoutHover = useMediaQuery(TOUCH_POINTER);

  if (!tutorialEnabled) {
    return children;
  }

  return (
    <BaseTooltip title={title} placement={placement} open={shownWithoutHover ? true : undefined}>
      {children}
    </BaseTooltip>
  );
};
