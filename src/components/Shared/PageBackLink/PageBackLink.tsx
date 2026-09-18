import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './PageBackLink.css';

// Named the destination rather than the gesture. An arrow is understood on its
// own; where it lands is the part it cannot say. The tooltip and the accessible
// name are the same string so the two never drift.
const BACK_LABEL = 'Back to your names';

const PageBackLink = () => (
  <TutorialTooltip title={BACK_LABEL} placement="bottom">
    <BareIconButton icon={<ArrowBackIcon />} label={BACK_LABEL} to="/" />
  </TutorialTooltip>
);

export default PageBackLink;
