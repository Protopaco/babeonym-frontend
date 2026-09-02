import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import './LogoutConfirmDialog.css';

type LogoutConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmDialog = ({ open, onClose, onConfirm }: LogoutConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-confirm-title"
      slotProps={{ paper: { className: 'logout-confirm-paper' } }}
    >
      <DialogTitle id="logout-confirm-title" className="logout-confirm-title">
        Log out?
      </DialogTitle>
      <DialogActions className="logout-confirm-actions">
        <Button className="logout-confirm-cancel" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button className="logout-confirm-accept" variant="outlined" onClick={onConfirm}>
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
