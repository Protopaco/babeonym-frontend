import type { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import './BareIconButton.css';

type Props = {
  icon: ReactNode;
  // Required rather than optional because an icon leaves the control with no
  // accessible name of its own.
  label: string;
  onClick?: () => void;
  // Set when the button goes somewhere rather than does something. A Link
  // rather than a click handler, so middle-click and open-in-new-tab work.
  to?: string;
  size?: 'default' | 'small' | 'large';
  tone?: 'default' | 'action';
  // Set only by toggles, so a screen reader announces the on/off state.
  pressed?: boolean;
  disabled?: boolean;
};

// A glyph with no ring and no fill — the sibling of PrimaryIconButton for
// controls that sit beside content rather than being the thing you came for.
const BareIconButton = ({ icon, label, onClick, to, size = 'default', tone = 'default', pressed, disabled = false }: Props) => {
  const sharedProps = {
    className: 'bare-icon-button',
    'data-size': size,
    'data-tone': tone,
    'aria-label': label,
    'aria-pressed': pressed,
    disabled,
    onClick,
  };

  return to === undefined ? (
    <IconButton {...sharedProps}>{icon}</IconButton>
  ) : (
    <IconButton {...sharedProps} component={Link} to={to}>
      {icon}
    </IconButton>
  );
};

export default BareIconButton;
