import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import './LanguageFilterColumn.css';

const LanguageFilterColumn = () => {
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);

  return (
    <div className="language-filter-column">
      <Typography className="language-filter-column-title">Language</Typography>
      <div className="language-filter-column-selector" aria-label="Language available filters">
        <FilterPicker
          ariaLabel="Language filter options"
          options={mockNameFilterReferenceData.languageOptions}
          searchLabel="Search languages"
          selectedOptionIds={selectedLanguageIds}
          onChange={setSelectedLanguageIds}
        />
      </div>
    </div>
  );
};

export default LanguageFilterColumn;
