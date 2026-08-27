import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import './MobileNameFilters.css';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import FilterAccordionSkeleton from '@/components/NameGenerator/FilterAccordionSkeleton/FilterAccordionSkeleton';
import { useAppLayoutState } from '@/state/appLayoutState/appLayoutState.context';

type FilterAccordionId = 'gender' | 'decades' | 'languages' | 'cultures';

type Props = {
  isLoading: boolean;
};

export default ({ isLoading }: Props) => {
  const { getNewCandidates } = useGivenNamesActions();
  const { mobileFilterDrawerOpen, setMobileFilterDrawerOpen } = useAppLayoutState();
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

  const collapseAllFilters = () => {
    setExpandedFilters({
      gender: false,
      decades: false,
      languages: false,
      cultures: false,
    });
  };

  const setFiltersClick = async () => {
    collapseAllFilters();
    setMobileFilterDrawerOpen(false);
    await getNewCandidates();
  };

  useEffect(() => {
    return () => setMobileFilterDrawerOpen(false);
  }, [setMobileFilterDrawerOpen]);

  return (
    <Box className="mobile-name-filters">
      <Box className="mobile-name-filters-trigger">
        <SecondaryButton text="Name Filters" onClick={() => setMobileFilterDrawerOpen(true)} />
      </Box>
      <Drawer
        anchor="bottom"
        open={mobileFilterDrawerOpen}
        onClose={() => setMobileFilterDrawerOpen(false)}
        className="mobile-name-filters-drawer"
        PaperProps={{ className: 'mobile-name-filters-drawer-paper' }}
      >
        <Box className="mobile-name-filters-sheet">
          <Box className="mobile-name-filters-sheet-header">
            <MobileSectionHeader title="Name Filters" />
            <IconButton
              className="mobile-name-filters-close"
              aria-label="Close name filters"
              onClick={() => setMobileFilterDrawerOpen(false)}
            >
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
      </Drawer>
    </Box>
  );
};
