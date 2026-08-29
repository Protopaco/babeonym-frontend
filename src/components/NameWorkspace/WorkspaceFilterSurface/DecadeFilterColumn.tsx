import Typography from '@mui/material/Typography';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './DecadeFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const DecadeFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => {
  return (
    <div className="decade-filter-column">
      <Typography className="decade-filter-column-title">Decade</Typography>
      <div className="decade-filter-column-selector" aria-label="Decade available filters">
        <FilterPicker
          ariaLabel="Decade filter options"
          options={options}
          searchLabel="Search decades"
          selectedOptionIds={selectedOptionIds}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DecadeFilterColumn;
