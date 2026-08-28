import type { TooltipProps } from '@mui/material/Tooltip';
import BaseTooltip from '@/components/Shared/BaseTooltip/BaseTooltip';
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
    <BaseTooltip title={title} placement={placement}>
      {children}
    </BaseTooltip>
  );
};
