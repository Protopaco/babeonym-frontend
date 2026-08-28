import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './WorkspaceFilterSurface.css';

type WorkspaceFilterSurfaceMode = 'add' | 'inactive';

type Props = {
  mode: WorkspaceFilterSurfaceMode;
};

const WorkspaceFilterSurface = ({ mode }: Props) => {
  if (mode === 'inactive') {
    return <div className="workspace-filter-surface workspace-filter-surface--inactive" aria-hidden="true" />;
  }

  return (
    <section className="workspace-filter-surface workspace-filter-surface--collapsed" aria-label="Name filters">
      <div className="workspace-filter-surface-heading">
        <Typography className="workspace-filter-surface-title">Filters</Typography>
        <IconButton className="workspace-filter-surface-toggle" aria-label="Open filters" size="small">
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <div className="workspace-filter-surface-applied" aria-label="Applied filters" />
    </section>
  );
};

export default WorkspaceFilterSurface;
