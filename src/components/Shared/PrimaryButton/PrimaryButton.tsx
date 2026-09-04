import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import './PrimaryButton.css';

type Props = {
  children: ReactNode;
  onClick: Function;
  disabled?: boolean;
  size?: 'default' | 'wide' | 'compact' | 'compact-wide';
  shape?: 'text' | 'icon';
  tone?: 'default' | 'danger';
  emphasis?: 'outline' | 'fill';
  label?: string;
};

// The button everything else is built on. It owns the box and the colour
// language — border, fill, hover, tone, emphasis — and publishes its text and
// icon sizes as custom properties so its content can size itself without this
// component reaching into it.
export default ({
  children,
  onClick,
  disabled = false,
  size = 'default',
  shape = 'text',
  tone = 'default',
  emphasis = 'outline',
  label,
}: Props) => {
  return (
    <Button
      variant="outlined"
      size="large"
      disabled={disabled}
      data-size={size}
      data-shape={shape}
      data-tone={tone}
      data-emphasis={emphasis}
      aria-label={label}
      onClick={() => {
        onClick();
      }}
      className="primary-button"
      disableRipple={true}
    >
      {children}
    </Button>
  );
};
