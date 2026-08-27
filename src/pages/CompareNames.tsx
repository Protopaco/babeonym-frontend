import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import type { GivenName } from '@/api/generated';
import { givenNameApi } from '@/api/client';
import CompareNamesContent from '@/components/CompareNames/CompareNamesContent';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './CompareNames.css';

const CompareNames = () => {
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);

  const voteForName = (winner: GivenName) => {
    if (!currentPair) {
      return;
    }

    const loser = winner.givenCustomNameBridgeId === currentPair.left.givenCustomNameBridgeId ? currentPair.right : currentPair.left;

    advancePair();

    givenNameApi
      .v1GivenNameCompare({
        v1GivenNameCompareRequest: {
          winnerId: winner.givenCustomNameBridgeId,
          loserId: loser.givenCustomNameBridgeId,
        },
      })
      .catch((error) => {
        console.error('Failed to submit compare vote', error);
      });
  };

  return (
    <Container maxWidth="lg" id="compare-names-container">
      <Box id="compare-names-header">
        <SectionHeader
          title="Compare Names"
          action={
            <Link id="compare-names-return-link" to="/list">
              Your Names
            </Link>
          }
        />
        <MobileSectionHeader title="Compare Names" />
      </Box>
      <Box id="compare-names-content">
        <CompareNamesContent
          approvedGivenNameCount={approvedGivenNames.length}
          currentPair={currentPair}
          givenNameProviderLoaded={givenNameProviderLoaded}
          onVote={voteForName}
        />
      </Box>
    </Container>
  );
};

export default CompareNames;
