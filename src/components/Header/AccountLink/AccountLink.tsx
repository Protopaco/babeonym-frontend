import Typography from '@mui/material/Typography';
import '@/components/Header/AccountLink/AccountLink.css';
import { Link } from 'react-router-dom';
import { useUser } from '@/state/user/user.context';
import { useState } from 'react';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import startGoogleSignIn from '@/api/startGoogleSignIn';

export default () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    state: { user, userProviderLoaded },
  } = useUser();

  if (!userProviderLoaded) {
    return null;
  }

  const isAnonymousUser = !user || user.authProvider === 'anonymous';
  const accountLinkLabel = isAnonymousUser ? 'Sign In / Sign Up' : (user.email ?? 'Account');
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };
  if (isAnonymousUser) {
    return (
      <>
        <Typography variant="button" color="primary" id="account-link" component="button" type="button" onClick={openAuthModal}>
          {accountLinkLabel}
        </Typography>
        <AuthModal open={authModalOpen} onClose={closeAuthModal} onGoogleSignIn={startGoogleSignIn} />
      </>
    );
  }

  return (
    <Typography variant="button" color="primary" id="account-link" component={Link} to="/settings">
      {accountLinkLabel}
    </Typography>
  );
};
