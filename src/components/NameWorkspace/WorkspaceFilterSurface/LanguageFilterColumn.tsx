import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFilters } from '@/state/filter/filter.context';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import LanguageFilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/LanguageFilterPicker';
import './LanguageFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const LanguageFilterColumn = ({ mode }: Props) => {
  const {
    state: { languages },
  } = useFilters();
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);

  return (
    <div className="language-filter-column">
      {mode === 'label' && <Typography className="language-filter-column-title">Language</Typography>}
      {mode === 'selector' && (
        <div className="language-filter-column-selector" aria-label="Language available filters">
          <LanguageFilterPicker
            languages={languages}
            selectedLanguageIds={selectedLanguageIds}
            onChange={setSelectedLanguageIds}
          />
        </div>
      )}
      {mode === 'applied' && (
        <div className="language-filter-column-applied" aria-label="Language applied filters">
          <WorkspaceAppliedFilterChip label="French" />
        </div>
      )}
    </div>
  );
};

export default LanguageFilterColumn;
