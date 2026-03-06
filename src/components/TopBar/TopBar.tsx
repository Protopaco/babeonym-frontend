import AppBar from '@mui/material/AppBar';
import LogoFull from '@/components/LogoFull/LogoFull';
import AccountLink from '@/components/AccountLink/AccountLink';
import '@/components/TopBar/TopBar.css';

export default () => {
  return (
    <AppBar id="top-bar" position="static">
      <LogoFull />
      <AccountLink />
    </AppBar>
  );
};
