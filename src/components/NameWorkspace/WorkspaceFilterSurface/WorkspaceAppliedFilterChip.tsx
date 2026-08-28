import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import './WorkspaceAppliedFilterChip.css';

type Props = {
  label: string;
};

const WorkspaceAppliedFilterChip = ({ label }: Props) => (
  <Chip className="workspace-applied-filter-chip" label={label} deleteIcon={<CancelIcon />} onDelete={() => undefined} />
);

export default WorkspaceAppliedFilterChip;
