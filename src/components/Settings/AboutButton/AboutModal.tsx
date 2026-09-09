import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import '@/components/Settings/AboutButton/AboutModal.css';

// Forwards to Paul's own address, so if it ever attracts spam the forward
// changes and nothing else does. Left as a plain mailto rather than assembled
// at runtime: this is a client-rendered app, so the address is already in a JS
// bundle rather than in served HTML, and the tricks that hide it cost either
// the working link or the accessibility of it.
const CONTACT_EMAIL = 'babeonym@gmail.com';

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
        <Link className="about-modal-email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </Link>
      </Box>
    </BaseModal>
  );
};

export default AboutModal;
