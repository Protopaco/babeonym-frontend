import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';
import DecadesFilter from '@/components/NameGenerator/DecadesFilter/DecadesFilter';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export default ({ drawerOpen, setDrawerOpen }: Props) => {
  return (
    <Box>
      <Drawer
        id="filter-drawer"
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        className={drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'}
        slotProps={{ paper: { className: drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed' } }}
      >
        <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <DecadesFilter />
      </Drawer>
    </Box>
  );
};
