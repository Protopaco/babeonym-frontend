import FilterColumn from '@/components/NameWorkspace/WorkspaceFilterSurface/FilterColumn';
import type { FilterPickerOption } from '@/models/FilterPickerOption';
import './LanguageFilterColumn.css';

type Props = {
  options: FilterPickerOption[];
  selectedOptionIds: number[];
  onChange: (selectedOptionIds: number[]) => void;
};

const LanguageFilterColumn = ({ options, selectedOptionIds, onChange }: Props) => (
  <FilterColumn
    ariaLabel="Language filter options"
    options={options}
    searchLabel="Search languages"
    selectedOptionIds={selectedOptionIds}
    title="Language"
    onChange={onChange}
  />
);

export default LanguageFilterColumn;
