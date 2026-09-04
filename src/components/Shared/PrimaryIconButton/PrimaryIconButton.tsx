import type { ReactNode } from 'react';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import '@/components/Shared/PrimaryIconButton/PrimaryIconButton.css';

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

// An icon-only button. The label is required rather than optional because an
// icon leaves the control with no accessible name of its own.
const PrimaryIconButton = ({ icon, label, onClick, disabled = false }: Props) => {
  return (
    <PrimaryButton onClick={onClick} disabled={disabled} shape="icon" label={label}>
      <span className="primary-icon-button-icon">{icon}</span>
    </PrimaryButton>
  );
};

export default PrimaryIconButton;
