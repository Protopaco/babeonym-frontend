import { useState } from 'react';
import Box from '@mui/material/Box';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import DeleteAccountDialog from '@/components/Settings/DeleteAccountButton/DeleteAccountDialog';
import { useDeleteAccount } from '@/components/Settings/DeleteAccountButton/useDeleteAccount';
import { useUser } from '@/state/user/user.context';
import '@/components/Settings/DeleteAccountButton/DeleteAccountButton.css';

const DeleteAccountButton = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    state: { user, userProviderLoaded },
  } = useUser();
  const { deleteAccount } = useDeleteAccount();

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

  const confirmDelete = () => {
    setConfirmOpen(false);
    deleteAccount();
  };

  return (
    <Box className="delete-account-button">
      <PrimaryButton text="Delete Account" size="compact-wide" tone="danger" onClick={openConfirm} />
      <DeleteAccountDialog open={confirmOpen} onClose={closeConfirm} onConfirm={confirmDelete} />
    </Box>
  );
};

export default DeleteAccountButton;
