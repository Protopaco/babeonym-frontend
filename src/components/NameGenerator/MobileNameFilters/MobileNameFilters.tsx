import { useState } from 'react';
import Box from '@mui/material/Box';
import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import './MobileNameFilters.css';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';

type FilterAccordionId = 'gender' | 'decades' | 'languages' | 'cultures';

export default () => {
  const { getNewCandidates } = useGivenNamesActions();
  const [expandedFilters, setExpandedFilters] = useState<Record<FilterAccordionId, boolean>>({
    gender: false,
    decades: false,
    languages: false,
    cultures: false,
  });

  const handleFilterAccordionChange = (filterId: FilterAccordionId) => (_event: React.SyntheticEvent, expanded: boolean) => {
    setExpandedFilters((currentExpandedFilters) => ({
      ...currentExpandedFilters,
      [filterId]: expanded,
    }));
  };

  return (
    <Box className="mobile-name-filters">
      <MobileSectionHeader title="Name Filters" />
      <Box className="mobile-name-filters-controls">
        <GenderAccordion expanded={expandedFilters.gender} onChange={handleFilterAccordionChange('gender')} />
        <DecadesAccordion expanded={expandedFilters.decades} onChange={handleFilterAccordionChange('decades')} />
        <LanguageAccordion expanded={expandedFilters.languages} onChange={handleFilterAccordionChange('languages')} />
        <CultureAccordion expanded={expandedFilters.cultures} onChange={handleFilterAccordionChange('cultures')} />
      </Box>
      <Box className="mobile-name-filters-actions">
        <SecondaryButton text="Set Filters" onClick={getNewCandidates} />
      </Box>
    </Box>
  );
};
