import Typography from '@mui/material/Typography';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './GenderFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const GenderFilterColumn = ({ mode }: Props) => (
  <div className="gender-filter-column">
    {mode === 'label' && <Typography className="gender-filter-column-title">Gender</Typography>}
    {mode === 'selector' && (
      <div className="gender-filter-column-selector" aria-label="Gender available filters">
        <Typography className="gender-filter-column-placeholder">Gender selector placeholder</Typography>
      </div>
    )}
    {mode === 'applied' && (
      <div className="gender-filter-column-applied" aria-label="Gender applied filters">
        <WorkspaceAppliedFilterChip label="Neutral" />
      </div>
    )}
  </div>
);

export default GenderFilterColumn;
