import CloseIcon from '@mui/icons-material/Close';
import BareIconButton from '@/components/Shared/BareIconButton/BareIconButton';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './WorkspaceFilterActions.css';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  onClearAll: () => void;
  onClose: () => void;
  onSetFilters: () => void;
};

// Both buttons act on the drawer and nothing else: Set Filters applies what is
// picked here, Clear All throws it away. What is already applied is cleared from
// the chips in the filter row, where those filters actually live.
//
// Clear All is not the close button in disguise — closing discards the draft and
// leaves, this discards it and lets you start again.
const WorkspaceFilterActions = ({ disabled = false, isOpen, onClearAll, onClose, onSetFilters }: Props) => (
  <div className="workspace-filter-actions" aria-label="Filter actions">
    {isOpen && (
      <>
        <div className="workspace-filter-actions-close">
          <BareIconButton icon={<CloseIcon />} label="Close filters" onClick={onClose} size="small" />
        </div>
        <PrimaryTextButton text="Clear All" onClick={onClearAll} size="compact" disabled={disabled} />
        <PrimaryTextButton text="Set Filters" onClick={onSetFilters} size="compact" disabled={disabled} />
      </>
    )}
  </div>
);

export default WorkspaceFilterActions;
