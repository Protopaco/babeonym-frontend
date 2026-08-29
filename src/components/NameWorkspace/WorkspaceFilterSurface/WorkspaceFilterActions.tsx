import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import './WorkspaceFilterActions.css';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  onSetFilters: () => void;
};

const WorkspaceFilterActions = ({ disabled = false, isOpen, onSetFilters }: Props) => (
  <div className="workspace-filter-actions" aria-label="Filter actions">
    {isOpen && <PrimaryButton text="Set Filters" onClick={onSetFilters} size="compact" disabled={disabled} />}
  </div>
);

export default WorkspaceFilterActions;
