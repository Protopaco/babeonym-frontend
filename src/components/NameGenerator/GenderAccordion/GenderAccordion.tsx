import { GenderValues } from '@/types/Gender';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';

import { List } from '@mui/material';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import './GenderAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const givenNameContext = useGivenNames();
  const { selectedGenders } = givenNameContext.state;
  const { addSelectedGenders, removeSelectedGenders } = useGivenNamesActions();

  return (
    <FilterAccordionFrame expanded={expanded} onChange={onChange} label="Gender" ariaControls="gender-filter-content" id="gender-filter-summary">
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
    </FilterAccordionFrame>
  );
};
