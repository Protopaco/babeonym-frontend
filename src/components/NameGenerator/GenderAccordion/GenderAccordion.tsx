import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';

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
  const { selectedGenderIds } = givenNameContext.state;
  const { addSelectedGenderIds, removeSelectedGenderIds } = useGivenNamesActions();
  const {
    state: { nameFilters },
  } = useFilters();

  return (
    <FilterAccordionFrame expanded={expanded} onChange={onChange} label="Gender" ariaControls="gender-filter-content" id="gender-filter-summary">
      <List>
        {nameFilters.genderOptions.map(({ id, label }, index) => {
          const selected = selectedGenderIds.includes(id);

          return (
            <FilterListItem
              key={id}
              index={index}
              label={label}
              action={
                selected
                  ? () => {
                      removeSelectedGenderIds([id]);
                    }
                  : () => {
                      addSelectedGenderIds([id]);
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
