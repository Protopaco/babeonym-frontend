import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import '@/components/Header/SettingsLink/SettingsLink.css';

export default () => (
  <IconButton className="settings-link" aria-label="Settings" component={Link} to="/settings">
    <SettingsIcon />
  </IconButton>
);
