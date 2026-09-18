import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './BaseModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'default' | 'wide';
  closeLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  tone?: 'default' | 'danger' | 'action';
};

export default ({ open, onClose, title, children, size = 'default', closeLabel = 'Cancel', confirmLabel, onConfirm, tone = 'default' }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} aria-label={title} slotProps={{ paper: { className: `base-modal-paper base-modal-paper--${size}` } }}>
      {/* Its own header rather than SectionHeader: the band's colours are this
          component's to set, and restyling SectionHeader from here would reach
          into another component's internals. Outside DialogContent so it stays
          put while a long body scrolls. */}
      <div className="base-modal-header">
        <Typography variant="h5" className="base-modal-title">
          {title}
        </Typography>
      </div>
      <DialogContent className="base-modal-content">{children}</DialogContent>
      <DialogActions className="base-modal-actions">
        <PrimaryTextButton text={closeLabel} size="compact" onClick={onClose} />
        {onConfirm && confirmLabel ? <PrimaryTextButton text={confirmLabel} size="compact" tone={tone} emphasis="fill" onClick={onConfirm} /> : null}
      </DialogActions>
    </Dialog>
  );
};
