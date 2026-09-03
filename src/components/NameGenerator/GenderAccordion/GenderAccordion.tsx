import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import MobileFilterList from '@/components/NameGenerator/MobileFilterList/MobileFilterList';
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
      <MobileFilterList
        options={nameFilters.genderOptions}
        searchId="gender-filter-search"
        searchable={false}
        selectedOptionIds={selectedGenderIds}
        onToggle={(optionId) =>
          selectedGenderIds.includes(optionId) ? removeSelectedGenderIds([optionId]) : addSelectedGenderIds([optionId])
        }
        onUnselectAll={() => removeSelectedGenderIds(selectedGenderIds)}
      />
    </FilterAccordionFrame>
  );
};
