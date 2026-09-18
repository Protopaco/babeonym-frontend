import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AccountLink from '@/components/Header/AccountLink/AccountLink';
import SettingsLink from '@/components/Header/SettingsLink/SettingsLink';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import './DesktopTopBar.css';

export default () => {
  return (
    <AppBar className="desktop-top-bar" position="static">
      <LogoFull />
      <Box className="desktop-top-bar-account">
        <AccountLink />
        <SettingsLink />
      </Box>
    </AppBar>
  );
};
