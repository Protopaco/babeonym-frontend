import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import LogoutConfirmDialog from '@/components/Header/LogoutButton/LogoutConfirmDialog';
import { useLogout } from '@/components/Header/LogoutButton/useLogout';
import { useUser } from '@/state/user/user.context';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import '@/components/Header/TopBar/MobileAccountButton.css';

/* One control in two states rather than two controls: outlined when there is no
   account behind it, filled once there is. Fill is what the bar already uses to
   say active — the tutorial toggle beside it does the same — so the two read as
   one convention.

   Not a variant of AccountLink, which goes to Settings when signed in. Here the
   gear covers Settings, so this side is only ever about signing in or out. */
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

  const confirmLogOut = () => {
    setLogoutConfirmOpen(false);
    logOut();
  };

  return (
    <>
      <IconButton
        className="mobile-account-button"
        aria-label={isAnonymousUser ? 'Sign in or sign up' : 'Log out'}
        onClick={() => (isAnonymousUser ? setAuthModalOpen(true) : setLogoutConfirmOpen(true))}
      >
        {isAnonymousUser ? <AccountCircleOutlinedIcon /> : <AccountCircleIcon />}
      </IconButton>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onGoogleSignIn={startGoogleSignIn} />
      <LogoutConfirmDialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} onConfirm={confirmLogOut} />
    </>
  );
};
