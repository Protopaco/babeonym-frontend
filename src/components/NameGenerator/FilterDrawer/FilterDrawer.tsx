import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';
import FilterDrawerOpenContent from '@/components/NameGenerator/FilterDrawer/FilterDrawerOpenContent';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  isLoading: boolean;
};

export default ({ drawerOpen, setDrawerOpen, isLoading }: Props) => {
  return (
    <Box>
      <Drawer
        id="filter-drawer"
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        className={drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'}
        slotProps={{ paper: { className: `${drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'} themed-scrollbar` } }}
      >
        <Box className={`filter-drawer-content ${drawerOpen ? 'filter-drawer-content-open' : 'filter-drawer-content-closed'}`}>
          <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <FilterDrawerOpenContent drawerOpen={drawerOpen} isLoading={isLoading} />
        </Box>
      </Drawer>
    </Box>
  );
};
