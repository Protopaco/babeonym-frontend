import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'motion/react';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import { useUser } from '@/state/user/user.context';
import motionTokens from '@/themes/motion.theme';
import './AccountPromptBanner.css';

const AccountPromptBanner = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    state: { user, userProviderLoaded, promptAccountCreation },
    dispatch,
  } = useUser();

  const isAnonymousUser = !user || user.authProvider === 'anonymous';
  const isVisible = userProviderLoaded && isAnonymousUser && promptAccountCreation;

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
    <>
      {/* Grows in once the user has loaded and collapses on dismiss, so the page
          below moves with it rather than jumping. Eased at both ends like the
          other height reveals. */}
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            key="account-prompt-banner"
            className="account-prompt-banner-reveal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.durationSeconds[300], ease: motionTokens.ease.inOut }}
          >
            {/* The copy and its button are grouped so they stay one row on a phone
                while the dismiss moves onto a row of its own above them. */}
            <Container maxWidth="lg" component="aside" className="account-prompt-banner" aria-label="Save your progress">
              <div className="account-prompt-banner-prompt">
                <Typography className="account-prompt-banner-copy">Want to save your progress?</Typography>
                <PrimaryTextButton text="Sign Up" onClick={openAuthModal} size="compact" />
              </div>
              <div className="account-prompt-banner-dismiss">
                <BareIconButton icon={<CloseIcon />} label="Dismiss" onClick={dismiss} />
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* Outside the reveal, so the modal is never unmounted along with the
          banner. */}
      <AuthModal open={authModalOpen} onClose={closeAuthModal} onGoogleSignIn={startGoogleSignIn} />
    </>
  );
};

export default AccountPromptBanner;
