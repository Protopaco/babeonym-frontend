import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CompareNamesContent from '@/components/CompareNames/CompareNamesContent';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import { useCompareNameVoting } from '@/components/CompareNames/useCompareNameVoting';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './CompareNamesMode.css';

const CompareNamesMode = () => {
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);

  return (
    <Container maxWidth="lg" className="compare-names-mode">
      <Box className="compare-names-mode-content">
        <CompareNamesContent
          approvedGivenNames={approvedGivenNames}
          currentPair={currentPair}
          givenNameProviderLoaded={givenNameProviderLoaded}
          onVote={voteForName}
        />
      </Box>
    </Container>
  );
};

export default CompareNamesMode;
