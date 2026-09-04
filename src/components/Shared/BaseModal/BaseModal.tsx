import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
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
      <DialogContent className="base-modal-content">
        <SectionHeader
          title={title}
          action={
            <IconButton className="base-modal-close" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        {children}
      </DialogContent>
      <DialogActions className="base-modal-actions">
        <PrimaryTextButton text={closeLabel} size={buttonSize} onClick={onClose} />
        {onConfirm && confirmLabel ? (
          <PrimaryTextButton text={confirmLabel} size={buttonSize} tone={tone} emphasis="fill" onClick={onConfirm} />
        ) : null}
      </DialogActions>
    </Dialog>
  );
};
