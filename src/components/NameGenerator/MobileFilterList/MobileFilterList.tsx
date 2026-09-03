import { useMemo, useState } from 'react';
import List from '@mui/material/List';
import type { FilterOption } from '@/api/generated/models/FilterOption';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import './MobileFilterList.css';

type Props = {
  options: FilterOption[];
  searchId: string;
  searchable?: boolean;
  selectedOptionIds: number[];
  onToggle: (optionId: number) => void;
  onUnselectAll: () => void;
};

const MobileFilterList = ({ options, searchId, searchable = true, selectedOptionIds, onToggle, onUnselectAll }: Props) => {
  const [searchValue, setSearchValue] = useState('');

  // Matching on searchText rather than the label is what replaces the region
  // nesting: it carries the region and continent, so "oceania" still finds
  // Hawaiian.
  const displayOptions = useMemo(() => {
    const trimmedSearchValue = searchValue.trim().toLowerCase();
    if (!trimmedSearchValue) return options;

    return options.filter((option) => option.searchText.includes(trimmedSearchValue));
  }, [options, searchValue]);

  return (
    <div className="mobile-filter-list">
      {searchable && <FilterSearchField id={searchId} onChange={(event) => setSearchValue(event.target.value)} />}
      <List className="mobile-filter-list-options themed-scrollbar">
        {selectedOptionIds.length > 0 && (
          <FilterListItem key="unselect-all" index={-1} label="Unselect all" action={onUnselectAll} selected={true} variant="utility" />
        )}
        {displayOptions.map(({ id, label }, index) => (
          <FilterListItem key={id} index={index} label={label} action={() => onToggle(id)} selected={selectedOptionIds.includes(id)} />
        ))}
      </List>
    </div>
  );
};

export default MobileFilterList;
