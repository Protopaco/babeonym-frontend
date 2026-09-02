import BaseTextModal from '@/components/Shared/BaseTextModal/BaseTextModal';
import '@/components/Settings/DeleteAccountButton/DeleteAccountDialog.css';

type DeleteAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteAccountDialog = ({ open, onClose, onConfirm }: DeleteAccountDialogProps) => {
  return (
    <BaseTextModal
      open={open}
      onClose={onClose}
      title="Delete your account?"
      body={['Deleting your account will remove all of your information from the app, including your names.']}
      confirmLabel="Delete"
      onConfirm={onConfirm}
      tone="danger"
      size="wide"
    />
  );
};

export default DeleteAccountDialog;
