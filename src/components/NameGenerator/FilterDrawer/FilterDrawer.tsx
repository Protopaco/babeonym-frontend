import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';

export default (props: any) => {
  const { drawerOpen, setDrawerOpen } = props;

  return (
    <>
      <Drawer
        id="filter-drawer"
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        className={drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'}
        //PaperProps={}
        slotProps={{ paper: { className: drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed' } }}
      >
        <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </Drawer>
    </>
  );
};
