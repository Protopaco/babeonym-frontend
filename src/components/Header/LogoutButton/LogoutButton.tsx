import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutConfirmDialog from '@/components/Header/LogoutButton/LogoutConfirmDialog';
import { useLogout } from '@/components/Header/LogoutButton/useLogout';
import { useUser } from '@/state/user/user.context';
import '@/components/Header/LogoutButton/LogoutButton.css';

export default () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
  const { logOut } = useLogout();

  const isAnonymousUser = !user || user.authProvider === 'anonymous';

  if (!userProviderLoaded || isAnonymousUser) {
    return null;
  }

  const openConfirm = () => {
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
  };

  const confirmLogOut = () => {
    setConfirmOpen(false);
    logOut();
  };

  return (
    <>
      <IconButton className="logout-button" aria-label="Log out" onClick={openConfirm}>
        <LogoutIcon />
      </IconButton>
      <LogoutConfirmDialog open={confirmOpen} onClose={closeConfirm} onConfirm={confirmLogOut} />
    </>
  );
};
