import AppBar from '@mui/material/AppBar';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import AccountLink from '@/components/Header/AccountLink/AccountLink';
import '@/components/Header/TopBar/TopBar.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar id="top-bar" position="static">
        <LogoFull />
        <AccountLink />
        <IconButton
          id="mobile-menu-button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      {mobileMenuOpen ? (
        <div id="mobile-nav-overlay">
          <IconButton id="mobile-menu-close-button" aria-label="Close navigation menu" onClick={closeMobileMenu}>
            <CloseIcon />
          </IconButton>
          <nav id="mobile-nav-links">
            <Typography variant="h5" component={NavLink} to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Name Generator
            </Typography>
            <Typography variant="h5" component={NavLink} to="/list" className="mobile-nav-link" onClick={closeMobileMenu}>
              Name List
            </Typography>
            <Typography variant="h5" component={NavLink} to="/settings" className="mobile-nav-link" onClick={closeMobileMenu}>
              Account
            </Typography>
          </nav>
        </div>
      ) : null}
    </>
  );
};
