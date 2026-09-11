import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import '@/components/Header/SettingsLink/SettingsLink.css';

export default () => (
  <TutorialTooltip title="Your surname and the app's colours" placement="bottom">
    <IconButton className="settings-link" aria-label="Settings" component={Link} to="/settings">
      <SettingsIcon />
    </IconButton>
  </TutorialTooltip>
);
