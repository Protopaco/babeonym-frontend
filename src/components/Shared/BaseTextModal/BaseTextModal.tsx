import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import '@/components/Shared/BaseTextModal/BaseTextModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string[];
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  size?: 'default' | 'wide';
};

export default ({
  open,
  onClose,
  title,
  body,
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  tone = 'default',
  size = 'default',
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-label={title}
      slotProps={{ paper: { className: `base-text-modal-paper base-text-modal-paper--${size}` } }}
    >
      <DialogContent className="base-text-modal-content">
        <SectionHeader
          title={title}
          action={
            <IconButton className="base-text-modal-close" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        {body.map((paragraph) => (
          <Typography key={paragraph} variant="body1" className="base-text-modal-copy">
            {paragraph}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions className="base-text-modal-actions">
        <PrimaryButton text={cancelLabel} size="compact" onClick={onClose} />
        <PrimaryButton text={confirmLabel} size="compact" tone={tone} onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};
