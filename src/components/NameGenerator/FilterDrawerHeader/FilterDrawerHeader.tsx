import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawerHeader/FilterDrawerHeader.css';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export default ({ drawerOpen, setDrawerOpen }: Props) => {
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box id="filter-drawer-header" className={drawerOpen ? 'filter-drawer-header-open' : 'filter-drawer-header-closed'}>
      <IconButton id="toggle-drawer-button" onClick={() => toggleDrawerOpen()}>
        {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Box>
  );
};
