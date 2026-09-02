import Box from '@mui/material/Box';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
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
    </Box>
  );
};

export default Settings;
