import { useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import { useUser } from '@/state/user/user.context';
import '@/components/NameWorkspace/AccountPromptBanner/AccountPromptBanner.css';

const AccountPromptBanner = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    state: { user, userProviderLoaded, promptAccountCreation },
    dispatch,
  } = useUser();

  const isAnonymousUser = !user || user.authProvider === 'anonymous';

  if (!userProviderLoaded || !isAnonymousUser || !promptAccountCreation) {
    return null;
  }

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };
  const dismiss = () => {
    dispatch({ type: 'DISMISS_ACCOUNT_PROMPT' });
  };

  return (
    <Container maxWidth="lg" component="aside" className="account-prompt-banner" aria-label="Save your progress">
      <Typography className="account-prompt-banner-copy">Want to save your progress?</Typography>
      <div className="account-prompt-banner-actions">
        <PrimaryTextButton text="Create an account" onClick={openAuthModal} size="compact-wide" />
        <IconButton className="account-prompt-banner-dismiss" aria-label="Dismiss" onClick={dismiss}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <AuthModal open={authModalOpen} onClose={closeAuthModal} onGoogleSignIn={startGoogleSignIn} />
    </Container>
  );
};

export default AccountPromptBanner;
