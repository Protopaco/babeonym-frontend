import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './GenderFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const GenderFilterColumn = ({ mode }: Props) => {
  const [selectedGenderIds, setSelectedGenderIds] = useState<number[]>([]);

  return (
    <div className="gender-filter-column">
      {mode === 'label' && <Typography className="gender-filter-column-title">Gender</Typography>}
      {mode === 'selector' && (
        <div className="gender-filter-column-selector" aria-label="Gender available filters">
          <FilterPicker
            ariaLabel="Gender filter options"
            options={mockNameFilterReferenceData.genderOptions}
            searchable={false}
            selectedOptionIds={selectedGenderIds}
            onChange={setSelectedGenderIds}
          />
        </div>
      )}
      {mode === 'applied' && (
        <div className="gender-filter-column-applied" aria-label="Gender applied filters">
          <WorkspaceAppliedFilterChip label="Neutral" />
        </div>
      )}
    </div>
  );
};

export default GenderFilterColumn;
