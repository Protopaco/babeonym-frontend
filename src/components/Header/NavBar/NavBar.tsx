import { Typography } from '@mui/material';
import '@/components/Header/NavBar/NavBar.css';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <AppBar position="static" id="nav-bar">
      <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
        Name Generator
      </Typography>
      <Typography variant="h6" component={Link} to="/list" sx={{ textDecoration: 'none', color: 'inherit' }}>
        Your Names
      </Typography>
    </AppBar>
  );
};
