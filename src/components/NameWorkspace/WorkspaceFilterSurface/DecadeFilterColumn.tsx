import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import './DecadeFilterColumn.css';

const DecadeFilterColumn = () => {
  const [selectedDecadeIds, setSelectedDecadeIds] = useState<number[]>([]);

  return (
    <div className="decade-filter-column">
      <Typography className="decade-filter-column-title">Decade</Typography>
      <div className="decade-filter-column-selector" aria-label="Decade available filters">
        <FilterPicker
          ariaLabel="Decade filter options"
          options={mockNameFilterReferenceData.decadeOptions}
          searchLabel="Search decades"
          selectedOptionIds={selectedDecadeIds}
          onChange={setSelectedDecadeIds}
        />
      </div>
    </div>
  );
};

export default DecadeFilterColumn;
