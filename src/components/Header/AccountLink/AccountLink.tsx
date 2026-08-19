import Typography from '@mui/material/Typography';
import '@/components/Header/AccountLink/AccountLink.css';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Typography variant="body1" color="primary" id="account-link" component={Link} to="/settings">
      Account
    </Typography>
  );
};
