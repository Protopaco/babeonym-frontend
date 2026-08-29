import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import './GenderFilterColumn.css';

const GenderFilterColumn = () => {
  const [selectedGenderIds, setSelectedGenderIds] = useState<number[]>([]);

  return (
    <div className="gender-filter-column">
      <Typography className="gender-filter-column-title">Gender</Typography>
      <div className="gender-filter-column-selector" aria-label="Gender available filters">
        <FilterPicker
          ariaLabel="Gender filter options"
          options={mockNameFilterReferenceData.genderOptions}
          searchable={false}
          selectedOptionIds={selectedGenderIds}
          onChange={setSelectedGenderIds}
        />
      </div>
    </div>
  );
};

export default GenderFilterColumn;
