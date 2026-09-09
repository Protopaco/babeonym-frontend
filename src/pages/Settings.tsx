import Box from '@mui/material/Box';
import PageBackLink from '@/components/Shared/PageBackLink/PageBackLink';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import AboutButton from '@/components/Settings/AboutButton/AboutButton';
import DeleteAccountButton from '@/components/Settings/DeleteAccountButton/DeleteAccountButton';
import SettingsRow from '@/components/Settings/SettingsRow/SettingsRow';
import ThemePicker from '@/components/Settings/ThemePicker/ThemePicker';
import { useSettings } from '@/pages/useSettings';
import './Settings.css';

const Settings = () => {
  const { userProviderLoaded, surNameDraft, setSurNameDraft, surNameIsDirty, errorMessage, saveSurName } = useSettings();

  if (!userProviderLoaded) {
    return null;
  }

  return (
    <Box className="settings">
      <Box className="settings-back">
        <PageBackLink />
      </Box>
      <SectionHeader title="Settings" />
      <Box className="settings-rows">
        <ThemePicker />
        <SettingsRow
          label="Sur Name"
          value={surNameDraft}
          onChange={setSurNameDraft}
          isDirty={surNameIsDirty}
          onSave={saveSurName}
          errorMessage={errorMessage}
        />
      </Box>
      <Box className="settings-footer">
        <AboutButton />
        <DeleteAccountButton />
      </Box>
    </Box>
  );
};

export default Settings;
