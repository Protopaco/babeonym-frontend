import DesktopTopBar from '@/components/Header/TopBar/DesktopTopBar/DesktopTopBar';
import MobileTopBar from '@/components/Header/TopBar/MobileTopBar/MobileTopBar';
import './TopBar.css';

export default () => {
  return (
    <>
      <DesktopTopBar />
      <MobileTopBar />
    </>
  );
};
