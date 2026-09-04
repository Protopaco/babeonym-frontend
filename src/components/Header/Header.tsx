import TopBar from '@/components/Header/TopBar/TopBar';
import WorkspaceFilterSurface from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterSurface';
import { useLocation } from 'react-router-dom';
import { useWorkspaceMode } from '@/state/givenName/useWorkspaceMode';
import '@/components/Header/Header.css';

const Header = () => {
  const location = useLocation();
  const { workspaceMode } = useWorkspaceMode();

  // Which mode the workspace is in comes from the hook, so the header and the
  // page can never disagree. Whether the workspace is on screen at all is the
  // header's own question, since it renders on every route.
  const isWorkspaceRoute = location.pathname === '/';
  const filterSurfaceMode = isWorkspaceRoute && workspaceMode === 'add' ? 'add' : 'inactive';

  return (
    <div id="header">
      <TopBar />
      <WorkspaceFilterSurface mode={filterSurfaceMode} />
    </div>
  );
};

export default Header;
