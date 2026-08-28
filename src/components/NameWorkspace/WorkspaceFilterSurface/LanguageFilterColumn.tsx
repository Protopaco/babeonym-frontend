import Typography from '@mui/material/Typography';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './LanguageFilterColumn.css';

type Props = {
  isOpen: boolean;
};

const LanguageFilterColumn = ({ isOpen }: Props) => (
  <div className="language-filter-column">
    {isOpen && (
      <div className="language-filter-column-available" aria-label="Language available filters">
        <Typography className="language-filter-column-label">Language</Typography>
      </div>
    )}
    <div className="language-filter-column-applied" aria-label="Language applied filters">
      <WorkspaceAppliedFilterChip label="French" />
    </div>
  </div>
);

export default LanguageFilterColumn;
