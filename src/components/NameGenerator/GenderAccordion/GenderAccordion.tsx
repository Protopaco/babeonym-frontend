import { GenderValues } from '@/types/Gender';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List } from '@mui/material';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';

export default () => {
  const givenNameContext = useGivenNames();
  const { selectedGenders } = givenNameContext.state;
  const { addSelectedGenders, removeSelectedGenders } = useGivenNamesActions();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="gender-filter-content" id="gender-filter-summary">
        <Typography component="span">Gender</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {GenderValues.map((gender, index) => {
            const selected = selectedGenders.includes(gender);

            return (
              <FilterListItem
                key={index}
                index={index}
                label={gender}
                action={
                  selected
                    ? () => {
                        removeSelectedGenders([gender]);
                      }
                    : () => {
                        addSelectedGenders([gender]);
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
