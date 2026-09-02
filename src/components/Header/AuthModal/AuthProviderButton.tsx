import { useState } from 'react';
import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import '@/components/Header/AuthModal/AuthProviderButton.css';

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
    <Button
      className="auth-provider-button"
      startIcon={pending ? <CircularProgress className="auth-provider-button-spinner" size={20} /> : icon}
      disabled={pending}
      onClick={startSignIn}
    >
      {label}
    </Button>
  );
};
