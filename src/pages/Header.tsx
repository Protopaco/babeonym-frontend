import NavBar from '@/components/NavBar/NavBar';
import TopBar from '@/components/TopBar/TopBar';
import '@/pages/Header.css';

const Header = () => {
  return (
    <div id="header">
      <TopBar />
      <NavBar />
    </div>
  );
};

export default Header;
