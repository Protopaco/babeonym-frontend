import FilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterColumn';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './CultureFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const CultureFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => (
  <FilterColumn
    ariaLabel="Culture filter options"
    options={options}
    searchLabel="Search cultures"
    selectedOptionIds={selectedOptionIds}
    title="Culture"
    onChange={onChange}
  />
);

export default CultureFilterColumn;
