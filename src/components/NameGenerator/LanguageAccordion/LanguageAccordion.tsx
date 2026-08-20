import { useState, useEffect } from 'react';
import { useFilters } from '@/state/filter/filter.context';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import ContinentAccordion from './ContinentAccordion/ContinentAccordion';
import type { LanguageWithRegions } from '@/api/generated';
import FilterAccordionSummary from '@/components/NameGenerator/FilterAccordionSummary/FilterAccordionSummary';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { languages } = filterContext.state;
  const [searchValue, setSearchValue] = useState('');
  const [displayLanguages, setDisplayLanguages] = useState(languages);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(/[^\p{L}]/gu, ''));
  };

  useEffect(() => {
    if (searchValue != '') {
      const filteredLanguages = languages
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
      setDisplayLanguages(filteredLanguages);
    } else {
      setDisplayLanguages(languages);
    }
  }, [searchValue, languages]);

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <FilterAccordionSummary label="Languages" ariaControls="language-filter-content" id="language-filter-summary" />
      <AccordionDetails>
        <TextField id="language-filter-search" label="Search" variant="outlined" onChange={handleSearchChange} />
        <List>
          {displayLanguages.map((continent, index) => {
            return <ContinentAccordion key={index} continent={continent as LanguageWithRegions} />;
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
