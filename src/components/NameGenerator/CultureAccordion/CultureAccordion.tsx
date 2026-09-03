import { useFilters } from '@/state/filter/filter.context';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import MobileFilterList from '@/components/NameGenerator/MobileFilterList/MobileFilterList';
import './CultureAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const {
    state: { nameFilters },
  } = useFilters();
  const givenNameContext = useGivenNames();
  const { selectedCultureIds } = givenNameContext.state;
  const { addSelectedCultureIds, removeSelectedCultureIds } = useGivenNamesActions();

  return (
    <FilterAccordionFrame
      expanded={expanded}
      onChange={onChange}
      label="Cultures"
      ariaControls="culture-filter-content"
      id="culture-filter-summary"
    >
      <MobileFilterList
        options={nameFilters.cultureOptions}
        searchId="culture-filter-search"
        selectedOptionIds={selectedCultureIds}
        onToggle={(optionId) =>
          selectedCultureIds.includes(optionId) ? removeSelectedCultureIds([optionId]) : addSelectedCultureIds([optionId])
        }
        onUnselectAll={() => removeSelectedCultureIds(selectedCultureIds)}
      />
    </FilterAccordionFrame>
  );
};
