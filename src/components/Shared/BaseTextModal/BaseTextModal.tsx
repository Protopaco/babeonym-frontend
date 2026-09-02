import Typography from '@mui/material/Typography';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import '@/components/Shared/BaseTextModal/BaseTextModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  body?: string[];
  confirmLabel?: string;
  onConfirm?: () => void;
  tone?: 'default' | 'danger';
  size?: 'default' | 'wide';
};

export default ({ open, onClose, title, body = [], confirmLabel, onConfirm, tone = 'default', size = 'default' }: Props) => {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={title}
      size={size}
      confirmLabel={confirmLabel}
      onConfirm={onConfirm}
      tone={tone}
    >
      {body.map((paragraph) => (
        <Typography key={paragraph} variant="body1" className="base-text-modal-copy">
          {paragraph}
        </Typography>
      ))}
    </BaseModal>
  );
};
