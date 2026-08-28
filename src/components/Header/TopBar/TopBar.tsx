import DesktopTopBar from '@/components/Header/TopBar/DesktopTopBar';
import MobileNavOverlay from '@/components/Header/TopBar/MobileNavOverlay';
import MobileTopBar from '@/components/Header/TopBar/MobileTopBar';
import { useState } from 'react';
import './TopBar.css';

export default () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <DesktopTopBar />
      <MobileTopBar mobileMenuOpen={mobileMenuOpen} onOpenMenu={() => setMobileMenuOpen(true)} />
      <MobileNavOverlay open={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};
