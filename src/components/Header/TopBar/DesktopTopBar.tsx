import AppBar from '@mui/material/AppBar';
import AccountLink from '@/components/Header/AccountLink/AccountLink';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import '@/components/Header/TopBar/DesktopTopBar.css';

export default () => {
  return (
    <AppBar id="desktop-top-bar" position="static">
      <LogoFull />
      <AccountLink />
    </AppBar>
  );
};
