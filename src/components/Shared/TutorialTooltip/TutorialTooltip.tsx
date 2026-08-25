import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { useTutorial } from '@/state/tutorial/tutorial.context';
import './TutorialTooltip.css';

type TutorialTooltipProps = {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement?: TooltipProps['placement'];
};

export default ({ title, children, placement = 'top' }: TutorialTooltipProps) => {
  console.log('🚀 ~ children:', children);
  console.log('🚀 ~ placement:', placement);
  console.log('🚀 ~ title:', title);
  const { tutorialEnabled } = useTutorial();
  console.log('🚀 ~ tutorialEnabled:', tutorialEnabled);

  if (!tutorialEnabled) {
    return children;
  }

  return (
    <Tooltip title={title} placement={placement} arrow classes={{ tooltip: 'tutorial-tooltip', arrow: 'tutorial-tooltip-arrow' }}>
      <span>{children}</span>
    </Tooltip>
  );
};
