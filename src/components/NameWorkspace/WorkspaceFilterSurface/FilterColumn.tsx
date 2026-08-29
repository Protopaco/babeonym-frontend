import Typography from '@mui/material/Typography';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './FilterColumn.css';

type Props = {
  ariaLabel: string;
  options: FilterPickerOption[];
  searchLabel?: string;
  searchable?: boolean;
  selectedOptionIds: number[];
  title: string;
  onChange: (selectedOptionIds: number[]) => void;
};

const FilterColumn = ({ ariaLabel, options, searchLabel, searchable = true, selectedOptionIds, title, onChange }: Props) => (
  <div className="filter-column">
    <Typography className="filter-column-title">{title}</Typography>
    <div className="filter-column-selector" aria-label={`${title} available filters`}>
      <FilterPicker
        ariaLabel={ariaLabel}
        options={options}
        searchLabel={searchLabel}
        searchable={searchable}
        selectedOptionIds={selectedOptionIds}
        onChange={onChange}
      />
    </div>
  </div>
);

export default FilterColumn;
