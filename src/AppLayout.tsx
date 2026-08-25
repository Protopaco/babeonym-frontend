import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '@/components/Header/Header';
import FloatingTutorialIcon from '@/components/Shared/FloatingTutorialIcon/FloatingTutorialIcon';
import '@/AppLayout.css';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Box component="main" id="main">
        <Outlet />
      </Box>
      <FloatingTutorialIcon />
    </>
  );
};

export default AppLayout;
