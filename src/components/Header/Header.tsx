import NavBar from '@/components/Header/NavBar/NavBar';
import TopBar from '@/components/Header/TopBar/TopBar';
import '@/components/Header/Header.css';

const Header = () => {
  return (
    <div id="header">
      <TopBar />
      <NavBar />
    </div>
  );
};

export default Header;
