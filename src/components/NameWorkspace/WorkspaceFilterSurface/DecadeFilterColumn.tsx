import Typography from '@mui/material/Typography';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './DecadeFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const DecadeFilterColumn = ({ mode }: Props) => (
  <div className="decade-filter-column">
    {mode === 'label' && <Typography className="decade-filter-column-title">Decade</Typography>}
    {mode === 'selector' && (
      <div className="decade-filter-column-selector" aria-label="Decade available filters">
        <Typography className="decade-filter-column-placeholder">Decade selector placeholder</Typography>
      </div>
    )}
    {mode === 'applied' && (
      <div className="decade-filter-column-applied" aria-label="Decade applied filters">
        <WorkspaceAppliedFilterChip label="1990s" />
      </div>
    )}
  </div>
);

export default DecadeFilterColumn;
