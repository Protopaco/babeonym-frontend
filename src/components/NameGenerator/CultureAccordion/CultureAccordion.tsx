import { useMemo, useState } from 'react';
import { useFilters } from '@/state/filter/filter.context';

import List from '@mui/material/List';
import ContinentAccordion from '@/components/NameGenerator/CultureAccordion/ContinentAccordion/ContinentAccordion';
import type { CultureRegion, CultureWithRegions } from '@/api/generated';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import './CultureAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { cultures } = filterContext.state;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(/[^\p{L}]/gu, ''));
  };

  const displayCultures = useMemo(() => {
    if (searchValue != '') {
      return cultures
        .map((continent) => ({
          ...continent,
          regions: continent.regions
            .map((region: CultureRegion) => ({
              ...region,
              cultures: region.cultures.filter((culture) => culture.label.toLowerCase().includes(searchValue.toLowerCase())),
            }))
            .filter((region: CultureRegion) => region.cultures.length > 0),
        }))
        .filter((continent) => continent.regions.length > 0);
    }

    return cultures;
  }, [searchValue, cultures]);

  return (
    <FilterAccordionFrame
      expanded={expanded}
      onChange={onChange}
      label="Cultures"
      ariaControls="culture-filter-content"
      id="culture-filter-summary"
    >
      <FilterSearchField id="culture-filter-search" onChange={handleSearchChange} />
      <List>
        {displayCultures.map((continent) => {
          const cultureContinent = continent as CultureWithRegions;
          return <ContinentAccordion key={cultureContinent.id} continent={cultureContinent} />;
        })}
      </List>
    </FilterAccordionFrame>
  );
};
