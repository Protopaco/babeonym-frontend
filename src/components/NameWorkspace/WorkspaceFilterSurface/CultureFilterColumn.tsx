import Typography from '@mui/material/Typography';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './CultureFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const CultureFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => {
  return (
    <div className="culture-filter-column">
      <Typography className="culture-filter-column-title">Culture</Typography>
      <div className="culture-filter-column-selector" aria-label="Culture available filters">
        <FilterPicker
          ariaLabel="Culture filter options"
          options={options}
          searchLabel="Search cultures"
          selectedOptionIds={selectedOptionIds}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CultureFilterColumn;
