import { GenderValues } from '@/types/Gender';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { List } from '@mui/material';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import FilterAccordionSummary from '@/components/NameGenerator/FilterAccordionSummary/FilterAccordionSummary';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const givenNameContext = useGivenNames();
  const { selectedGenders } = givenNameContext.state;
  const { addSelectedGenders, removeSelectedGenders } = useGivenNamesActions();

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <FilterAccordionSummary label="Gender" ariaControls="gender-filter-content" id="gender-filter-summary" />
      {expanded ? (
        <AccordionDetails>
          <List>
            {GenderValues.map((gender, index) => {
              const selected = selectedGenders.includes(gender);

              return (
                <FilterListItem
                  key={gender}
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
      ) : null}
    </Accordion>
  );
};
