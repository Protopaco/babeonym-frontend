import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AuthModal from '@/components/Header/AuthModal/AuthModal';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import LogoutConfirmDialog from '@/components/Header/LogoutConfirmDialog/LogoutConfirmDialog';
import { useLogout } from '@/components/Header/useLogout';
import { useUser } from '@/state/user/useUser';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import './MobileAccountButton.css';

/* One control in two states rather than two controls: outlined when there is no
   account behind it, filled once there is. Fill is what the bar already uses to
   say active — the tutorial toggle beside it does the same — so the two read as
   one convention.

   The mobile counterpart of AccountLink: the same two states and actions, drawn
   as an icon because the bar has no room for an email address. The gear beside
   it covers Settings, so this is only ever about signing in or out. */
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
      <div className="mobile-account-button">
        <BareIconButton
          icon={isAnonymousUser ? <AccountCircleOutlinedIcon /> : <AccountCircleIcon />}
          label={isAnonymousUser ? 'Sign in or sign up' : 'Log out'}
          onClick={() => (isAnonymousUser ? setAuthModalOpen(true) : setLogoutConfirmOpen(true))}
          tone="action"
        />
      </div>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onGoogleSignIn={startGoogleSignIn} />
      <LogoutConfirmDialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} onConfirm={confirmLogOut} />
    </>
  );
};
