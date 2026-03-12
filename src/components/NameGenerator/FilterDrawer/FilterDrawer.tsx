import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import '@/components/NameGenerator/FilterDrawer/FilterDrawer.css';
import FilterDrawerHeader from '../FilterDrawerHeader/FilterDrawerHeader';
import DecadesFilter from '@/components/NameGenerator/DecadesFilter/DecadesFilter';
import GenderFilter from '../GenderFilter/GenderFilter';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { Accordion } from '@mui/material';
import GenderAccordion from '../GenderAccordion/GenderAccordion';
import DecadesAccordion from '../DecadesAccordion/DecadesAccordion';

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
        <FilterDrawerHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <GenderAccordion />
        <DecadesAccordion />
        <button onClick={() => getNewCandidates()}>Apply Filters</button>
      </Drawer>
    </Box>
  );
};
