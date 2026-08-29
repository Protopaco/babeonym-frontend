import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import './CultureFilterColumn.css';

const CultureFilterColumn = () => {
  const [selectedCultureIds, setSelectedCultureIds] = useState<number[]>([]);

  return (
    <div className="culture-filter-column">
      <Typography className="culture-filter-column-title">Culture</Typography>
      <div className="culture-filter-column-selector" aria-label="Culture available filters">
        <FilterPicker
          ariaLabel="Culture filter options"
          options={mockNameFilterReferenceData.cultureOptions}
          searchLabel="Search cultures"
          selectedOptionIds={selectedCultureIds}
          onChange={setSelectedCultureIds}
        />
      </div>
    </div>
  );
};

export default CultureFilterColumn;
