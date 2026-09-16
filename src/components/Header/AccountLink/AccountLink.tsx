import Typography from '@mui/material/Typography';
import './AccountLink.css';
import { useUser } from '@/state/user/user.context';
import { useState } from 'react';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import LogoutConfirmDialog from '@/components/Header/LogoutConfirmDialog/LogoutConfirmDialog';
import { useLogout } from '@/components/Header/useLogout';
import startGoogleSignIn from '@/api/startGoogleSignIn';

/* One control in two states, matching the icon in the mobile bar: signed out it
   offers an account, signed in it gives one up. It used to link to Settings
   when signed in, which the gear beside it already does, and sign-out lived in
   an icon of its own. */
export default () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
  const { logOut } = useLogout();

  if (!userProviderLoaded) {
    return null;
  }

  const isAnonymousUser = !user || user.authProvider === 'anonymous';
  const accountLinkLabel = isAnonymousUser ? 'Sign In / Sign Up' : (user.email ?? 'Account');

  const confirmLogOut = () => {
    setLogoutConfirmOpen(false);
    logOut();
  };

  return (
    <>
      <Typography
        variant="button"
        color="primary"
        id="account-link"
        component="button"
        type="button"
        onClick={() => (isAnonymousUser ? setAuthModalOpen(true) : setLogoutConfirmOpen(true))}
      >
        {accountLinkLabel}
      </Typography>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onGoogleSignIn={startGoogleSignIn} />
      <LogoutConfirmDialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} onConfirm={confirmLogOut} />
    </>
  );
};
