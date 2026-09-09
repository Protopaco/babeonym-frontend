import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import '@/components/Shared/PageBackLink/PageBackLink.css';

// Named the destination rather than the gesture. An arrow is understood on its
// own; where it lands is the part it cannot say. The tooltip and the accessible
// name are the same string so the two never drift.
const BACK_LABEL = 'Back to your names';

// A Link rather than a click handler, so middle-click and open-in-new-tab work
// the way they do everywhere else in the app.
const PageBackLink = () => (
  <TutorialTooltip title={BACK_LABEL} placement="bottom">
    <IconButton className="page-back-link" aria-label={BACK_LABEL} component={Link} to="/">
      <ArrowBackIcon />
    </IconButton>
  </TutorialTooltip>
);

export default PageBackLink;
