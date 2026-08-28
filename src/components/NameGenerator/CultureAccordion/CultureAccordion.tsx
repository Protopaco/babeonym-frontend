import { useFilters } from '@/state/filter/filter.context';

import List from '@mui/material/List';
import ContinentAccordion from '@/components/NameGenerator/CultureAccordion/ContinentAccordion/ContinentAccordion';
import type { CultureWithRegions } from '@/api/generated';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import { useNestedFilterSearch } from '@/components/NameGenerator/useNestedFilterSearch';
import './CultureAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

const filterCultures = (cultures: CultureWithRegions[], searchValue: string) => {
  return cultures
    .map((continent) => ({
      ...continent,
      regions: continent.regions
        .map((region) => ({
          ...region,
          cultures: region.cultures.filter((culture) => culture.label.toLowerCase().includes(searchValue)),
        }))
        .filter((region) => region.cultures.length > 0),
    }))
    .filter((continent) => continent.regions.length > 0);
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { cultures } = filterContext.state;
  const { displayItems: displayCultures, handleSearchChange } = useNestedFilterSearch({
    filterItems: filterCultures,
    items: cultures,
  });

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
          return <ContinentAccordion key={continent.id} continent={continent} />;
        })}
      </List>
    </FilterAccordionFrame>
  );
};
