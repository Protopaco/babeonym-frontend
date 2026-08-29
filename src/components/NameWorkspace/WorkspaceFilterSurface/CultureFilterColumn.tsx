import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './CultureFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const CultureFilterColumn = ({ mode }: Props) => {
  const [selectedCultureIds, setSelectedCultureIds] = useState<number[]>([]);

  return (
    <div className="culture-filter-column">
      {mode === 'label' && <Typography className="culture-filter-column-title">Culture</Typography>}
      {mode === 'selector' && (
        <div className="culture-filter-column-selector" aria-label="Culture available filters">
          <FilterPicker
            ariaLabel="Culture filter options"
            options={mockNameFilterReferenceData.cultureOptions}
            searchLabel="Search cultures"
            selectedOptionIds={selectedCultureIds}
            onChange={setSelectedCultureIds}
          />
        </div>
      )}
      {mode === 'applied' && (
        <div className="culture-filter-column-applied" aria-label="Culture applied filters">
          <WorkspaceAppliedFilterChip label="Irish" />
        </div>
      )}
    </div>
  );
};

export default CultureFilterColumn;
