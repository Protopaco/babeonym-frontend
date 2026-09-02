import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import AuthProviderButton from '@/components/Header/AuthModal/AuthProviderButton';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import '@/components/Header/AuthModal/AuthModal.css';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void | Promise<void>;
};

const AuthModal = ({ open, onClose, onGoogleSignIn }: AuthModalProps) => {
  return (
    <BaseModal open={open} onClose={onClose} title="Save your progress" size="wide">
      <Typography variant="body1" className="auth-modal-copy">
        Sign in to preserve your saved names and continue building your list across sessions.
      </Typography>
      <Box className="auth-modal-providers">
        <AuthProviderButton label="Continue with Google" icon={<GoogleIcon />} onClick={onGoogleSignIn} />
      </Box>
    </BaseModal>
  );
};

export default AuthModal;
