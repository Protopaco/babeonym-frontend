import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import './MobileNameFilters.css';
import { useAppLayoutState } from '@/state/appLayoutState/appLayoutState.context';
import MobileNameFiltersSheet from '@/components/NameGenerator/MobileNameFilters/MobileNameFiltersSheet';

type Props = {
  isLoading: boolean;
};

export default ({ isLoading }: Props) => {
  const { mobileFilterDrawerOpen, setMobileFilterDrawerOpen } = useAppLayoutState();

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
        <MobileNameFiltersSheet isLoading={isLoading} onClose={() => setMobileFilterDrawerOpen(false)} />
      </Drawer>
    </Box>
  );
};
