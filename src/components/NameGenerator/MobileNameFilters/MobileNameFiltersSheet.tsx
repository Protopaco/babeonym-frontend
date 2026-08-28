import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import FilterAccordionSkeleton from '@/components/NameGenerator/FilterAccordionSkeleton/FilterAccordionSkeleton';
import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import { useFilterAccordionState } from '@/components/NameGenerator/useFilterAccordionState';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import './MobileNameFiltersSheet.css';

type Props = {
  isLoading: boolean;
  onClose: () => void;
};

export default ({ isLoading, onClose }: Props) => {
  const { getNewCandidates } = useGivenNamesActions();
  const { collapseAllFilters, expandedFilters, handleFilterAccordionChange } = useFilterAccordionState();

  const setFiltersClick = async () => {
    collapseAllFilters();
    onClose();
    await getNewCandidates();
  };

  return (
    <Box className="mobile-name-filters-sheet">
      <Box className="mobile-name-filters-sheet-header">
        <MobileSectionHeader title="Name Filters" />
        <IconButton className="mobile-name-filters-close" aria-label="Close name filters" onClick={onClose}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      {isLoading ? (
        <FilterAccordionSkeleton />
      ) : (
        <>
          <Box className="mobile-name-filters-controls">
            <GenderAccordion expanded={expandedFilters.gender} onChange={handleFilterAccordionChange('gender')} />
            <DecadesAccordion expanded={expandedFilters.decades} onChange={handleFilterAccordionChange('decades')} />
            <LanguageAccordion expanded={expandedFilters.languages} onChange={handleFilterAccordionChange('languages')} />
            <CultureAccordion expanded={expandedFilters.cultures} onChange={handleFilterAccordionChange('cultures')} />
          </Box>
          <Box className="mobile-name-filters-actions">
            <SecondaryButton text="Set Filters" onClick={setFiltersClick} />
          </Box>
        </>
      )}
    </Box>
  );
};
