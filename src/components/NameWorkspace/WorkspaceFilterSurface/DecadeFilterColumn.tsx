import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import { mockNameFilterReferenceData } from '@/components/NameWorkspace/WorkspaceFilterSurface/mockNameFilterReferenceData';
import WorkspaceAppliedFilterChip from '@/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceAppliedFilterChip';
import './DecadeFilterColumn.css';

type Props = {
  mode: 'label' | 'selector' | 'applied';
};

const DecadeFilterColumn = ({ mode }: Props) => {
  const [selectedDecadeIds, setSelectedDecadeIds] = useState<number[]>([]);

  return (
    <div className="decade-filter-column">
      {mode === 'label' && <Typography className="decade-filter-column-title">Decade</Typography>}
      {mode === 'selector' && (
        <div className="decade-filter-column-selector" aria-label="Decade available filters">
          <FilterPicker
            ariaLabel="Decade filter options"
            options={mockNameFilterReferenceData.decadeOptions}
            searchLabel="Search decades"
            selectedOptionIds={selectedDecadeIds}
            onChange={setSelectedDecadeIds}
          />
        </div>
      )}
      {mode === 'applied' && (
        <div className="decade-filter-column-applied" aria-label="Decade applied filters">
          <WorkspaceAppliedFilterChip label="1990s" />
        </div>
      )}
    </div>
  );
};

export default DecadeFilterColumn;
