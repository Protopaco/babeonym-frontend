import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import SettingsRow from '@/components/Settings/SettingsRow/SettingsRow';
import { useSettings } from '@/pages/useSettings';
import './Settings.css';

const Settings = () => {
  const { user, userProviderLoaded, surNameDraft, setSurNameDraft, pending, errorMessage, saveChanges, logOut } = useSettings();

  if (!userProviderLoaded) {
    return null;
  }

  const isAnonymousUser = !user || user.authProvider === 'anonymous';

  return (
    <Box className="settings">
      <SectionHeader title="Account Settings" />
      <Box className="settings-rows">
        <SettingsRow label="Sur Name" value={surNameDraft} onChange={setSurNameDraft} />
      </Box>
      {errorMessage ? (
        <Typography variant="body2" className="settings-error" role="alert">
          {errorMessage}
        </Typography>
      ) : null}
      <Box className="settings-actions">
        <PrimaryButton size="compact" text="Save" onClick={saveChanges} disabled={pending} />
        {isAnonymousUser ? null : <PrimaryButton size="compact" text="Log Out" onClick={logOut} disabled={pending} />}
      </Box>
    </Box>
  );
};

export default Settings;
