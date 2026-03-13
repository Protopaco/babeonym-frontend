import { useState, useEffect } from 'react';
import { useFilters } from '@/state/filter/filter.context';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ContinentAccordion from '@/components/NameGenerator/CultureAccordion/ContinentAccordion/ContinentAccordion';
import type { CultureRegion, CultureWithRegions } from '@/api/generated';

export default () => {
  const filterContext = useFilters();
  const { cultures } = filterContext.state;
  const [searchValue, setSearchValue] = useState('');
  const [displayCultures, setDisplayCultures] = useState(cultures);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(/[^\p{L}]/gu, ''));
  };

  useEffect(() => {
    if (searchValue != '') {
      const filteredCultures = cultures
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
      setDisplayCultures(filteredCultures);
    } else {
      setDisplayCultures(cultures);
    }
  }, [searchValue, cultures]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="culture-filter-content" id="culture-filter-summary">
        <Typography component="span">Cultures</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField id="culture-filter-search" label="Search" variant="outlined" onChange={handleSearchChange} />
        <List>
          {displayCultures.map((continent, index) => {
            return <ContinentAccordion key={index} continent={continent as CultureWithRegions} />;
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
