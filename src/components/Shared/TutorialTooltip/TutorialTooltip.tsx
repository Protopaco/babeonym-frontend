import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import './TutorialTooltip.css';

type TutorialTooltipProps = {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement?: TooltipProps['placement'];
};

export default ({ title, children, placement = 'top' }: TutorialTooltipProps) => {
  const { tutorialEnabled } = useTutorial();

  if (!tutorialEnabled) {
    return children;
  }

  return (
    <Tooltip title={title} placement={placement} arrow classes={{ tooltip: 'tutorial-tooltip', arrow: 'tutorial-tooltip-arrow' }}>
      {children}
    </Tooltip>
  );
};
