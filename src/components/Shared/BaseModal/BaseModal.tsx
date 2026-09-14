import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import '@/components/Shared/BaseModal/BaseModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'default' | 'wide';
  closeLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  tone?: 'default' | 'danger';
};

export default ({
  open,
  onClose,
  title,
  children,
  size = 'default',
  closeLabel = 'Cancel',
  confirmLabel,
  onConfirm,
  tone = 'default',
}: Props) => {
  const buttonSize = size === 'wide' ? 'compact-wide' : 'compact';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-label={title}
      slotProps={{ paper: { className: `base-modal-paper base-modal-paper--${size}` } }}
    >
      {/* Its own header rather than SectionHeader: the band's colours are this
          component's to set, and restyling SectionHeader from here would reach
          into another component's internals. Outside DialogContent so it stays
          put while a long body scrolls. */}
      <div className="base-modal-header">
        <Typography variant="h5" className="base-modal-title">
          {title}
        </Typography>
        <IconButton className="base-modal-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent className="base-modal-content">{children}</DialogContent>
      <DialogActions className="base-modal-actions">
        <PrimaryTextButton text={closeLabel} size={buttonSize} onClick={onClose} />
        {onConfirm && confirmLabel ? (
          <PrimaryTextButton text={confirmLabel} size={buttonSize} tone={tone} emphasis="fill" onClick={onConfirm} />
        ) : null}
      </DialogActions>
    </Dialog>
  );
};
