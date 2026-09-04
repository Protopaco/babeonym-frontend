import type { ReactNode } from 'react';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import '@/components/Shared/PrimaryIconButton/PrimaryIconButton.css';

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'default' | 'compact';
  emphasis?: 'outline' | 'fill';
  pressed?: boolean;
};

// An icon-only button. The label is required rather than optional because an
// icon leaves the control with no accessible name of its own.
const PrimaryIconButton = ({ icon, label, onClick, disabled = false, size = 'default', emphasis = 'outline', pressed }: Props) => {
  return (
    <PrimaryButton onClick={onClick} disabled={disabled} shape="icon" size={size} emphasis={emphasis} label={label} pressed={pressed}>
      <span className="primary-icon-button-icon">{icon}</span>
    </PrimaryButton>
  );
};

export default PrimaryIconButton;
