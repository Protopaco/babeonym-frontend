import FilterDrawer from '@/components/NameGenerator/FilterDrawer/FilterDrawer';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import { useState } from 'react';
import NameEvaluator from '@/components/NameGenerator/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';
import MobileNameFilters from '@/components/NameGenerator/MobileNameFilters/MobileNameFilters';
import { useNameGeneratorUrlFilters } from '@/components/NameGenerator/useNameGeneratorUrlFilters';
import './NameGenerator.css';

export default () => {
  const givenNameContext = useGivenNames();
  const { selectedCultureIds, selectedDecadeIds, selectedGenders, selectedLanguageIds, givenNameCandidates, givenNameProviderLoaded } =
    givenNameContext.state;
  const [drawerOpen, setDrawerOpen] = useState(true);
  useNameGeneratorUrlFilters({
    givenNameCandidates,
    selectedCultureIds,
    selectedDecadeIds,
    selectedGenders,
    selectedLanguageIds,
  });

  return (
    <Box>
      <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} isLoading={!givenNameProviderLoaded} />
      <NameEvaluator drawerOpen={drawerOpen} />
      <MobileNameFilters isLoading={!givenNameProviderLoaded} />
    </Box>
  );
};
