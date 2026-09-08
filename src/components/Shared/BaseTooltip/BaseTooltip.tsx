import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import './BaseTooltip.css';

type BaseTooltipProps = {
  title: TooltipProps['title'];
  children: TooltipProps['children'];
  placement?: TooltipProps['placement'];
  open?: boolean;
};

export default ({ title, children, placement = 'top', open }: BaseTooltipProps) => {
  // Controlled only when a caller says so. Left undefined the tooltip keeps
  // MUI's own hover and focus behaviour; given a value it shows exactly when
  // told to, which is the only way a tooltip can appear on a device with no
  // hover to wait for. The listeners come off in that case so a tap on the
  // thing underneath cannot fight the caller for control of it.
  const controlled = open !== undefined;

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow
      classes={{ tooltip: 'base-tooltip', arrow: 'base-tooltip-arrow' }}
      open={open}
      disableHoverListener={controlled}
      disableFocusListener={controlled}
      disableTouchListener={controlled}
    >
      <span>{children}</span>
    </Tooltip>
  );
};
