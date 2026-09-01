import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import './AuthModal.css';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void | Promise<void>;
};

const AuthModal = ({ open, onClose, onGoogleSignIn }: AuthModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="auth-modal-title" slotProps={{ paper: { className: 'auth-modal-paper' } }}>
      <DialogTitle id="auth-modal-title" className="auth-modal-title">
        <span>Save your progress</span>
        <IconButton className="auth-modal-close-button" aria-label="Close sign in options" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="auth-modal-content">
        <Typography variant="body1" className="auth-modal-copy">
          Sign in to preserve your saved names and continue building your list across sessions.
        </Typography>
        <Button className="auth-modal-provider-button" variant="outlined" onClick={onGoogleSignIn}>
          Continue with Google
        </Button>
        <Button className="auth-modal-secondary-action" variant="text" onClick={onClose}>
          Keep using Babeonym
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
