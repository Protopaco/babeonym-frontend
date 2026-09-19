import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import CopyEmailButton from '@/components/Settings/AboutButton/CopyEmailButton/CopyEmailButton';
import PrivacyPolicyLink from '@/components/Shared/PrivacyPolicyLink/PrivacyPolicyLink';
import { CONTACT_EMAIL } from '@/constants/contactEmail';
import './AboutModal.css';

const ACKNOWLEDGE_LABEL = 'Got it';

type Props = {
  open: boolean;
  onClose: () => void;
};

// Deliberately short. Its job is to say what the app is, who made it and how to
// reach him — and, once the portfolio site exists, to point at it. The tech
// stack belongs there rather than here.
const AboutModal = ({ open, onClose }: Props) => {
  return (
    <BaseModal open={open} onClose={onClose} title="About Babeonym" size="wide" closeLabel={ACKNOWLEDGE_LABEL}>
      <Typography variant="body1" className="about-modal-copy">
        Babeonym helps you find a name you can agree on.
      </Typography>
      {/* The name and the address are one block, so they read as a signature
          rather than as two separate statements. The portfolio link goes here
          when the site exists. */}
      <Box className="about-modal-credit">
        <Typography variant="body1">Built by Paul Stevens</Typography>
        {/* The address is not selectable, so copying it is the only way to use
            it without a mail app. */}
        <Box className="about-modal-email-row">
          <Link className="about-modal-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </Link>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </Box>
      </Box>
      <Box className="about-modal-privacy">
        <PrivacyPolicyLink onClick={onClose} />
      </Box>
    </BaseModal>
  );
};

export default AboutModal;
