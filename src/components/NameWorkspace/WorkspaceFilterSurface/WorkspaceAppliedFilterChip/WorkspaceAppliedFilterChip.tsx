import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import './WorkspaceAppliedFilterChip.css';

type Props = {
  label: string;
  onDelete: () => void;
};

const WorkspaceAppliedFilterChip = ({ label, onDelete }: Props) => (
  <Chip className="workspace-applied-filter-chip" label={label} deleteIcon={<CancelIcon />} onDelete={onDelete} />
);

export default WorkspaceAppliedFilterChip;
