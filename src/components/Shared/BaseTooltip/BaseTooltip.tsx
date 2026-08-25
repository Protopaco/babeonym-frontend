import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import './BaseTooltip.css';

type BaseTooltipProps = {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement?: TooltipProps['placement'];
};

export default ({ title, children, placement = 'top' }: BaseTooltipProps) => {
  return (
    <Tooltip title={title} placement={placement} arrow classes={{ tooltip: 'base-tooltip', arrow: 'base-tooltip-arrow' }}>
      <span>{children}</span>
    </Tooltip>
  );
};
