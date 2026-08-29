import Typography from '@mui/material/Typography';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './GenderFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const GenderFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => {
  return (
    <div className="gender-filter-column">
      <Typography className="gender-filter-column-title">Gender</Typography>
      <div className="gender-filter-column-selector" aria-label="Gender available filters">
        <FilterPicker
          ariaLabel="Gender filter options"
          options={options}
          searchable={false}
          selectedOptionIds={selectedOptionIds}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default GenderFilterColumn;
