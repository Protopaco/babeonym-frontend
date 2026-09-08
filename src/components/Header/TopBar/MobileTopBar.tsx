import AppBar from '@mui/material/AppBar';
import LogoFull from '@/components/Header/LogoFull/LogoFull';
import MobileTutorialToggle from '@/components/Header/TopBar/MobileTutorialToggle';
import MobileAccountButton from '@/components/Header/TopBar/MobileAccountButton';
import SettingsLink from '@/components/Header/SettingsLink/SettingsLink';
import '@/components/Header/TopBar/MobileTopBar.css';

// The menu it replaced held three links: this page, a dead route, and settings.
// One destination does not need a drawer to reach it.
export default () => {
  return (
    <AppBar id="mobile-top-bar" position="static">
      <LogoFull />
      {/* Grouped rather than split across the bar: three controls at two
          different edges read as three unrelated things. */}
      <div id="mobile-top-bar-controls">
        <MobileAccountButton />
        <SettingsLink />
        <MobileTutorialToggle />
      </div>
    </AppBar>
  );
};
