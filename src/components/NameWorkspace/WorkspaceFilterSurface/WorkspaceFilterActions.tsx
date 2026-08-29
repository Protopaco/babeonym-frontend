import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import './WorkspaceFilterActions.css';

type Props = {
  isOpen: boolean;
};

const WorkspaceFilterActions = ({ isOpen }: Props) => (
  <div className="workspace-filter-actions" aria-label="Filter actions">
    {isOpen && <PrimaryButton text="Set Filters" onClick={() => {}} size="compact" />}
  </div>
);

export default WorkspaceFilterActions;
