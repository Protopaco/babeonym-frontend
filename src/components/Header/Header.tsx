import TopBar from '@/components/Header/TopBar/TopBar';
import WorkspaceFilterSurface from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterSurface';
import { useLocation, useSearchParams } from 'react-router-dom';
import '@/components/Header/Header.css';

const Header = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const workspaceMode = location.pathname === '/' && searchParams.get('mode') !== 'compare' ? 'add' : 'inactive';

  return (
    <div id="header">
      <TopBar />
      <WorkspaceFilterSurface mode={workspaceMode} />
    </div>
  );
};

export default Header;
