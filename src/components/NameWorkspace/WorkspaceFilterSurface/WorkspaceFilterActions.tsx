import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './WorkspaceFilterActions.css';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSetFilters: () => void;
};

const WorkspaceFilterActions = ({ disabled = false, isOpen, onClose, onSetFilters }: Props) => (
  <div className="workspace-filter-actions" aria-label="Filter actions">
    {isOpen && (
      <>
        <IconButton className="workspace-filter-actions-close" aria-label="Close filters" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
        <PrimaryTextButton text="Set Filters" onClick={onSetFilters} size="compact" disabled={disabled} />
      </>
    )}
  </div>
);

export default WorkspaceFilterActions;
