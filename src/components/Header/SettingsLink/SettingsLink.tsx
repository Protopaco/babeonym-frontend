import SettingsIcon from '@mui/icons-material/Settings';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './SettingsLink.css';

export default () => (
  <TutorialTooltip title="Your surname and the app's colours" placement="bottom">
    <BareIconButton icon={<SettingsIcon />} label="Settings" to="/settings" tone="action" />
  </TutorialTooltip>
);
