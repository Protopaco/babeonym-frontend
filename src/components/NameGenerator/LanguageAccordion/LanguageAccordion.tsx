import { useFilters } from '@/state/filter/filter.context';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import FilterAccordionFrame from '@/components/NameGenerator/FilterAccordionFrame/FilterAccordionFrame';
import MobileFilterList from '@/components/NameGenerator/MobileFilterList/MobileFilterList';
import './LanguageAccordion.css';

type Props = {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, expanded: boolean) => void;
};

export default ({ expanded, onChange }: Props) => {
  const {
    state: { nameFilters },
  } = useFilters();
  const givenNameContext = useGivenNames();
  const { selectedLanguageIds } = givenNameContext.state;
  const { addSelectedLanguageIds, removeSelectedLanguageIds } = useGivenNamesActions();

  return (
    <FilterAccordionFrame
      expanded={expanded}
      onChange={onChange}
      label="Languages"
      ariaControls="language-filter-content"
      id="language-filter-summary"
    >
      <MobileFilterList
        options={nameFilters.languageOptions}
        searchId="language-filter-search"
        selectedOptionIds={selectedLanguageIds}
        onToggle={(optionId) =>
          selectedLanguageIds.includes(optionId) ? removeSelectedLanguageIds([optionId]) : addSelectedLanguageIds([optionId])
        }
        onUnselectAll={() => removeSelectedLanguageIds(selectedLanguageIds)}
      />
    </FilterAccordionFrame>
  );
};
