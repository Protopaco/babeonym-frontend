import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './LanguageFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const LanguageFilterColumn = ({ mode }: Props) => {
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);

  return (
    <div className="language-filter-column">
      {mode === 'label' && <Typography className="language-filter-column-title">Language</Typography>}
      {mode === 'selector' && (
        <div className="language-filter-column-selector" aria-label="Language available filters">
          <FilterPicker
            ariaLabel="Language filter options"
            options={mockNameFilterReferenceData.languageOptions}
            searchLabel="Search languages"
            selectedOptionIds={selectedLanguageIds}
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
