// import FilterDrawer from '@/components/NameGenerator/FilterDrawer/FilterDrawer';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import NameEvaluator from '@/components/NameGenerator/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';
import MobileNameFilters from '@/components/NameGenerator/MobileNameFilters/MobileNameFilters';
import { useNameGeneratorUrlFilters } from '@/components/NameGenerator/useNameGeneratorUrlFilters';
import './NameGenerator.css';

export default () => {
  const givenNameContext = useGivenNames();
  const { givenNameProviderLoaded } = givenNameContext.state;
  // useNameGeneratorUrlFilters();

  return (
    <Box className="name-generator-mode-content">
      {/* <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} isLoading={!givenNameProviderLoaded} /> */}
      <NameEvaluator />
      <MobileNameFilters isLoading={!givenNameProviderLoaded} />
    </Box>
  );
};
