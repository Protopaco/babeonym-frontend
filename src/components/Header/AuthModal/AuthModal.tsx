import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import googleLogo from '@/assets/Google_Favicon_2025.svg';
import AuthProviderButton from '@/components/Header/AuthModal/AuthProviderButton/AuthProviderButton';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
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
        <AuthProviderButton
          label="Sign in with Google"
          icon={<img className="auth-provider-button-icon" src={googleLogo} alt="" aria-hidden="true" />}
          onClick={onGoogleSignIn}
        />
      </Box>
    </BaseModal>
  );
};

export default AuthModal;
