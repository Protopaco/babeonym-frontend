import AppBar from '@mui/material/AppBar';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import MobileTutorialToggle from '@/components/Header/TopBar/MobileTutorialToggle/MobileTutorialToggle';
import MobileAccountButton from '@/components/Header/TopBar/MobileAccountButton/MobileAccountButton';
import SettingsLink from '@/components/Header/SettingsLink/SettingsLink';
import './MobileTopBar.css';

// The menu it replaced held three links: this page, a dead route, and settings.
// One destination does not need a drawer to reach it.
export default () => {
  return (
    <AppBar className="mobile-top-bar" elevation={0} position="static">
      <LogoFull />
      {/* Grouped rather than split across the bar: three controls at two
          different edges read as three unrelated things. */}
      <div className="mobile-top-bar-controls">
        <MobileAccountButton />
        <SettingsLink />
        <MobileTutorialToggle />
      </div>
    </AppBar>
  );
};
