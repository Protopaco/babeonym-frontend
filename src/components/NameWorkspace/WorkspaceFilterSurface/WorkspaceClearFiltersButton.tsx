import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './WorkspaceClearFiltersButton.css';

type Props = {
  onClearFilters: () => void;
};

// The right-hand end of the filter row, opposite the Filters toggle. The chips
// between them scroll, so the two ends are what give that strip a boundary —
// without this the row simply runs off the edge.
const WorkspaceClearFiltersButton = ({ onClearFilters }: Props) => (
  <div className="workspace-clear-filters-button">
    <Button onClick={onClearFilters} startIcon={<FilterListOffIcon className="workspace-clear-filters-button-icon" fontSize="small" />}>
      <Typography className="workspace-clear-filters-button-label">Clear All</Typography>
    </Button>
  </div>
);

export default WorkspaceClearFiltersButton;
