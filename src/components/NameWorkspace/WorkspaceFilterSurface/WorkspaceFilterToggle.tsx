import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './WorkspaceFilterToggle.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterToggle = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-toggle">
    <Button
      // variant="contained"
      onClick={onToggle}
      startIcon={<FilterListIcon className="workspace-filter-toggle-filter-icon" fontSize="small" />}
    >
      <Typography className="workspace-filter-toggle-label">Filters</Typography>
    </Button>
  </div>
);

export default WorkspaceFilterToggle;
