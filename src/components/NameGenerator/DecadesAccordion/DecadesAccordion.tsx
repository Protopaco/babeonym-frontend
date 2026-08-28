import { useMemo, useState } from 'react';
import { useFilters } from '@/state/filter/filter.context';

import DecadeFilterList from '@/components/NameGenerator/DecadesAccordion/DecadeFilterList';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import './DecadesAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { decades } = filterContext.state;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const displayDecades = useMemo(() => {
    if (searchValue != '') {
      return decades.filter((decade) => decade.label.includes(searchValue));
    }

    return decades;
  }, [searchValue, decades]);

  return (
    <FilterAccordionFrame expanded={expanded} onChange={onChange} label="Decades" ariaControls="decade-filter-content" id="decade-filter-summary">
      <FilterSearchField id="decade-filter-search" onChange={handleSearchChange} type="number" />
      <DecadeFilterList decades={displayDecades} />
    </FilterAccordionFrame>
  );
};
