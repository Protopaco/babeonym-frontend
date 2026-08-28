import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './WorkspaceAddNameItem.css';

type Props = {
  onClick: () => void;
};

const WorkspaceAddNameItem = ({ onClick }: Props) => {
  return (
    <li className="workspace-add-name-item">
      <Tooltip title="Add custom name">
        <IconButton className="workspace-add-name-button" onClick={onClick} aria-label="Add custom name">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </li>
  );
};

export default WorkspaceAddNameItem;
