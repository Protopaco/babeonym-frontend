import Typography from '@mui/material/Typography';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './CultureFilterColumn.css';

type Props = {
  isOpen: boolean;
};

const CultureFilterColumn = ({ isOpen }: Props) => (
  <div className="culture-filter-column">
    {isOpen && (
      <div className="culture-filter-column-available" aria-label="Culture available filters">
        <Typography className="culture-filter-column-label">Culture</Typography>
      </div>
    )}
    <div className="culture-filter-column-applied" aria-label="Culture applied filters">
      <WorkspaceAppliedFilterChip label="Irish" />
    </div>
  </div>
);

export default CultureFilterColumn;
