import { useMemo, useState } from 'react';
import { useFilters } from '@/state/filter/filter.context';

import List from '@mui/material/List';
import ContinentAccordion from './ContinentAccordion/ContinentAccordion';
import type { LanguageWithRegions } from '@/api/generated';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import FilterSearchField from '@/components/NameGenerator/FilterSearchField/FilterSearchField';
import './LanguageAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { languages } = filterContext.state;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(/[^\p{L}]/gu, ''));
  };

  const displayLanguages = useMemo(() => {
    if (searchValue != '') {
      return languages
        .map((continent) => ({
          ...continent,
          regions: continent.regions
            .map((region) => ({
              ...region,
              languages: region.languages.filter((lang) => lang.label.toLowerCase().includes(searchValue.toLowerCase())),
            }))
            .filter((region) => region.languages.length > 0),
        }))
        .filter((continent) => continent.regions.length > 0);
    }

    return languages;
  }, [searchValue, languages]);

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
          const languageContinent = continent as LanguageWithRegions;
          return <ContinentAccordion key={languageContinent.id} continent={languageContinent} />;
        })}
      </List>
    </FilterAccordionFrame>
  );
};
