import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import './WorkspaceFilterToggle.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterToggle = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-toggle">
    <TutorialTooltip title="Narrows the names you're shown" placement="bottom">
      <PrimaryTextButton
        text="Filters"
        onClick={onToggle}
        size="compact"
        tone="action"
        startIcon={<FilterListIcon className="workspace-filter-toggle-filter-icon" fontSize="small" color="action" />}
      />
    </TutorialTooltip>
  </div>
);

export default WorkspaceFilterToggle;
