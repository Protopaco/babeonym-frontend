import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import HorizontalRule from '@/components/Shared/HorizontalRule/HorizontalRule';
import PageBackLink from '@/components/Shared/PageBackLink/PageBackLink';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import AboutButton from '@/components/Settings/AboutButton/AboutButton';
import DeleteAccountButton from '@/components/Settings/DeleteAccountButton/DeleteAccountButton';
import SettingsRow from '@/components/Settings/SettingsRow/SettingsRow';
import SurNameSuggestion from '@/components/Settings/SurNameSuggestion/SurNameSuggestion';
import ThemePicker from '@/components/Settings/ThemePicker/ThemePicker';
import { useSettings } from '@/pages/Settings/useSettings';
import { NAME_MAX_LENGTH } from '@/constants/nameMaxLength';
import motionTokens from '@/themes/motion.theme';
import './Settings.css';

const Settings = () => {
  const {
    userProviderLoaded,
    surNameDraft,
    changeSurNameDraft,
    surNameIsDirty,
    errorMessage,
    saveSurName,
    surNameSuggestion,
    acceptSurNameSuggestion,
  } = useSettings();

  // Fades in once the user has loaded rather than popping from blank. No
  // initial animation, so arriving from inside the app, where the user is
  // already loaded, shows the page at once; only a fresh load fades.
  return (
    <AnimatePresence initial={false}>
      {userProviderLoaded ? (
        <motion.div
          key="settings"
          className="settings"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
        >
          <Box className="settings-column">
            <Box className="settings-back">
              <PageBackLink />
            </Box>
            <SectionHeader title="Settings" />
            <Box className="settings-rows">
              <ThemePicker />
              <SettingsRow
                label="Surname"
                value={surNameDraft}
                onChange={changeSurNameDraft}
                maxLength={NAME_MAX_LENGTH}
                isDirty={surNameIsDirty}
                onSave={saveSurName}
                errorMessage={errorMessage}
                suggestion={
                  surNameSuggestion === null ? undefined : (
                    <SurNameSuggestion savedSurName={surNameDraft} suggestedSurName={surNameSuggestion} onAccept={acceptSurNameSuggestion} />
                  )
                }
                tutorialHint="Shown under every name so you can hear them together"
              />
            </Box>
            <HorizontalRule />
            <Box className="settings-footer">
              <AboutButton />
              <DeleteAccountButton />
            </Box>
          </Box>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Settings;
