import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import '@/components/Header/TopBar/MobileNavOverlay.css';

type MobileNavOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default ({ open, onClose }: MobileNavOverlayProps) => {
  if (!open) {
    return null;
  }

  return (
    <div id="mobile-nav-overlay">
      <IconButton id="mobile-menu-close-button" aria-label="Close navigation menu" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <nav id="mobile-nav-links">
        <Typography variant="h5" component={NavLink} to="/" className="mobile-nav-link" onClick={onClose}>
          Name Generator
        </Typography>
        <Typography variant="h5" component={NavLink} to="/list" className="mobile-nav-link" onClick={onClose}>
          Name List
        </Typography>
        <Typography variant="h5" component={NavLink} to="/settings" className="mobile-nav-link" onClick={onClose}>
          Account
        </Typography>
      </nav>
    </div>
  );
};
