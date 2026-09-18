import { useState } from 'react';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import DeleteAccountDialog from '@/components/Settings/DeleteAccountButton/DeleteAccountDialog/DeleteAccountDialog';
import { useDeleteAccount } from '@/components/Settings/DeleteAccountButton/useDeleteAccount';
import { useUser } from '@/state/user/useUser';
import './DeleteAccountButton.css';

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

  // Just the button and its dialog. Settings owns the row it sits in.
  return (
    <>
      <TutorialTooltip title="Deletes your account and all your saved names" placement="top">
        <PrimaryTextButton text="Delete Account" size="compact-wide" tone="danger" onClick={openConfirm} />
      </TutorialTooltip>
      <DeleteAccountDialog open={confirmOpen} onClose={closeConfirm} onConfirm={confirmDelete} />
    </>
  );
};

export default DeleteAccountButton;
