import { useState, useEffect } from 'react';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';

export default () => {
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
  }, [searchValue]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="decade-filter-content" id="decade-filter-summary">
        <Typography component="span">Decades</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField id="decade-filter-search" label="Search" variant="outlined" onChange={handleSearchChange} type="number" />
        <List>
          {displayDecades.map((decade, index) => {
            const { id, label } = decade;
            let selected = selectedDecadeIds.includes(id);

            return (
              <FilterListItem
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
