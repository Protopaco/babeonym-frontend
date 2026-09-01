import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import SettingsRow from '@/components/Account/SettingsRow/SettingsRow';
import AuthModal from '@/components/Account/AuthModal/AuthModal';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import { useAccountSettings } from '@/pages/useAccountSettings';
import './AccountSettings.css';

const AccountSettings = () => {
  const { user, userProviderLoaded, surNameDraft, setSurNameDraft, pending, errorMessage, saveChanges, logOut } = useAccountSettings();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!userProviderLoaded) {
    return null;
  }

  const isAnonymousUser = !user || user.authProvider === 'anonymous';

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  if (isAnonymousUser) {
    return (
      <Box className="account-settings">
        <SectionHeader title="Account Settings" />
        <Typography variant="body1" className="account-settings-message">
          You are using Babeonym without an account. Create one to save your names and settings across devices.
        </Typography>
        <Box className="account-settings-actions">
          <PrimaryButton text="Sign In / Sign Up" size="wide" onClick={openAuthModal} />
        </Box>
        <AuthModal open={authModalOpen} onClose={closeAuthModal} onGoogleSignIn={startGoogleSignIn} />
      </Box>
    );
  }

  return (
    <Box className="account-settings">
      <SectionHeader title="Account Settings" />
      <Box className="account-settings-rows">
        <SettingsRow label="Email Address" value={user?.email ?? ''} isReadOnly={true} onChange={() => {}} />
        <SettingsRow label="Sur Name" value={surNameDraft} onChange={setSurNameDraft} />
      </Box>
      {errorMessage ? (
        <Typography variant="body2" className="account-settings-error" role="alert">
          {errorMessage}
        </Typography>
      ) : null}
      <Box className="account-settings-actions">
        <PrimaryButton text="Save" onClick={saveChanges} disabled={pending} />
        <PrimaryButton text="Log Out" onClick={logOut} disabled={pending} />
      </Box>
    </Box>
  );
};

export default AccountSettings;
