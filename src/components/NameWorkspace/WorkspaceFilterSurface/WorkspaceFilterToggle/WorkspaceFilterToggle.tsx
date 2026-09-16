import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './WorkspaceFilterToggle.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterToggle = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-toggle">
    <TutorialTooltip title="Narrows the names you're shown" placement="bottom">
      <Button
        // variant="contained"
        onClick={onToggle}
        startIcon={<FilterListIcon className="workspace-filter-toggle-filter-icon" fontSize="small" />}
      >
        <Typography className="workspace-filter-toggle-label">Filters</Typography>
      </Button>
    </TutorialTooltip>
  </div>
);

export default WorkspaceFilterToggle;
