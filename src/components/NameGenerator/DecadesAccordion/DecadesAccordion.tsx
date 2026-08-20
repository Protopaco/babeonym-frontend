import { useState, useEffect } from 'react';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import FilterAccordionSummary from '@/components/NameGenerator/FilterAccordionSummary/FilterAccordionSummary';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const filterContext = useFilters();
  const { decades } = filterContext.state;
  const givenNameContext = useGivenNames();
  const { selectedDecadeIds } = givenNameContext.state;
  const { addSelectedDecadeIds, removeSelectedDecadeIds } = useGivenNamesActions();
  const [searchValue, setSearchValue] = useState('');
  const [displayDecades, setDisplayDecades] = useState(decades);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue != '') {
      const filteredDecades = decades.filter((decade) => decade.label.includes(searchValue));
      setDisplayDecades(filteredDecades);
    } else {
      setDisplayDecades(decades);
    }
  }, [searchValue, decades]);

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <FilterAccordionSummary label="Decades" ariaControls="decade-filter-content" id="decade-filter-summary" />
      <AccordionDetails>
        <TextField id="decade-filter-search" label="Search" variant="outlined" onChange={handleSearchChange} type="number" />
        <List className="decades-filter-list">
          {displayDecades.map((decade, index) => {
            const { id, label } = decade;
            const selected = selectedDecadeIds.includes(id);

            return (
              <FilterListItem
                key={index}
                index={index}
                label={label}
                action={
                  selected
                    ? () => {
                        removeSelectedDecadeIds([id]);
                      }
                    : () => {
                        addSelectedDecadeIds([id]);
                      }
                }
                selected={selected}
              />
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
