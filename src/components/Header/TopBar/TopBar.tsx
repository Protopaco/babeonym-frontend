import AppBar from '@mui/material/AppBar';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import AccountLink from '@/components/Header/AccountLink/AccountLink';
import '@/components/Header/TopBar/TopBar.css';

export default () => {
  return (
    <AppBar id="top-bar" position="static">
      <LogoFull />
      <AccountLink />
    </AppBar>
  );
};
