import { useState } from 'react';
import type { ReactNode } from 'react';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import CircularProgress from '@mui/material/CircularProgress';
import './AuthProviderButton.css';

type Props = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

export default ({ label, icon, onClick }: Props) => {
  // Signing in navigates the browser away, so pending never resets. Closing the
  // modal unmounts the button, which is the way out if the redirect stalls.
  const [pending, setPending] = useState(false);

  const startSignIn = () => {
    setPending(true);
    onClick();
  };

  return (
    <PrimaryButton
      onClick={startSignIn}
      disabled={pending}
      size="compact-wide"
      tone="default"
      emphasis="outline"
      label={label}
    >
      <span className="gsi-material-button-content-wrapper">
        <span className="gsi-material-button-icon">
          {pending ? <CircularProgress className="auth-provider-button-spinner" size={20} /> : icon}
        </span>
        <span className="gsi-material-button-contents">{label}</span>
      </span>
    </PrimaryButton>
  );
};
