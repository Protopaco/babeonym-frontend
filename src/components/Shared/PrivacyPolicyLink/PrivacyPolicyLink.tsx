import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import './PrivacyPolicyLink.css';

type Props = {
  // Whatever holds the link closes itself here. The sign-in modal lives in the
  // header, which stays mounted across routes, so without this it would sit
  // open on top of the page it just linked to.
  onClick?: () => void;
  // Default matches body copy, where a smaller link reads as fine print. Compact
  // sits under a button, where it matches the button's own text.
  size?: 'default' | 'compact';
};

const PrivacyPolicyLink = ({ onClick, size = 'default' }: Props) => (
  <Link component={RouterLink} to="/privacy" onClick={onClick} variant={size === 'compact' ? 'body2' : 'body1'} className="privacy-policy-link">
    Privacy policy
  </Link>
);

export default PrivacyPolicyLink;
