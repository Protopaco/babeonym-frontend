import { Typography } from '@mui/material';
import '@/components/Header/NavBar/NavBar.css';
import AppBar from '@mui/material/AppBar';

export default () => {
  return (
    <AppBar position="static" id="nav-bar">
      <Typography variant="body1">Name Generator</Typography>
      <Typography variant="body1">Your Names</Typography>
    </AppBar>
  );
};
