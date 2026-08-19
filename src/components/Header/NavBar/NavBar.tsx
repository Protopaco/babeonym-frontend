import { Typography } from '@mui/material';
import '@/components/Header/NavBar/NavBar.css';
import AppBar from '@mui/material/AppBar';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <AppBar position="static" id="nav-bar">
      <Typography variant="h6" component={NavLink} to="/" className="nav-bar-link">
        Name Generator
      </Typography>
      <Typography variant="h6" component={NavLink} to="/list" className="nav-bar-link">
        Your Names
      </Typography>
    </AppBar>
  );
};
