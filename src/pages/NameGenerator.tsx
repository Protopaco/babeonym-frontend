import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import { useFilters } from '@/state/filter/filter.context';
import FilterDrawer from '@/components/FilterDrawer/FilterDrawer';
import { useState } from 'react';
import NameEvaluator from '@/components/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';

const NameGenerator = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box>
      <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <NameEvaluator drawerOpen={drawerOpen} />
    </Box>
  );
};

export default NameGenerator;
