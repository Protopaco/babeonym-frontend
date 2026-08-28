import { useFilters } from '@/state/filter/filter.context';

import List from '@mui/material/List';
import ContinentAccordion from './ContinentAccordion/ContinentAccordion';
import type { LanguageWithRegions } from '@/api/generated';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import { useNestedFilterSearch } from '@/components/NameGenerator/useNestedFilterSearch';
import './LanguageAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

const filterLanguages = (languages: LanguageWithRegions[], searchValue: string) => {
  return languages
    .map((continent) => ({
      ...continent,
      regions: continent.regions
        .map((region) => ({
          ...region,
          languages: region.languages.filter((language) => language.label.toLowerCase().includes(searchValue)),
        }))
        .filter((region) => region.languages.length > 0),
    }))
    .filter((continent) => continent.regions.length > 0);
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { languages } = filterContext.state;
  const { displayItems: displayLanguages, handleSearchChange } = useNestedFilterSearch({
    filterItems: filterLanguages,
    items: languages,
  });

  return (
    <FilterAccordionFrame
      expanded={expanded}
      onChange={onChange}
      label="Languages"
      ariaControls="language-filter-content"
      id="language-filter-summary"
    >
      <FilterSearchField id="language-filter-search" onChange={handleSearchChange} />
      <List>
        {displayLanguages.map((continent) => {
          return <ContinentAccordion key={continent.id} continent={continent} />;
        })}
      </List>
    </FilterAccordionFrame>
  );
};
