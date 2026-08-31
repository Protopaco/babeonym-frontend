import Typography from '@mui/material/Typography';
import '@/components/Header/AccountLink/AccountLink.css';
import { Link } from 'react-router-dom';
import { useUser } from '@/state/user/user.context';

export default () => {
  const {
    state: { user, userProviderLoaded },
  } = useUser();

  if (!userProviderLoaded) {
    return null;
  }

  const isAnonymousUser = !user || user.authProvider === 'anonymous';
  const accountLinkLabel = isAnonymousUser ? 'Sign In / Sign Up' : (user.email ?? 'Account');

  return (
    <Typography variant="body1" color="primary" id="account-link" component={Link} to="/settings">
      {accountLinkLabel}
    </Typography>
  );
};
