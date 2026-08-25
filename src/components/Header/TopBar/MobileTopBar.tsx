import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import '@/components/Header/TopBar/MobileTopBar.css';

type MobileTopBarProps = {
  mobileMenuOpen: boolean;
  onOpenMenu: () => void;
};

export default ({ mobileMenuOpen, onOpenMenu }: MobileTopBarProps) => {
  return (
    <AppBar id="mobile-top-bar" position="static">
      <LogoFull />
      <IconButton
        id="mobile-menu-button"
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
        onClick={onOpenMenu}
      >
        <MenuIcon />
      </IconButton>
    </AppBar>
  );
};
