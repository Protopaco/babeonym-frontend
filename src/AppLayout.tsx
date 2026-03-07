import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '@/pages/Header';
import '@/AppLayout.css';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Box component="main" id="main">
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
