import type { LanguageRegion } from '@/api/generated';
import List from '@mui/material/List';
import FilterListItem from '../../FilterListItem/FilterListItem';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useState } from 'react';
import FilterRegionAccordion from '@/components/NameGenerator/FilterRegionAccordion/FilterRegionAccordion';
import { useFilterRegionSelection } from '@/components/NameGenerator/FilterRegionAccordion/useFilterRegionSelection';
import './RegionAccordion.css';

type Props = {
  region: LanguageRegion;
};

export default (props: Props) => {
  const { label, languages } = props.region;
  const [expanded, setExpanded] = useState(false);
  const givenNameContext = useGivenNames();
  const { selectedLanguageIds } = givenNameContext.state;
  const { addSelectedLanguageIds, removeSelectedLanguageIds } = useGivenNamesActions();
  const { anySelected, getItemAction, getItemSelected, selectAll, showToggleAll, unselectAll } = useFilterRegionSelection({
    addSelectedIds: addSelectedLanguageIds,
    itemIds: languages.map(({ id }) => id),
    removeSelectedIds: removeSelectedLanguageIds,
    selectedIds: selectedLanguageIds,
  });

  return (
    <FilterRegionAccordion
      expanded={expanded}
      onChange={(_event, isExpanded) => setExpanded(isExpanded)}
      label={label}
      ariaControls="language-region-content"
      id="language-region-summary"
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
        {languages.map((language, index) => {
          const { id, label, flag } = language;

          return (
            <FilterListItem
              key={id}
              index={index}
              label={`${label} ${flag}`}
              action={getItemAction(id)}
              selected={getItemSelected(id)}
            />
          );
        })}
      </List>
    </FilterRegionAccordion>
  );
};
