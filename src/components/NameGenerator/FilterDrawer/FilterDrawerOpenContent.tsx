import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'motion/react';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import DrawerActionButton from '@/components/NameGenerator/DrawerActionButton/DrawerActionButton';
import DrawerApproved from '@/components/NameGenerator/DrawerApproved/DrawerApproved';
import DrawerSection from '@/components/NameGenerator/DrawerSection/DrawerSection';
import FilterAccordionSkeleton from '@/components/NameGenerator/FilterAccordionSkeleton/FilterAccordionSkeleton';
import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import { useFilterAccordionState } from '@/components/NameGenerator/useFilterAccordionState';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import './FilterDrawerOpenContent.css';

type Props = {
  drawerOpen: boolean;
  isLoading: boolean;
};

export default ({ drawerOpen, isLoading }: Props) => {
  const { getNewCandidates } = useGivenNamesActions();
  const { collapseAllFilters, expandedFilters, handleFilterAccordionChange } = useFilterAccordionState();

  const setFiltersClick = async () => {
    collapseAllFilters();
    await getNewCandidates();
  };

  return (
    <AnimatePresence initial={false}>
      {drawerOpen ? (
        <motion.div
          key="filter-drawer-open-content"
          className="filter-drawer-open-content"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: -6,
            transition: { opacity: { duration: 0.14 }, x: { duration: 0.4 } },
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <DrawerSection
            title={
              <TutorialTooltip title="Specific name criteria?" placement="top">
                <span>Name Filters</span>
              </TutorialTooltip>
            }
            action={
              <Button className="filter-drawer-collapse-all-button" variant="text" onClick={collapseAllFilters}>
                Collapse All
              </Button>
            }
            footer={isLoading ? null : <DrawerActionButton text="Set Filters" onClick={setFiltersClick} />}
          >
            {isLoading ? (
              <FilterAccordionSkeleton />
            ) : (
              <Box className="filter-drawer-controls">
                <GenderAccordion expanded={expandedFilters.gender} onChange={handleFilterAccordionChange('gender')} />
                <DecadesAccordion expanded={expandedFilters.decades} onChange={handleFilterAccordionChange('decades')} />
                <LanguageAccordion expanded={expandedFilters.languages} onChange={handleFilterAccordionChange('languages')} />
                <CultureAccordion expanded={expandedFilters.cultures} onChange={handleFilterAccordionChange('cultures')} />
              </Box>
            )}
          </DrawerSection>
          <DrawerApproved />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
