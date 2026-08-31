import { useGivenNames } from '@/state/givenName/givenName.provider';
import NameEvaluator from '@/components/NameGenerator/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';
import MobileNameFilters from '@/components/NameGenerator/MobileNameFilters/MobileNameFilters';
import './NameGenerator.css';

export default () => {
  const givenNameContext = useGivenNames();
  const { givenNameProviderLoaded } = givenNameContext.state;

  return (
    <Box className="name-generator-mode-content">
      <NameEvaluator />
      <MobileNameFilters isLoading={!givenNameProviderLoaded} />
    </Box>
  );
};
