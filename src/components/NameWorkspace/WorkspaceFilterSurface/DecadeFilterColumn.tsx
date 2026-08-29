import FilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterColumn';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './DecadeFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const DecadeFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => (
  <FilterColumn
    ariaLabel="Decade filter options"
    options={options}
    searchLabel="Search decades"
    selectedOptionIds={selectedOptionIds}
    title="Decade"
    onChange={onChange}
  />
);

export default DecadeFilterColumn;
