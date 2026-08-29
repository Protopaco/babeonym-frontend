import Typography from '@mui/material/Typography';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './CultureFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const CultureFilterColumn = ({ mode }: Props) => (
  <div className="culture-filter-column">
    {mode === 'label' && <Typography className="culture-filter-column-title">Culture</Typography>}
    {mode === 'selector' && (
      <div className="culture-filter-column-selector" aria-label="Culture available filters">
        <Typography className="culture-filter-column-placeholder">Culture selector placeholder</Typography>
      </div>
    )}
    {mode === 'applied' && (
      <div className="culture-filter-column-applied" aria-label="Culture applied filters">
        <WorkspaceAppliedFilterChip label="Irish" />
      </div>
    )}
  </div>
);

export default CultureFilterColumn;
