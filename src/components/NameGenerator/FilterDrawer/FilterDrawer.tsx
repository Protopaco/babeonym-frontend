import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';

import GenderAccordion from '@/components/NameGenerator/GenderAccordion/GenderAccordion';
import DecadesAccordion from '@/components/NameGenerator/DecadesAccordion/DecadesAccordion';
import LanguageAccordion from '@/components/NameGenerator/LanguageAccordion/LanguageAccordion';
import CultureAccordion from '@/components/NameGenerator/CultureAccordion/CultureAccordion';
import DrawerApproved from '@/components/NameGenerator/DrawerApproved/DrawerApproved';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import FilterDrawerSectionHeader from '@/components/NameGenerator/FilterDrawerSectionHeader/FilterDrawerSectionHeader';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export default ({ drawerOpen, setDrawerOpen }: Props) => {
  const { getNewCandidates } = useGivenNamesActions();

  return (
    <Box>
      <Drawer
        id="filter-drawer"
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        className={drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed'}
        slotProps={{ paper: { className: drawerOpen ? 'filter-drawer-open' : 'filter-drawer-closed' } }}
      >
        <Box className="filter-drawer-content">
          <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          {drawerOpen ? (
            <>
              <FilterDrawerSectionHeader title="Name Filters" />
              <Box className="filter-drawer-controls">
                <GenderAccordion />
                <DecadesAccordion />
                <LanguageAccordion />
                <CultureAccordion />
              </Box>
              <Box className="filter-drawer-actions">
                <SecondaryButton text="Set Filters" onClick={getNewCandidates} />
              </Box>
              <DrawerApproved />
            </>
          ) : null}
        </Box>
      </Drawer>
    </Box>
  );
};
