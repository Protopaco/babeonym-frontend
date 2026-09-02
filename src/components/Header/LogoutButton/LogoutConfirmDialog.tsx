import BaseTextModal from '@/components/Shared/BaseTextModal/BaseTextModal';
import '@/components/Header/LogoutButton/LogoutConfirmDialog.css';

type LogoutConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmDialog = ({ open, onClose, onConfirm }: LogoutConfirmDialogProps) => {
  return (
    <BaseTextModal
      open={open}
      onClose={onClose}
      title="Log out?"
      confirmLabel="Log Out"
      onConfirm={onConfirm}
    />
  );
};

export default LogoutConfirmDialog;
