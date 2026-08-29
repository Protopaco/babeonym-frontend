import Typography from '@mui/material/Typography';
import FilterPicker from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterPicker';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './LanguageFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const LanguageFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => {
  return (
    <div className="language-filter-column">
      <Typography className="language-filter-column-title">Language</Typography>
      <div className="language-filter-column-selector" aria-label="Language available filters">
        <FilterPicker
          ariaLabel="Language filter options"
          options={options}
          searchLabel="Search languages"
          selectedOptionIds={selectedOptionIds}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default LanguageFilterColumn;
