import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AccountLink from '@/components/Header/AccountLink/AccountLink';
import SettingsLink from '@/components/Header/SettingsLink/SettingsLink';
import LogoutButton from '@/components/Header/LogoutButton/LogoutButton';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import '@/components/Header/TopBar/DesktopTopBar.css';

export default () => {
  return (
    <AppBar id="desktop-top-bar" position="static">
      <LogoFull />
      <Box id="desktop-top-bar-account">
        <AccountLink />
        <SettingsLink />
        <LogoutButton />
      </Box>
    </AppBar>
  );
};
