import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawerHeader/FilterDrawerHeader.css';

export default (props: any) => {
  const { drawerOpen, setDrawerOpen } = props;

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box id="filter-drawer-header">
      <IconButton id="toggle-drawer-button" onClick={() => toggleDrawerOpen()}>
        {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Box>
  );
};
