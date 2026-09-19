import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleSignInButton from '@/components/Header/AuthModal/GoogleSignInButton/GoogleSignInButton';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import PrivacyPolicyLink from '@/components/Shared/PrivacyPolicyLink/PrivacyPolicyLink';
import './AuthModal.css';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void | Promise<void>;
};

const AuthModal = ({ open, onClose, onGoogleSignIn }: AuthModalProps) => {
  return (
    <BaseModal open={open} onClose={onClose} title="Save your progress" size="wide">
      <Typography variant="body1" className="auth-modal-copy">
        Create an account to save your names
      </Typography>
      <Box className="auth-modal-providers">
        <GoogleSignInButton onClick={onGoogleSignIn} />
      </Box>
      <Box className="auth-modal-privacy">
        <PrivacyPolicyLink onClick={onClose} size="compact" />
      </Box>
    </BaseModal>
  );
};

export default AuthModal;
