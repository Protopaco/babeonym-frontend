import { useFilters } from '@/state/filter/filter.context';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import MobileFilterList from '@/components/NameGenerator/MobileFilterList/MobileFilterList';
import './DecadesAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const {
    state: { nameFilters },
  } = useFilters();
  const givenNameContext = useGivenNames();
  const { selectedDecadeIds } = givenNameContext.state;
  const { addSelectedDecadeIds, removeSelectedDecadeIds } = useGivenNamesActions();

  return (
    <FilterAccordionFrame expanded={expanded} onChange={onChange} label="Decades" ariaControls="decade-filter-content" id="decade-filter-summary">
      <MobileFilterList
        options={nameFilters.decadeOptions}
        searchId="decade-filter-search"
        selectedOptionIds={selectedDecadeIds}
        onToggle={(optionId) =>
          selectedDecadeIds.includes(optionId) ? removeSelectedDecadeIds([optionId]) : addSelectedDecadeIds([optionId])
        }
        onUnselectAll={() => removeSelectedDecadeIds(selectedDecadeIds)}
      />
    </FilterAccordionFrame>
  );
};
