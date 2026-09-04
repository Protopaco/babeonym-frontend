import Typography from '@mui/material/Typography';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import '@/components/Shared/InformationalModal/InformationalModal.css';

const ACKNOWLEDGE_LABEL = 'Got it';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  bodyText: string;
};

// A modal that tells the user something and closes. It deliberately does not
// accept confirm actions or a size, so an informational modal cannot grow into
// one that asks the user to decide something.
const InformationalModal = ({ open, onClose, title, bodyText }: Props) => {
  return (
    <BaseModal open={open} onClose={onClose} title={title} closeLabel={ACKNOWLEDGE_LABEL} size={'wide'}>
      <Typography variant="body1" className="informational-modal-copy">
        {bodyText}
      </Typography>
    </BaseModal>
  );
};

export default InformationalModal;
