import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import DrawerApproved from '@/components/NameGenerator/DrawerApproved/DrawerApproved';
import { AnimatePresence, motion } from 'motion/react';
import DrawerActionButton from '@/components/NameGenerator/DrawerActionButton/DrawerActionButton';
import DrawerSection from '@/components/NameGenerator/DrawerSection/DrawerSection';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

type FilterAccordionId = 'gender' | 'decades' | 'languages' | 'cultures';

export default ({ drawerOpen, setDrawerOpen }: Props) => {
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
    await getNewCandidates();
  };

  return (
    <Box>
      <Drawer
        id="filter-drawer"
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        className={drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'}
        slotProps={{ paper: { className: `${drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'} themed-scrollbar` } }}
      >
        <Box className={`filter-drawer-content ${drawerOpen ? 'filter-drawer-content-open' : 'filter-drawer-content-closed'}`}>
          <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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
                  title="Name Filters"
                  action={
                    <Button className="filter-drawer-collapse-all-button" variant="text" onClick={collapseAllFilters}>
                      Collapse All
                    </Button>
                  }
                  footer={<DrawerActionButton text="Set Filters" onClick={setFiltersClick} />}
                >
                  <Box className="filter-drawer-controls">
                    <GenderAccordion expanded={expandedFilters.gender} onChange={handleFilterAccordionChange('gender')} />
                    <DecadesAccordion expanded={expandedFilters.decades} onChange={handleFilterAccordionChange('decades')} />
                    <LanguageAccordion expanded={expandedFilters.languages} onChange={handleFilterAccordionChange('languages')} />
                    <CultureAccordion expanded={expandedFilters.cultures} onChange={handleFilterAccordionChange('cultures')} />
                  </Box>
                </DrawerSection>
                <DrawerApproved />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Box>
      </Drawer>
    </Box>
  );
};
