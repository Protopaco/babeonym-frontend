import FilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterColumn';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './GenderFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const GenderFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => (
  <FilterColumn
    ariaLabel="Gender filter options"
    options={options}
    searchable={false}
    selectedOptionIds={selectedOptionIds}
    title="Gender"
    onChange={onChange}
  />
);

export default GenderFilterColumn;
