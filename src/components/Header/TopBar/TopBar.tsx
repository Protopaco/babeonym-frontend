import DesktopTopBar from '@/components/Header/TopBar/DesktopTopBar';
import MobileTopBar from '@/components/Header/TopBar/MobileTopBar';
import './TopBar.css';

export default () => {
  return (
    <>
      <DesktopTopBar />
      <MobileTopBar />
    </>
  );
};
