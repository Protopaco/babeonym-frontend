import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './WorkspaceFilterToggle.css';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const WorkspaceFilterToggle = ({ isOpen, onToggle }: Props) => (
  <div className="workspace-filter-toggle">
    <Typography className="workspace-filter-toggle-label">Filters</Typography>
    <IconButton
      className="workspace-filter-toggle-button"
      aria-label={isOpen ? 'Close filters' : 'Open filters'}
      aria-expanded={isOpen}
      onClick={onToggle}
      size="small"
    >
      <KeyboardArrowDownIcon className={isOpen ? 'workspace-filter-toggle-icon--open' : undefined} />
    </IconButton>
  </div>
);

export default WorkspaceFilterToggle;
