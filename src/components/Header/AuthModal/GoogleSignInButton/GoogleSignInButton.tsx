import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleLogo from '@/components/Header/AuthModal/GoogleSignInButton/GoogleLogo/GoogleLogo';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './GoogleSignInButton.css';

type Props = {
  onClick: () => void;
};

const GoogleSignInButton = ({ onClick }: Props) => {
  // Signing in navigates the browser away, so pending never resets. Closing the
  // modal unmounts the button, which is the way out if the redirect stalls.
  const [pending, setPending] = useState(false);

  const startSignIn = () => {
    setPending(true);
    onClick();
  };

  return (
    <PrimaryTextButton
      text={pending ? 'Opening Google…' : 'Sign in with Google'}
      onClick={startSignIn}
      disabled={pending}
      size="compact-wider"
      startIcon={pending ? <CircularProgress size={18} color="inherit" /> : <GoogleLogo />}
    />
  );
};

export default GoogleSignInButton;
