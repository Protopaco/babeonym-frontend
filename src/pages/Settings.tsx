import Box from '@mui/material/Box';
import PageBackLink from '@/components/Shared/PageBackLink/PageBackLink';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import AboutButton from '@/components/Settings/AboutButton/AboutButton';
import DeleteAccountButton from '@/components/Settings/DeleteAccountButton/DeleteAccountButton';
import SettingsRow from '@/components/Settings/SettingsRow/SettingsRow';
import ThemePicker from '@/components/Settings/ThemePicker/ThemePicker';
import { useSettings } from '@/pages/useSettings';
import { NAME_MAX_LENGTH } from '@/constants/nameMaxLength';
import './Settings.css';

const Settings = () => {
  const { userProviderLoaded, surNameDraft, changeSurNameDraft, surNameIsDirty, errorMessage, saveSurName } = useSettings();

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
          onChange={changeSurNameDraft}
          maxLength={NAME_MAX_LENGTH}
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
