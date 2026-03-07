import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/FilterDrawer/FilterDrawer.css';

export default (props: any) => {
  const { drawerOpen, setDrawerOpen } = props;
  console.log('🚀 ~ drawerOpen:', drawerOpen);
  //const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawerOpen = () => {
    //console.log('🚀 ~ toggleDrawerOpen ~ newOpen:', newOpen);

    setDrawerOpen(!drawerOpen);
  };

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
        //   onClose={toggleDrawerOpen(false)}
        //   onOpen={toggleDrawerOpen(true)}
        //   swipeAreaWidth={56}
        //   disableSwipeToOpen={false}
        //   keepMounted
      >
        <Box id="filter-header">
          DRAWER
          <button onClick={() => toggleDrawerOpen()}>{drawerOpen ? 'close' : 'open'}</button>
        </Box>
      </Drawer>
    </>
  );
};
