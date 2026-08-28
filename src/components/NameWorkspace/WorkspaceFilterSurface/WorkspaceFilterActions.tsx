import Typography from '@mui/material/Typography';
import './WorkspaceFilterActions.css';

type Props = {
  isOpen: boolean;
};

const WorkspaceFilterActions = ({ isOpen }: Props) => (
  <div className="workspace-filter-actions" aria-label="Filter actions">
    {isOpen && <Typography className="workspace-filter-actions-placeholder">Actions</Typography>}
  </div>
);

export default WorkspaceFilterActions;
