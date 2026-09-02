import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './DeleteAccountDialog.css';

type DeleteAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteAccountDialog = ({ open, onClose, onConfirm }: DeleteAccountDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-account-title"
      slotProps={{ paper: { className: 'delete-account-paper' } }}
    >
      <DialogTitle id="delete-account-title" className="delete-account-title">
        Delete your account?
      </DialogTitle>
      <DialogContent className="delete-account-content">
        <DialogContentText className="delete-account-text">
          Deleting your account will remove all of your information from the app, including your names.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="delete-account-actions">
        <Button className="delete-account-cancel" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button className="delete-account-accept" variant="outlined" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
