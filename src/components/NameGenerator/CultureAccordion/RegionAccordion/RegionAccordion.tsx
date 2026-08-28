import type { CultureRegion } from '@/api/generated';
import List from '@mui/material/List';
import FilterListItem from '../../FilterListItem/FilterListItem';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useState } from 'react';
import FilterRegionAccordion from '@/components/NameGenerator/FilterRegionAccordion/FilterRegionAccordion';
import { useFilterRegionSelection } from '@/components/NameGenerator/FilterRegionAccordion/useFilterRegionSelection';
import './RegionAccordion.css';

type Props = {
  region: CultureRegion;
};

export default (props: Props) => {
  const { label, cultures } = props.region;
  const [expanded, setExpanded] = useState(false);
  const givenNameContext = useGivenNames();
  const { selectedCultureIds } = givenNameContext.state;
  const { addSelectedCultureIds, removeSelectedCultureIds } = useGivenNamesActions();
  const { anySelected, getItemAction, getItemSelected, selectAll, showToggleAll, unselectAll } = useFilterRegionSelection({
    addSelectedIds: addSelectedCultureIds,
    itemIds: cultures.map(({ id }) => id),
    removeSelectedIds: removeSelectedCultureIds,
    selectedIds: selectedCultureIds,
  });

  return (
    <FilterRegionAccordion
      expanded={expanded}
      onChange={(_event, isExpanded) => setExpanded(isExpanded)}
      label={label}
      ariaControls="culture-region-content"
      id="culture-region-summary"
    >
      <List>
        {showToggleAll ? (
          <FilterListItem
            key={`${label}-toggle-all`}
            index={-1}
            label={anySelected ? 'Unselect all' : 'Select all'}
            action={anySelected ? unselectAll : selectAll}
            selected={anySelected}
            variant="utility"
          />
        ) : null}
        {cultures.map((culture, index) => {
          const { id, label } = culture;

          return <FilterListItem key={id} index={index} label={label} action={getItemAction(id)} selected={getItemSelected(id)} />;
        })}
      </List>
    </FilterRegionAccordion>
  );
};
